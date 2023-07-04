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
local selectCharacter = 'SELECT `firstName`, `lastName`, DATE_FORMAT(`dateofbirth`, "%Y-%m-%d") as dob, `charid` as id FROM `characters`'
local wildcard = '%s%%'

local selectCharacterById = selectCharacter .. ' WHERE `charid` LIKE ?'

---@param id number | string
function db.selectCharacterById(id)
    return MySQL.query.await(selectCharacterById, { wildcard:format(id) })
end

local selectCharacterByNameA = selectCharacter .. ' WHERE `firstName` LIKE ? OR `lastName` LIKE ?'
local selectCharacterByNameB = selectCharacter .. ' WHERE `firstName` = ? AND `lastName` LIKE ?'

---@param name string
function db.selectCharacterByName(name)
    local nameA, nameB = name:match('^([%w]+) ?([%w]*)$')

    if nameB == '' then
        nameA = wildcard:format(nameA)

        return MySQL.query.await(selectCharacterByNameA, { nameA, nameA })
    end

    return MySQL.query.await(selectCharacterByNameB, { nameA, wildcard:format(nameB) })
end

---@param title string
---@param author string
function db.createReport(title, author)
    return MySQL.insert.await('INSERT INTO `ox_mdt_reports` (`title`, `author`) VALUES (?, ?)', { title, author })
end

---@param id number
function db.selectReportById(id)
    return MySQL.single.await('SELECT `id`, `title`, `description` FROM `ox_mdt_reports` WHERE `id` = ?', { id })
end


local selectReports = 'SELECT `id`, `title`, `author`, `date` FROM `ox_mdt_reports`'
local selectReportsById = selectReports .. 'WHERE `id` LIKE ?'

---@param id number | string
function db.selectReportsById(id)
    return MySQL.query.await(selectReportsById, { wildcard:format(id) })
end

local selectReportsByString = selectReports .. ' WHERE `title` LIKE ? or `author` LIKE ? or `date` LIKE ?'

---@param search string
function db.selectReports(search)
    search = wildcard:format(search)
    return MySQL.query.await(selectReportsByString, { search })
end

---@param id number
function db.deleteReport(id)
    return MySQL.update.await('DELETE FROM `ox_mdt_reports` WHERE `id` = ?', { id })
end

---@param title string
---@param reportId number
function db.updateReportTitle(title, reportId)
    return MySQL.update.await('UPDATE `ox_mdt_reports` SET `title` = ? WHERE `id` = ?', { title, reportId })
end

function db.selectProfiles(search)
    return MySQL.query.await('SELECT `charid` AS playerId, `firstname` AS firstName, `lastname` as lastName, `dateofbirth` AS dob FROM `characters`')
end


return db
