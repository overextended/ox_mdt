import { oxmysql } from '@communityox/oxmysql';
import {
  PartialProfileData,
  Officer,
  Profile,
  FetchOfficers,
  FetchCriminals,
  Announcement,
  DBBolo,
  BoloRecap,
  PartialReportData,
  FetchCharges,
  Criminal,
} from '@common/typings';
import { Ox } from '@communityox/ox_core';

export class DB {
  private static async query<T>(query: string, params?: any[]): Promise<T[]> {
    const resp = await oxmysql.rawExecute(query, params);
    return (resp || []) as T[];
  }

  static async getVehicles(parameters: [any]): Promise<{ label: string; plate: string }[]> {
    const vehicles = await this.query<{ plate: string; model: string }>(
      'SELECT `plate`, `model` FROM `vehicles` WHERE `owner` = ?',
      parameters
    );

    return vehicles.map((v) => ({
      plate: v.plate,
      label: Ox.GetVehicleData(v.model)?.name || v.model,
    }));
  }

  static async getLicenses(parameters: [any]): Promise<Record<string, { label: string } | string>[]> {
    return this.query<any>(
      `
      SELECT
        ox_licenses.label,
        JSON_VALUE(character_licenses.data, "$.issued") AS \`issued\`

      FROM character_licenses
      LEFT JOIN ox_licenses ON ox_licenses.name = character_licenses.name

      WHERE \`charid\` = ?`,
      parameters
    );
  }

  // ToDo:
  // Think it's fucked up, haven't quite gathered how the searching was done in the lua build,
  // between function wrappers and varying query strings I got lost
  static async getCharacters(parameters: string[], filter?: boolean): Promise<PartialProfileData[]> {
    const selectCharacters = `
      SELECT
        firstName,
        lastName,
        DATE_FORMAT(dateofbirth, "%Y-%m-%d") as dob,
        stateId
      FROM characters`;

    const query = filter
      ? `${selectCharacters} WHERE MATCH (stateId, firstName, lastName) AGAINST (? IN BOOLEAN MODE)`
      : selectCharacters;
    // ToDo:
    // * Consider a limit to avoid oversized queries ?
    // * Implement pagination ?
    // : selectCharacters + '\nLIMIT 20';

    return this.query<PartialProfileData>(query, parameters);
  }

  static async getOfficers(policeGroups: string[], parameters?: any[], filter?: boolean): Promise<Officer[]> {
    const groupsFormatted = policeGroups.join('","');
    const selectOfficers = `
      SELECT
        ox_mdt_profiles.id,
        firstName,
        lastName,
        characters.stateId,
        character_groups.name AS \`group\`,
        character_groups.grade,
        ox_mdt_profiles.image,
        ox_mdt_profiles.callSign
      FROM character_groups
      LEFT JOIN characters ON character_groups.charId = characters.charId
      LEFT JOIN ox_mdt_profiles ON characters.stateId = ox_mdt_profiles.stateId

      WHERE character_groups.name IN ("${groupsFormatted}")`;

    const query = filter
      ? `${selectOfficers} AND MATCH (characters.stateId, firstName, lastName) AGAINST (? IN BOOLEAN MODE)`
      : selectOfficers;

    return this.query<Officer>(query, parameters);
  }

  static async fetchRoster(policeGroups: string[], data: { page: number; search: string }) {
    const groupsFormatted = policeGroups.join('","');
    const baseQuery = `
      FROM character_groups
      LEFT JOIN characters ON character_groups.charId = characters.charId

      WHERE character_groups.name IN ("${groupsFormatted}")`;

    if (data.search === '') {
      const total = await oxmysql.prepare(`SELECT COUNT(*) ${baseQuery}`);
      const officers = await this.query(
        `SELECT firstName, lastName, characters.stateId ${baseQuery} LIMIT 9 OFFSET ?`,
        [data.page * 9]
      );
      return { totalRecords: total, officers };
    }

    // Handle search logic
    const searchParams = [data.search, data.page * 9];

    const searchQuery = `
      SELECT
        firstName,
        lastName,
        characters.stateId

      ${baseQuery} AND MATCH (characters.stateId, firstName, lastName) AGAINST (? IN BOOLEAN MODE) LIMIT 9 OFFSET ?`;

    const results = await this.query<Officer>(searchQuery, searchParams);

    return {
      totalRecords: results.length,
      officers: results,
    };
  }

