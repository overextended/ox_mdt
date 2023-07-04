CREATE TABLE
    IF NOT EXISTS `ox_mdt_reports` (
        `id` INT (10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `title` VARCHAR(50) NOT NULL,
        `description` TEXT NULL DEFAULT NULL,
        `author` VARCHAR(50) NULL DEFAULT NULL,
        `date` DATETIME NULL DEFAULT curtime(),
        PRIMARY KEY (`id`) USING BTREE
    ) ENGINE = InnoDB;

CREATE TABLE
    IF NOT EXISTS `ox_mdt_reports_officers` (
        `reportid` INT (10) UNSIGNED NOT NULL,
        `charid` INT (10) UNSIGNED NOT NULL,
        INDEX `FK_ox_mdt_reports_officers_characters` (`charid`) USING BTREE,
        INDEX `reportid` (`reportid`) USING BTREE,
        CONSTRAINT `FK_ox_mdt_reports_officers_characters` FOREIGN KEY (`charid`) REFERENCES `characters` (`charid`) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT `FK_ox_mdt_reports_officers_ox_mdt_reports` FOREIGN KEY (`reportid`) REFERENCES `ox_mdt_reports` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
    ) ENGINE = InnoDB;

CREATE TABLE
    IF NOT EXISTS `ox_mdt_offenses` (
        `label` VARCHAR(50) NOT NULL,
        `type` VARCHAR(50) NOT NULL,
        `description` VARCHAR(250) NOT NULL,
        `time` INT (10) UNSIGNED NOT NULL DEFAULT '0',
        `fine` INT (10) UNSIGNED NOT NULL DEFAULT '0',
        `points` INT (10) UNSIGNED NOT NULL DEFAULT '0',
        PRIMARY KEY (`label`) USING BTREE
    ) ENGINE = InnoDB;

CREATE TABLE
    IF NOT EXISTS `ox_mdt_charges` (
        `reportid` INT (10) UNSIGNED NOT NULL,
        `charid` INT (10) UNSIGNED NOT NULL,
        `charge` VARCHAR(50) NULL DEFAULT NULL,
        INDEX `FK_ox_mdt_charges_characters` (`charid`) USING BTREE,
        INDEX `FK_ox_mdt_charges_ox_mdt_offenses` (`charge`) USING BTREE,
        INDEX `FK_ox_mdt_charges_ox_mdt_reports` (`reportid`) USING BTREE,
        CONSTRAINT `FK_ox_mdt_charges_characters` FOREIGN KEY (`charid`) REFERENCES `characters` (`charid`) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT `FK_ox_mdt_charges_ox_mdt_offenses` FOREIGN KEY (`charge`) REFERENCES `ox_mdt_offenses` (`label`) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT `FK_ox_mdt_charges_ox_mdt_reports` FOREIGN KEY (`reportid`) REFERENCES `ox_mdt_reports` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
    ) ENGINE = InnoDB;

CREATE TABLE
    IF NOT EXISTS `ox_mdt_offenses` (
        `label` VARCHAR(50) NOT NULL,
        `type` VARCHAR(50) NOT NULL,
        `description` VARCHAR(250) NOT NULL,
        `time` INT (10) UNSIGNED NOT NULL DEFAULT '0',
        `fine` INT (10) UNSIGNED NOT NULL DEFAULT '0',
        `points` INT (10) UNSIGNED NOT NULL DEFAULT '0',
        PRIMARY KEY (`label`) USING BTREE
    ) ENGINE = InnoDB;

INSERT INTO
    `ox_mdt_offenses` (
        `label`,
        `type`,
        `description`,
        `time`,
        `fine`,
        `points`
    )
VALUES
    (
        'Loitering',
        'misdemeanour',
        'Standing go brrr',
        90,
        25000,
        0
    ),
    (
        'Robbery of a finanical institution',
        'felony',
        'Bank robbery go brrr',
        30,
        3000,
        0
    ),
    (
        'Speeding',
        'infraction',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, doloribus eveniet facere ipsam, ipsum minus modi molestiae nesciunt odio saepe sapiente sed sint voluptatibus voluptatum!',
        0,
        2500,
        3
    );