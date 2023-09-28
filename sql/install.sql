CREATE TABLE
    IF NOT EXISTS `ox_mdt_offenses` (
        `label` varchar(100) NOT NULL,
        `type` ENUM('misdemeanor', 'felony', 'infraction') NOT NULL,
        `category` ENUM(
            'OFFENSES AGAINST PERSONS',
            'OFFENSES INVOLVING THEFT',
            'OFFENSES INVOLVING FRAUD',
            'OFFENSES INVOLVING DAMAGE TO PROPERTY',
            'OFFENSES AGAINST PUBLIC ADMINISTRATION',
            'OFFENSES AGAINST PUBLIC ORDER',
            'OFFENSES AGAINST HEALTH AND MORALS',
            'OFFENSES AGAINST PUBLIC SAFETY',
            'OFFENSES INVOLVING THE OPERATION OF A VEHICLE',
            'OFFENSES INVOLVING THE WELL-BEING OF WILDLIFE') NOT NULL,
        `description` varchar(250) NOT NULL,
        `time` int (10) unsigned NOT NULL DEFAULT 0,
        `fine` int (10) unsigned NOT NULL DEFAULT 0,
        PRIMARY KEY (`label`) USING BTREE
    );

CREATE TABLE
    IF NOT EXISTS `ox_mdt_reports` (
        `id` int (10) unsigned NOT NULL AUTO_INCREMENT,
        `title` varchar(50) NOT NULL,
        `description` text DEFAULT NULL,
        `author` varchar(50) DEFAULT NULL,
        `date` datetime DEFAULT curtime(),
        PRIMARY KEY (`id`) USING BTREE,
        FULLTEXT INDEX `title_desc_author` (`title`, `description`, `author`)
    );