  static async getWarrants(parameters: any[], filter?: boolean) {
    const selectWarrants = `
      SELECT
        warrants.reportId,
        characters.stateId,
        characters.firstName,
        characters.lastName,
        DATE_FORMAT(warrants.expiresAt, "%Y-%m-%d %T") AS expiresAt
      FROM \`ox_mdt_warrants\` warrants
      LEFT JOIN \`characters\` ON warrants.stateid = characters.stateid
    `;
    const query = filter
      ? `${selectWarrants}\n WHERE MATCH (characters.stateId, firstName, lastName) AGAINST (? IN BOOLEAN MODE)`
      : selectWarrants;

    return this.query(query, parameters);
  }

  static async getCharacterProfile(parameters: [string]): Promise<Profile | null> {
    const results = await this.query<Profile>(
      `
      SELECT
        a.firstName,
        a.lastName,
        a.stateId,
        a.charid,
        DATE_FORMAT(a.dateofbirth, "%Y-%m-%d") AS dob,
        a.phoneNumber,
        b.image,
        b.notes
      FROM \`characters\` a
      LEFT JOIN \`ox_mdt_profiles\` b ON b.stateid = a.stateid

      WHERE a.stateId = ?`,
      parameters
    );

    return results[0] || null;
  }

  static async getAnnouncements(parameters: [number]): Promise<Announcement[]> {
    return this.query<Announcement>(
      `
      SELECT
        a.id,
        a.contents,
        a.creator AS stateId,
        b.firstName,
        b.lastName,
        c.image,
        c.callSign,
        DATE_FORMAT(a.createdAt, "%Y-%m-%d %T") AS createdAt
      FROM \`ox_mdt_announcements\` a
      LEFT JOIN \`characters\` b ON b.stateId = a.creator
      LEFT JOIN \`ox_mdt_profiles\` c ON c.stateId = a.creator

      ORDER BY id DESC LIMIT 5 OFFSET ?`,
      parameters
    );
  }

  static async getOfficersInvolved(reportId: number): Promise<FetchOfficers> {
    return this.query(
      `
      SELECT
        characters.firstName,
        characters.lastName,
        characters.stateId,
        profile.callSign
      FROM ox_mdt_reports_officers officer
      LEFT JOIN characters ON characters.stateId = officer.stateId
      LEFT JOIN ox_mdt_profiles profile ON characters.stateId = profile.stateId

      WHERE reportid = ?`,
      [reportId]
    );
  }

  static async getCriminalsInvolved(reportId: number): Promise<FetchCriminals> {
    return this.query(
      `
      SELECT DISTINCT
        criminal.stateId,
        characters.firstName,
        characters.lastName,
        criminal.reduction,
        DATE_FORMAT(criminal.warrantExpiry, "%Y-%m-%d") AS warrantExpiry,
        criminal.processed,
        criminal.pleadedGuilty
      FROM ox_mdt_reports_criminals criminal
      LEFT JOIN characters ON characters.stateId = criminal.stateId

      WHERE reportid = ?`,
      [reportId]
    );
  }

  static async createAnnouncement(stateId: string, contents: string): Promise<any> {
    return await oxmysql.prepare('INSERT INTO `ox_mdt_announcements` (`creator`, `contents`) VALUES (?, ?)', [
      stateId,
      contents,
    ]);
  }

  static async selectAnnouncement(id: number): Promise<Announcement> {
    return await oxmysql.prepare('SELECT * FROM `ox_mdt_announcements` WHERE `id` = ?', [id]);
  }

  static async updateAnnouncementContents(id: number, contents: string) {
    return await oxmysql.prepare('UPDATE `ox_mdt_announcements` SET `contents` = ? WHERE `id` = ?', [contents, id]);
  }

  static async removeAnnouncement(id: number) {
    return await oxmysql.prepare('DELETE FROM `ox_mdt_announcements` WHERE `id` = ?', [id]);
  }

  static async getBolos(parameters: [number]): Promise<BoloRecap[]> {
    return await this.query(
      `
      SELECT
            a.id,
            a.creator AS stateId,
            a.contents,
            b.callSign,
            b.image,
            c.firstName,
            c.lastName,
            JSON_ARRAYAGG(d.image) AS images,
            DATE_FORMAT(a.createdAt, "%Y-%m-%d %T") AS createdAt
        FROM
            \`ox_mdt_bolos\` a
        LEFT JOIN
            \`ox_mdt_profiles\` b
        ON
            b.stateId = a.creator
        LEFT JOIN
            \`characters\` c
        ON
            c.stateId = b.stateId
        LEFT JOIN
            \`ox_mdt_bolos_images\` d
        ON
            d.boloId = a.id
        GROUP BY \`id\` ORDER BY \`id\` DESC LIMIT 5 OFFSET ?`,
      parameters
    );
  }

