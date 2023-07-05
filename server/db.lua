local db = {}
local selectCharacter =
'SELECT `firstName`, `lastName`, DATE_FORMAT(`dateofbirth`, "%Y-%m-%d") as dob, `charid` as stateId FROM `characters`'
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
    return MySQL.prepare.await('INSERT INTO `ox_mdt_reports` (`title`, `author`) VALUES (?, ?)', { title, author }) --[[@as number?]]
end

---@param id number
function db.selectReportById(id)
    return MySQL.prepare.await('SELECT `id`, `title`, `description` FROM `ox_mdt_reports` WHERE `id` = ?', { id }) --[[@as MySQLRow]]
end

local selectReports = 'SELECT `id`, `title`, `author`, DATE_FORMAT(`date`, "%Y-%m-%d") as date FROM `ox_mdt_reports`'
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
    return MySQL.prepare.await('DELETE FROM `ox_mdt_reports` WHERE `id` = ?', { id }) --[[@as number?]]
end

---@param title string
---@param reportId number
function db.updateReportTitle(title, reportId)
    return MySQL.prepare.await('UPDATE `ox_mdt_reports` SET `title` = ? WHERE `id` = ?', { title, reportId }) --[[@as number?]]
end

---@return ProfileCard[]
function db.selectProfiles()
    return MySQL.query.await(
        'SELECT `charid` AS stateId, `firstName`, `lastName`, `dateofbirth` AS dob FROM `characters`')
end

function db.selectOfficersInvolved(reportId)
    local officers = MySQL.rawExecute.await('SELECT CONCAT(b.firstname, " ", b.lastname) AS name FROM `ox_mdt_reports_officers` a LEFT JOIN `characters` b ON b.charid = a.charid WHERE `reportid` = ?', { reportId }) or {}
    print(json.encode(officers, {sort_keys=true,indent=true}))
    return officers
end

function db.selectCriminalsInvolved(reportId)
    local parameters = { reportId }
    local criminals = MySQL.rawExecute.await('SELECT DISTINCT a.charid as stateId, b.firstName, b.lastName FROM `ox_mdt_charges` a LEFT JOIN `characters` b on b.charid = a.charid WHERE reportid = ?', parameters) or {}
    local charges = MySQL.rawExecute.await('SELECT `charid` as stateId, `charge` as label, COUNT(1) as count FROM `ox_mdt_charges` WHERE reportid = ? GROUP BY `charge`, `charid`', parameters) or {}

    for _, v in pairs(criminals) do
        v.charges = {}

        for _, v2 in pairs(charges) do
            if v2.label and v2.id == v.id then
                v2.id = nil
                v.charges[#v.charges + 1] = v2
            end
        end
    end

    return criminals
end

---@param reportId number
---@param criminal Criminal
function db.saveCriminal(reportId, criminal)
    MySQL.prepare.await('DELETE FROM `ox_mdt_charges` WHERE `reportid` = ? AND `charid` = ?', { reportId, criminal.stateId })

    if next(criminal.charges) then
        local queries = {}
        local queryN = 0

        for _, v in pairs(criminal.charges) do
            for i = 1, v.count do
                queryN += 1
                queries[queryN] = { 'INSERT INTO `ox_mdt_charges` (`reportid`, `charid`, `charge`) VALUES (?, ?, ?)', { reportId, criminal.stateId, v.label } }
            end
        end

        return MySQL.transaction.await(queries)
    else
        return MySQL.prepare.await('INSERT INTO `ox_mdt_charges` (`reportid`, `charid`, `charge`) VALUES (?, ?, ?)', { reportId, criminal.stateId })
    end
end

---@param reportId number
---@param charId string | number
function db.addCriminal(reportId, charId)
    return MySQL.prepare.await('INSERT INTO `ox_mdt_charges` (`reportid`, `charid`, `charge`) VALUES (?, ?, NULL)', { reportId, charId }) --[[@as number?]]
end

---@param search string | number
---@return Profile?
function db.selectCharacterProfile(search)
    local parameters = { search }
    local profile = MySQL.rawExecute.await('SELECT `firstName`, `lastName`, `charid` AS stateId, DATE_FORMAT(`dateofbirth`, "%Y-%m-%d") AS dob FROM `characters` WHERE `charid` = ?', parameters)?[1]

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

    profile.relatedReports = MySQL.rawExecute.await('SELECT `id`, `title`, `author`, DATE_FORMAT(`date`, "%Y-%m-%d") as date FROM `ox_mdt_reports` a LEFT JOIN `ox_mdt_charges` b ON b.reportid = a.id WHERE `charid` = ?', parameters) or {}
    profile.pastCharges = MySQL.rawExecute.await('SELECT `charge` AS label, COUNT(1) AS count FROM `ox_mdt_charges` WHERE `charge` IS NOT NULL AND `charid` = ? GROUP BY `charge`', parameters) or {}

    return profile
end

return db
