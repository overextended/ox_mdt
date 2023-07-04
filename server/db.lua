MySQL.transaction({
    [[
        CREATE TABLE IF NOT EXISTS `ox_mdt_reports` (
            `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
            `title` VARCHAR(50) NOT NULL,
            `description` TEXT NULL DEFAULT NULL,
            `author` VARCHAR(50) NULL DEFAULT NULL,
            `date` DATETIME NULL DEFAULT curtime(),
            PRIMARY KEY (`id`) USING BTREE
        ) ENGINE=InnoDB;
    ]],

    [[
        CREATE TABLE IF NOT EXISTS `ox_mdt_reports_characters` (
            `reportid` INT(10) UNSIGNED NOT NULL,
            `charid` INT(10) UNSIGNED NOT NULL,
            `type` TINYINT(3) UNSIGNED NOT NULL,
            INDEX `FK_ox_mdt_reports_officers_characters` (`charid`) USING BTREE,
            INDEX `reportid` (`reportid`) USING BTREE,
            CONSTRAINT `FK_ox_mdt_reports_officers_characters` FOREIGN KEY (`charid`) REFERENCES `characters` (`charid`) ON UPDATE CASCADE ON DELETE CASCADE,
            CONSTRAINT `FK_ox_mdt_reports_officers_ox_mdt_reports` FOREIGN KEY (`reportid`) REFERENCES `ox_mdt_reports` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
        ) ENGINE=InnoDB;        
    ]],

    [[
        CREATE TABLE IF NOT EXISTS `ox_mdt_charges` (
            `charid` INT(10) UNSIGNED NOT NULL,
            `charge` VARCHAR(50) NOT NULL,
            INDEX `FK_ox_mdt_charges_characters` (`charid`) USING BTREE,
            CONSTRAINT `FK_ox_mdt_charges_characters` FOREIGN KEY (`charid`) REFERENCES `characters` (`charid`) ON UPDATE CASCADE ON DELETE CASCADE
        ) ENGINE=InnoDB;        
    ]],
})

local db = {}
local selectCharacter =
'SELECT `firstName`, `lastName`, DATE_FORMAT(`dateofbirth`, "%Y-%m-%d") as dob, `charid` as id FROM `characters`'
local wildcard = '%s%%'

local selectCharacterById = selectCharacter .. ' WHERE `charid` LIKE ?'

---@param id number | string
function db.selectCharacterById(id)
    return MySQL.rawExecute.await(selectCharacterById, { wildcard:format(id) })
end

local selectCharacterByNameA = selectCharacter .. ' WHERE `firstName` LIKE ? OR `lastName` LIKE ?'
local selectCharacterByNameB = selectCharacter .. ' WHERE `firstName` = ? AND `lastName` LIKE ?'

---@param name string
function db.selectCharacterByName(name)
    local nameA, nameB = name:match('^([%w]+) ?([%w]*)$')

    if nameB == '' then
        nameA = wildcard:format(nameA)

        return MySQL.rawExecute.await(selectCharacterByNameA, { nameA, nameA })
    end

    return MySQL.rawExecute.await(selectCharacterByNameB, { nameA, wildcard:format(nameB) })
end

---@param title string
---@param author string
function db.createReport(title, author)
    return MySQL.prepare.await('INSERT INTO `ox_mdt_reports` (`title`, `author`) VALUES (?, ?)', { title, author })
end

---@param id number
function db.selectReportById(id)
    return MySQL.prepare.await('SELECT `id`, `title`, `description` FROM `ox_mdt_reports` WHERE `id` = ? LIMIT 1', { id })
end

local selectReports = 'SELECT `id`, `title`, `author`, `date` FROM `ox_mdt_reports`'
local selectReportsById = selectReports .. 'WHERE `id` LIKE ?'

---@param id number | string
function db.selectReportsById(id)
    return MySQL.rawExecute.await(selectReportsById, { wildcard:format(id) })
end

local selectReportsByString = selectReports .. ' WHERE `title` LIKE ? or `author` LIKE ? or `date` LIKE ?'

---@param search string
function db.selectReports(search)
    search = wildcard:format(search)
    return MySQL.rawExecute.await(selectReportsByString, { search })
end

---@param id number
function db.deleteReport(id)
    return MySQL.prepare.await('DELETE FROM `ox_mdt_reports` WHERE `id` = ?', { id })
end

---@param title string
---@param reportId number
function db.updateReportTitle(title, reportId)
    return MySQL.prepare.await('UPDATE `ox_mdt_reports` SET `title` = ? WHERE `id` = ?', { title, reportId })
end

---@return ProfileCard[]
function db.selectProfiles()
    return MySQL.query.await(
        'SELECT `charid` AS playerId, `firstName`, `lastName`, `dateofbirth` AS dob FROM `characters`')
end

---@param search number
---@return Profile?
function db.selectCharacterProfile(search)
    local parameters = { search }
    local profile = MySQL.rawExecute.await('SELECT `firstName`, `lastName`, `charid` AS stateId, `dateofbirth` AS dob FROM `characters` WHERE `charid` = ?', parameters)?[1]

    if not profile then return end

    profile.licenses = MySQL.rawExecute.await('SELECT ox_licenses.label, `issued` FROM character_licenses LEFT JOIN ox_licenses ON ox_licenses.name = character_licenses.name WHERE charid = ?', parameters) or {}

    for _, v in pairs(profile.licenses) do
        v.points = 0
    end

    profile.vehicles = MySQL.rawExecute.await('SELECT `plate`, `model` FROM `vehicles` WHERE `owner` = ?', parameters) or {}

    for _, v in pairs(profile.vehicles) do
        v.label = Ox.GetVehicleData(v.model)?.name or v.model
        v.model = nil
    end

    profile.relatedReports = MySQL.rawExecute.await('SELECT `id`, `title`, `author`, `date` FROM `ox_mdt_reports` a LEFT JOIN `ox_mdt_reports_characters` b ON b.reportid = a.id WHERE `charid` = ?', parameters) or {}
    profile.pastCharges = MySQL.rawExecute.await('SELECT `charge` AS label, COUNT(1) AS count FROM `ox_mdt_charges` WHERE `charid` = ? GROUP BY `charge`', parameters) or {}

    return profile
end

return db