  static async deleteBOLO(id: number) {
    return await oxmysql.prepare('DELETE FROM `ox_mdt_bolos` WHERE id = ?', [id]);
  }

  static async selectBolo(id: number): Promise<DBBolo> {
    return await oxmysql.prepare('SELECT * FROM `ox_mdt_bolos` WHERE `id` = ?', [id]);
  }

  static async updateBOLO(id: number, contents: string, images: string[]) {
    const queries: [string, (string | number)[]][] = [['DELETE FROM `ox_mdt_bolos_images` where `boloId` = ? ', [id]]];

    images.forEach((img) => {
      queries.push(['INSERT INTO `ox_mdt_bolos_images` (`boloId`, `image`) VALUES (?, ?)', [id, img]]);
    });

    queries.push(['UPDATE `ox_mdt_bolos` SET `contents` = ? WHERE `id` = ?', [contents, id]]);

    return oxmysql.transaction(queries);
  }

  static async createBolo(creator: string, contents: string, images: string[]) {
    const boloId: number = await oxmysql.prepare('INSERT INTO `ox_mdt_bolos` (`creator`, `contents`) VALUES (?, ?)', [
      creator,
      contents,
    ]);

    const queries: [string, (string | number)[]][] = images.map((img) => [
      'INSERT INTO `ox_mdt_bolos_images` (`boloId`, `image`) VALUES (?, ?)',
      [boloId, img],
    ]);

    await oxmysql.transaction(queries);

    return boloId;
  }

  static async createReport(title: string, author: string) {
    return await oxmysql.prepare('INSERT INTO `ox_mdt_reports` (`title`, `author`) VALUES (?, ?)', [title, author]);
  }

  static async getReportById(id: number): Promise<PartialReportData[]> {
    return await oxmysql.prepare(
      'SELECT `id`, `title`, `description`, DATE_FORMAT(`date`, "%Y-%m-%d %T") as date FROM `ox_mdt_reports` WHERE `id` = ?',
      [id]
    );
  }

  static async selectReports(page: number, search: string): Promise<PartialReportData[]> {
    const offset = (page - 1) * 10;

    const selectReportQuery =
      'SELECT `id`, `title`, `author`, DATE_FORMAT(`date`, "%Y-%m-%d %T") as date FROM `ox_mdt_reports`';

    if (!search || search.length < 1) {
      return this.query(selectReportQuery + ' ORDER BY `id` DESC LIMIT 10 OFFSET ?', [offset]);
    } else {
      // ToDo:
      // Check that search actually works properly
      return this.query(
        selectReportQuery +
          ' WHERE MATCH (`title`, `author`, `description`) AGAINST (? IN BOOLEAN MODE) ORDER BY `id` DESC LIMIT 10 OFFSET ?',
        [search, offset]
      );
    }
  }

  static async selectEvidence(id: number) {
    return await this.query('SELECT `label`, `image` FROM `ox_mdt_reports_evidence` WHERE reportId = ?', [id]);
  }

  static async selectCriminalsInvolved(id: number) {
    const dbCriminals = await oxmysql.rawExecute<FetchCriminals>(
      `
        SELECT DISTINCT
          criminal.stateId,
          characters.firstName,
          characters.lastName,
          characters.dateOfBirth AS dob,
          criminal.reduction,
          DATE_FORMAT(criminal.warrantExpiry, "%Y-%m-%d") AS warrantExpiry,
          criminal.processed,
          criminal.pleadedGuilty
        FROM
          ox_mdt_reports_criminals criminal
        LEFT JOIN
          characters ON characters.stateId = criminal.stateId
        WHERE
          reportid = ?`,
      [id]
    );

    const dbCharges = await oxmysql.rawExecute<FetchCharges>(
      `
        SELECT
          stateId,
          charge as label,
          time,
          fine,
          count
        FROM
          ox_mdt_reports_charges
        WHERE
          reportid = ?
        GROUP BY
          charge, stateId`,
      [id]
    );

    const criminals: Criminal[] = [];
    const charges = dbCharges || [];

    for (const dbCrim of dbCriminals) {
      const criminal: Criminal = {
        stateId: dbCrim.stateId,
        firstName: dbCrim.firstName,
        lastName: dbCrim.lastName,
        dob: dbCrim.dob,
        charges: [],
        issueWarrant: typeof dbCrim.warrantExpiry === 'string',
        processed: !!dbCrim.processed,
        pleadedGuilty: !!dbCrim.pleadedGuilty,
        penalty: {
          time: 0,
          fine: 0,
          reduction: dbCrim.reduction,
        },
      };

      for (const charge of charges) {
        if (charge.label && charge.stateId === criminal.stateId) {
          criminal.penalty.time += charge.time || 0;
          criminal.penalty.fine += charge.fine || 0;

          criminal.charges.push({
            label: charge.label,
            count: charge.count,
            time: charge.time || 0,
            fine: charge.fine || 0,
          });
        }
      }
    }

    return criminals;
  }