CREATE TABLE
    `ox_mdt_reports_criminals` (
        `reportid` INT (10) UNSIGNED NOT NULL,
        `stateid` VARCHAR(7) NOT NULL,
        `reduction` TINYINT (3) UNSIGNED NULL DEFAULT NULL,
        `warrantExpiry` DATE NULL DEFAULT NULL,
        `processed` TINYINT (1) NULL DEFAULT NULL,
        `pleadedGuilty` TINYINT (1) NULL DEFAULT NULL,
        INDEX `reportid` (`reportid`) USING BTREE,
        INDEX `FK_ox_mdt_reports_reports_characters` (`stateid`) USING BTREE,
        CONSTRAINT `ox_mdt_reports_criminals_ibfk_1` FOREIGN KEY (`stateid`) REFERENCES `characters` (`stateid`) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT `ox_mdt_reports_criminals_ibfk_2` FOREIGN KEY (`reportid`) REFERENCES `ox_mdt_reports` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS `ox_mdt_reports_officers` (
        `reportid` int (10) unsigned NOT NULL,
        `stateid` VARCHAR(7) NOT NULL,
        KEY `FK_ox_mdt_reports_officers_characters` (`stateid`) USING BTREE,
        KEY `reportid` (`reportid`) USING BTREE,
        CONSTRAINT `FK_ox_mdt_reports_officers_characters` FOREIGN KEY (`stateid`) REFERENCES `characters` (`stateid`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `FK_ox_mdt_reports_officers_ox_mdt_reports` FOREIGN KEY (`reportid`) REFERENCES `ox_mdt_reports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS `ox_mdt_reports_charges` (
        `reportid` int (10) unsigned NOT NULL,
        `stateid` VARCHAR(7) NOT NULL,
        `charge` VARCHAR(100) DEFAULT NULL,
        `count` int (10) unsigned NOT NULL DEFAULT 1,
        `time` int (10) unsigned DEFAULT NULL,
        `fine` int (10) unsigned DEFAULT NULL,
        KEY `FK_ox_mdt_reports_charges_ox_mdt_reports_criminals` (`reportid`),
        KEY `FK_ox_mdt_reports_charges_ox_mdt_reports_criminals_2` (`stateid`),
        KEY `FK_ox_mdt_reports_charges_ox_mdt_offenses` (`charge`),
        CONSTRAINT `FK_ox_mdt_reports_charges_ox_mdt_offenses` FOREIGN KEY (`charge`) REFERENCES `ox_mdt_offenses` (`label`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `FK_ox_mdt_reports_charges_ox_mdt_reports_criminals` FOREIGN KEY (`reportid`) REFERENCES `ox_mdt_reports_criminals` (`reportid`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `FK_ox_mdt_reports_charges_ox_mdt_reports_criminals_2` FOREIGN KEY (`stateid`) REFERENCES `ox_mdt_reports_criminals` (`stateid`) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS `ox_mdt_reports_evidence` (
        `reportid` INT (10) UNSIGNED NOT NULL,
        `label` VARCHAR(50) NOT NULL DEFAULT '',
        `image` VARCHAR(90) NOT NULL DEFAULT '',
        INDEX `reportid` (`reportid`) USING BTREE,
        CONSTRAINT `FK__ox_mdt_reports` FOREIGN KEY (`reportid`) REFERENCES `ox_mdt_reports` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS `ox_mdt_announcements` (
        `id` INT (11) UNSIGNED NOT NULL AUTO_INCREMENT,
        `creator` VARCHAR(7) NOT NULL,
        `contents` TEXT NOT NULL,
        `createdAt` DATETIME NOT NULL DEFAULT curtime(),
        PRIMARY KEY (`id`) USING BTREE,
        INDEX `FK_ox_mdt_announcements_characters` (`creator`) USING BTREE,
        CONSTRAINT `FK_ox_mdt_announcements_characters` FOREIGN KEY (`creator`) REFERENCES `characters` (`stateid`) ON UPDATE NO ACTION ON DELETE NO ACTION
    );

CREATE TABLE
    IF NOT EXISTS `ox_mdt_warrants` (
        `reportid` INT UNSIGNED NOT NULL,
        `stateid` VARCHAR(7) NOT NULL,
        `expiresAt` DATETIME NOT NULL,
        CONSTRAINT `ox_mdt_warrants_characters_stateid_fk` FOREIGN KEY (`stateid`) REFERENCES `characters` (`stateid`) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT `ox_mdt_warrants_ox_mdt_reports_id_fk` FOREIGN KEY (`reportid`) REFERENCES `ox_mdt_reports` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS `ox_mdt_profiles` (
    `id` INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `stateid`  VARCHAR(7)  NOT NULL,
    `image`    VARCHAR(90) NULL,
    `notes`    TEXT        NULL,
    `callsign` VARCHAR(10) NULL,
    CONSTRAINT `ox_mdt_profiles_pk` UNIQUE (`callsign`),
    CONSTRAINT `ox_mdt_profiles_pk2` UNIQUE (`stateid`),
    CONSTRAINT `ox_mdt_profiles_characters_stateId_fk`
        FOREIGN KEY (`stateid`) REFERENCES `characters` (`stateId`)
            ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `ox_mdt_bolos`
(
    `id`        INT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    `creator`   VARCHAR(7)                 NOT NULL,
    `contents`  TEXT                       NULL,
    `createdAt` DATETIME DEFAULT curtime() NOT NULL,
    CONSTRAINT `ox_mdt_bolos_ox_mdt_profiles_stateid_fk`
        FOREIGN KEY (`creator`) REFERENCES `ox_mdt_profiles` (`stateid`)
            ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `ox_mdt_bolos_images`
(
    `boloId` INT UNSIGNED NOT NULL,
    `image`  VARCHAR(90)  NULL,
    CONSTRAINT `ox_mdt_bolos_images_ox_mdt_bolos_id_fk`
        FOREIGN KEY (`boloId`) REFERENCES `ox_mdt_bolos` (`id`)
            ON UPDATE CASCADE ON DELETE CASCADE
);

