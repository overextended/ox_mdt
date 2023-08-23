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
        PRIMARY KEY (`id`) USING BTREE
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
        `charge` varchar(50) DEFAULT NULL,
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
        `value` VARCHAR(50) NOT NULL DEFAULT '',
        `type` ENUM ('image', 'item') NOT NULL DEFAULT 'image',
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
        `stateid` VARCHAR(7) NOT NULL PRIMARY KEY,
        `image` VARCHAR(90) NULL,
        `notes` TEXT NULL,
        `callsign` VARCHAR(10) NULL UNIQUE KEY,
        CONSTRAINT `ox_mdt_profiles_characters_stateid_fk` FOREIGN KEY (`stateid`) REFERENCES `characters` (`stateid`) ON UPDATE CASCADE ON DELETE CASCADE
    );

# Offenses mostly taken from https://github.com/FlawwsX/erp_mdt/blob/main/sv_main.lua#L1723-L1938 and altered

INSERT INTO `ox_mdt_offenses` (`label`, `type`, `category`, `description`, `time`, `fine`) VALUES
    ('Simple Assault', 'misdemeanor', 'OFFENSES AGAINST PERSONS', 'The unlawful intentional application of force to the person of another, without his or her consent, and without causing significant injury.', 7, 500),
    ('Assault', 'misdemeanor', 'OFFENSES AGAINST PERSONS', 'The unlawful intentional application of force to the person of another, without his or her consent, that causes significant injury.', 15, 850),
    ('Aggravated Assault', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful intentional application of force to the person of another, with the intent to cause serious bodily injury or death.', 20, 1250),
    ('Assault with a Deadly Weapon', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful intentional application of force to the person of another, with the use of a deadly weapon.', 30, 3750),
    ('Involuntary Manslaughter', 'felony', 'OFFENSES AGAINST PERSONS', 'Involuntary manslaughter is a criminal charge that is brought against someone who unintentionally causes the death of another person. It is a less serious crime than murder, but it can still result in significant penalties, including jail time.', 60, 7500),
    ('Vehicular Manslaughter', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful killing of a human being by the act of another, but without malice aforethought.', 75, 7500),
    ('Attempted Murder of a Civilian', 'felony', 'OFFENSES AGAINST PERSONS', 'An intentional, but unsuccessful, act to kill another person.', 50, 7500),
    ('Second Degree Murder', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful killing of another human being with malice aforethought, but not premeditated.', 100, 15000),
    ('Accessory to Second Degree Murder', 'felony', 'OFFENSES AGAINST PERSONS', 'One who, after a murder has been committed, assists the murderer in avoiding or escaping punishment.', 50, 5000),
    ('first Degree Murder', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful killing of another human being with malice aforethought, and with premeditation.', 150, 20000),
    ('Accessory to First Degree Murder', 'felony', 'OFFENSES AGAINST PERSONS', 'One who, before or during the commission of a murder, aids or abets the murderer in the planning or commission of the crime.', 75, 10000),
    ('Murder of a Public Servant or Peace Officer', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful killing of a public servant or peace officer, while such person is engaged in the performance of his or her official duties.', 150, 20000),
    ('Attempted Murder of a Public Servant or Peace Officer', 'felony', 'OFFENSES AGAINST PERSONS', 'An intentional, but unsuccessful, act to kill a public servant or peace officer, while such person is engaged in the performance of his or her official duties.', 65, 10000),
    ('Accessory to the Murder of a Public Servant or Peace Officer', 'felony', 'OFFENSES AGAINST PERSONS', 'One who, after the murder of a public servant or peace officer, assists the murderer in avoiding or escaping punishment.', 75, 10000),
    ('Unlawful Imprisonment', 'misdemeanor', 'OFFENSES AGAINST PERSONS', 'The unlawful detention or confinement of another person without his or her consent.', 10, 600),
    ('Kidnapping', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful taking and carrying away of another person by force or fraud, with the intent to secretly confine or imprison him or her.', 15, 900),
    ('Accessory to Kidnapping', 'felony', 'OFFENSES AGAINST PERSONS', 'One who, after a kidnapping has been committed, assists the kidnapper in avoiding or escaping punishment.', 7, 450),
    ('Attempted Kidnapping', 'felony', 'OFFENSES AGAINST PERSONS', 'An intentional, but unsuccessful, act to kidnap another person.', 10, 450),
    ('Hostage Taking', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful seizure or detention of a person as a hostage, with the intent to force a third party to do or refrain from doing something.', 20, 1200),
    ('Accessory to Hostage Taking', 'felony', 'OFFENSES AGAINST PERSONS', 'One who, after a hostage taking has been committed, assists the hostage taker in avoiding or escaping punishment.', 10, 600),
    ('Unlawful Imprisonment of a Public Servant or Peace Officer.', 'felony', 'OFFENSES AGAINST PERSONS', 'The unlawful detention or confinement of a public servant or peace officer without his consent', 25, 4000),
    ('Criminal Threats', 'misdemeanor', 'OFFENSES AGAINST PERSONS', 'The intentional or reckless communication of a threat to cause death or serious bodily harm to another person.', 5, 500),
    ('Reckless Endangerment', 'misdemeanor', 'OFFENSES AGAINST PERSONS', 'The creation of a substantial risk of death or serious bodily harm to another person by the commission of a reckless act.', 10, 1000),
    ('Gang Related Shooting', 'felony', 'OFFENSES AGAINST PERSONS', 'The discharge of a firearm in a public place, or at another person, with the intent to cause death or serious bodily harm, and the act is committed in association with a criminal street gang.', 30, 2500),
    ('Cannibalism', 'felony', 'OFFENSES AGAINST PERSONS', 'The intentional killing and consumption of the flesh of another human being.', 180, 30000),
    ('Torture', 'felony', 'OFFENSES AGAINST PERSONS', 'The intentional infliction of severe pain or suffering on another person, for the purpose of obtaining information or a confession, or for the purpose of punishment, revenge, or sadism.', 40, 4500);