  static async deleteReport(reportId: number) {
    return await oxmysql.prepare('DELETE FROM `ox_mdt_reports` WHERE `id` = ?', [reportId]);
  }

  static async updateReportTitle(reportId: number, data: string) {
    return await oxmysql.prepare('UPDATE `ox_mdt_reports` SET `title` = ? WHERE `id` = ?', [data, reportId]);
  }

  static async updateReportContents(reportId: number, data: string) {
    return await oxmysql.prepare('UPDATE `ox_mdt_reports` SET `description` = ? WHERE `id` = ?', [data, reportId]);
  }

  static async addCriminal(reportId: number, criminalId: string) {
    return await oxmysql.prepare('INSERT INTO `ox_mdt_reports_criminals` (`reportid`, `stateId`) VALUES (?, ?)', [
      reportId,
      criminalId,
    ]);
  }

  static async removeCriminal(reportId: number, criminalId: string) {
    return await oxmysql.prepare('DELETE FROM `ox_mdt_reports_criminals` WHERE `reportid` = ? AND `stateId` = ?', [
      reportId,
      criminalId,
    ]);
  }

  static async saveCriminal(reportId: number, criminal: Criminal) {
    const queries: [string, (string | number | boolean)[]][] = [
      ['DELETE FROM `ox_mdt_reports_charges` WHERE `reportid` = ? AND `stateId` = ?', [reportId, criminal.stateId]],
      [
        'UPDATE IGNORE `ox_mdt_reports_criminals` SET `warrantExpiry` = ?, `processed` = ?, `pleadedGuilty` = ? WHERE `reportid` = ? AND `stateId` = ?',
        [
          criminal.issueWarrant ? criminal.warrantExpiry : null,
          criminal.processed,
          criminal.pleadedGuilty,
          reportId,
          criminal.stateId,
        ],
      ],
    ];

    criminal.charges.forEach((charge) => {
      queries.push([
        'INSERT INTO `ox_mdt_reports_charges` (`reportid`, `stateId`, `charge`, `count`, `time`, `fine`) VALUES (?, ?, ?, ?, ?, ?)',
        [reportId, criminal.stateId, charge.label, charge.count, charge.time, charge.fine],
      ]);
    });

    return await oxmysql.transaction(queries);
  }

  static async createWarrant(reportId: number, stateId: string, expiry: string) {
    const warrantExists =
      (await oxmysql.prepare('SELECT COUNT(1) FROM `ox_mdt_warrants` WHERE `reportId` = ? AND `stateId` = ?', [
        reportId,
        stateId,
      ])) > 0;

    if (warrantExists) {
      return await oxmysql.prepare(
        'UPDATE `ox_mdt_warrants` SET `expiresAt` = ? WHERE `reportId` = ? AND `stateId` = ?',
        [expiry, reportId, stateId]
      );
    } else {
      return await oxmysql.prepare(
        'INSERT INTO `ox_mdt_warrants` (`reportid`, `stateid`, `expiresAt`) VALUES (?, ?, ?)',
        [reportId, stateId, expiry]
      );
    }
  }

  static async removeWarrant(reportId: number, stateId: string) {
    return await oxmysql.prepare('DELETE FROM `ox_mdt_warrants` WHERE `reportid` = ? AND `stateid` = ?', [
      reportId,
      stateId,
    ]);
  }

  static async addEvidence(reportId: number, label: string, image: string) {
    return await oxmysql.prepare(
      'INSERT INTO `ox_mdt_reports_evidence` (`reportid`, `label`, `image`) VALUES (?, ?, ?)',
      [reportId, label, image]
    );
  }

  static async removeEvidence(reportId: number, label: string, image: string) {
    return await oxmysql.prepare(
      'DELETE FROM `ox_mdt_reports_evidence` WHERE `reportid` = ? AND `label` = ? AND `image` = ?',
      [reportId, label, image]
    );
  }
}
