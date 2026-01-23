import { oxmysql } from '@communityox/oxmysql';
import { PartialProfileData, Officer, Profile, FetchOfficers, FetchCriminals, Announcement } from '@common/typings';
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
      'SELECT ox_licenses.label, JSON_VALUE(character_licenses.data, "$.issued") AS `issued` FROM character_licenses LEFT JOIN ox_licenses ON ox_licenses.name = character_licenses.name WHERE `charid` = ?',
      parameters
    );
  }

  static async getCharacters(parameters: string[], filter?: boolean): Promise<PartialProfileData[]> {
    const selectCharacters = `
      SELECT firstName, lastName, DATE_FORMAT(dateofbirth, "%Y-%m-%d") as dob, stateId
      FROM characters
    `;
    const query = filter
      ? `${selectCharacters} WHERE MATCH (stateId, firstName, lastName) AGAINST (? IN BOOLEAN MODE)`
      : selectCharacters;

    return this.query<PartialProfileData>(query, parameters);
  }

  static async getOfficers(policeGroups: string[], parameters?: any[], filter?: boolean): Promise<Officer[]> {
    const groupsFormatted = policeGroups.join('","');
    const selectOfficers = `
      SELECT
        ox_mdt_profiles.id, firstName, lastName, characters.stateId,
        character_groups.name AS \`group\`, character_groups.grade,
        ox_mdt_profiles.image, ox_mdt_profiles.callSign
      FROM character_groups
      LEFT JOIN characters ON character_groups.charId = characters.charId
      LEFT JOIN ox_mdt_profiles ON characters.stateId = ox_mdt_profiles.stateId
      WHERE character_groups.name IN ("${groupsFormatted}")
    `;

    const query = filter
      ? `${selectOfficers} AND MATCH (characters.stateId, firstName, lastName) AGAINST (? IN BOOLEAN MODE)`
      : selectOfficers;

    return this.query<Officer>(query, parameters);
  }

  static async fetchRoster(policeGroups: string[], data: { page: number; search: string }) {
    const groupsFormatted = policeGroups.join('","');
    const baseQuery = `FROM character_groups LEFT JOIN characters ON character_groups.charId = characters.charId WHERE character_groups.name IN ("${groupsFormatted}")`;

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
    const searchQuery = `SELECT firstName, lastName, characters.stateId ${baseQuery} AND MATCH (characters.stateId, firstName, lastName) AGAINST (? IN BOOLEAN MODE) LIMIT 9 OFFSET ?`;
    const results = await this.query<Officer>(searchQuery, searchParams);

    return {
      totalRecords: results.length,
      officers: results,
    };
  }

  static async getWarrants(parameters: any[], filter?: boolean) {
    const selectWarrants = `
      SELECT warrants.reportId, characters.stateId, characters.firstName, characters.lastName,
      DATE_FORMAT(warrants.expiresAt, "%Y-%m-%d %T") AS expiresAt
      FROM \`ox_mdt_warrants\` warrants
      LEFT JOIN \`characters\` ON warrants.stateid = characters.stateid
    `;
    const query = filter
      ? `${selectWarrants} WHERE MATCH (characters.stateId, firstName, lastName) AGAINST (? IN BOOLEAN MODE)`
      : selectWarrants;

    return this.query(query, parameters);
  }

  static async getCharacterProfile(parameters: [string]): Promise<Profile | null> {
    const results = await this.query<Profile>(
      `
      SELECT a.firstName, a.lastName, a.stateId, a.charid,
      DATE_FORMAT(a.dateofbirth, "%Y-%m-%d") AS dob, a.phoneNumber, b.image, b.notes
      FROM \`characters\` a
      LEFT JOIN \`ox_mdt_profiles\` b ON b.stateid = a.stateid
      WHERE a.stateId = ?
    `,
      parameters
    );

    return results[0] || null;
  }

  static async getAnnouncements(parameters: [number]): Promise<Announcement[]> {
    return this.query<Announcement>(
      `
      SELECT a.id, a.contents, a.creator AS stateId, b.firstName, b.lastName, c.image, c.callSign,
      DATE_FORMAT(a.createdAt, "%Y-%m-%d %T") AS createdAt
      FROM \`ox_mdt_announcements\` a
      LEFT JOIN \`characters\` b ON b.stateId = a.creator
      LEFT JOIN \`ox_mdt_profiles\` c ON c.stateId = a.creator
      ORDER BY id DESC LIMIT 5 OFFSET ?
    `,
      parameters
    );
  }

  static async getOfficersInvolved(reportId: number): Promise<FetchOfficers> {
    return this.query(
      `SELECT characters.firstName, characters.lastName, characters.stateId, profile.callSign FROM ox_mdt_reports_officers officer LEFT JOIN characters ON characters.stateId = officer.stateId LEFT JOIN ox_mdt_profiles profile ON characters.stateId = profile.stateId WHERE reportid = ?`,
      [reportId]
    );
  }

  static async getCriminalsInvolved(reportId: number): Promise<FetchCriminals> {
    return this.query(
      `SELECT DISTINCT criminal.stateId, characters.firstName, characters.lastName, criminal.reduction, DATE_FORMAT(criminal.warrantExpiry, "%Y-%m-%d") AS warrantExpiry, criminal.processed, criminal.pleadedGuilty FROM ox_mdt_reports_criminals criminal LEFT JOIN characters ON characters.stateId = criminal.stateId WHERE reportid = ?`,
      [reportId]
    );
  }
}
