CREATE TABLE
    IF NOT EXISTS `ox_mdt_offenses` (
        `label` varchar(50) NOT NULL,
        `type` varchar(50) NOT NULL,
        `description` varchar(250) NOT NULL,
        `time` int (10) unsigned NOT NULL DEFAULT 0,
        `fine` int (10) unsigned NOT NULL DEFAULT 0,
        `points` int (10) unsigned NOT NULL DEFAULT 0,
        PRIMARY KEY (`label`) USING BTREE
    );

CREATE TABLE
    IF NOT EXISTS `ox_mdt_reports` (
        `id` int (10) unsigned NOT NULL AUTO_INCREMENT,
        `title` varchar(50) NOT NULL,
        `description` text DEFAULT NULL,
        `author` varchar(50) DEFAULT NULL,
        `date` datetime DEFAULT curtime(),
        PRIMARY KEY (`id`) USING BTREE
    );

CREATE TABLE
    IF NOT EXISTS `ox_mdt_reports_criminals` (
        `reportid` int (10) unsigned NOT NULL,
        `charid` int (10) unsigned NOT NULL,
        `reduction` tinyint (3) unsigned DEFAULT NULL,
        KEY `reportid` (`reportid`) USING BTREE,
        KEY `FK_ox_mdt_reports_reports_characters` (`charid`) USING BTREE,
        CONSTRAINT `ox_mdt_reports_criminals_ibfk_1` FOREIGN KEY (`charid`) REFERENCES `characters` (`charid`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `ox_mdt_reports_criminals_ibfk_2` FOREIGN KEY (`reportid`) REFERENCES `ox_mdt_reports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ROW_FORMAT = DYNAMIC;

CREATE TABLE
    IF NOT EXISTS `ox_mdt_reports_officers` (
        `reportid` int (10) unsigned NOT NULL,
        `charid` int (10) unsigned NOT NULL,
        KEY `FK_ox_mdt_reports_officers_characters` (`charid`) USING BTREE,
        KEY `reportid` (`reportid`) USING BTREE,
        CONSTRAINT `FK_ox_mdt_reports_officers_characters` FOREIGN KEY (`charid`) REFERENCES `characters` (`charid`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `FK_ox_mdt_reports_officers_ox_mdt_reports` FOREIGN KEY (`reportid`) REFERENCES `ox_mdt_reports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS `ox_mdt_reports_charges` (
        `reportid` int (10) unsigned NOT NULL,
        `charid` int (10) unsigned NOT NULL,
        `charge` varchar(50) DEFAULT NULL,
        `count` int (10) unsigned NOT NULL DEFAULT 1,
        `time` int (10) unsigned DEFAULT NULL,
        `fine` int (10) unsigned DEFAULT NULL,
        `points` int (10) unsigned DEFAULT NULL,
        KEY `FK_ox_mdt_reports_charges_ox_mdt_reports_criminals` (`reportid`),
        KEY `FK_ox_mdt_reports_charges_ox_mdt_reports_criminals_2` (`charid`),
        KEY `FK_ox_mdt_reports_charges_ox_mdt_offenses` (`charge`),
        CONSTRAINT `FK_ox_mdt_reports_charges_ox_mdt_offenses` FOREIGN KEY (`charge`) REFERENCES `ox_mdt_offenses` (`label`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `FK_ox_mdt_reports_charges_ox_mdt_reports_criminals` FOREIGN KEY (`reportid`) REFERENCES `ox_mdt_reports_criminals` (`reportid`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `FK_ox_mdt_reports_charges_ox_mdt_reports_criminals_2` FOREIGN KEY (`charid`) REFERENCES `ox_mdt_reports_criminals` (`charid`) ON DELETE CASCADE ON UPDATE CASCADE
    );

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