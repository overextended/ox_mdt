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

local selectReports = 'SELECT `id`, `title`, `author`, DATE_FORMAT(`date`, "%Y-%m-%d %T") as date FROM `ox_mdt_reports`'
local selectReportsById = selectReports .. 'WHERE `id` LIKE ?'

---@param id number | string
function db.selectReportsById(id)
    return MySQL.rawExecute.await(selectReportsById, { wildcard:format(id) })
end

local selectReportsByString = selectReports .. ' WHERE `title` LIKE ? or `author` LIKE ? or `date` LIKE ? ORDER BY `date` DESC LIMIT 10 OFFSET ?'

---@param page number
---@param search string
function db.selectReports(page, search)
    search = wildcard:format(search)
    return MySQL.rawExecute.await(selectReportsByString, { search, search, search, (page - 1) * 10 })
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
    local officers = MySQL.rawExecute.await('SELECT b.firstName, b.lastName, b.charid as stateId FROM `ox_mdt_reports_officers` a LEFT JOIN `characters` b ON b.charid = a.charid WHERE `reportid` = ?', { reportId }) or {}
    print(json.encode(officers, {sort_keys=true,indent=true}))
    return officers
end

function db.selectCriminalsInvolved(reportId)
    local parameters = { reportId }

    ---@type { stateId: number | string, firstName: string, lastName: string, reduction: number }[]
    local criminals = MySQL.rawExecute.await('SELECT DISTINCT a.charid as stateId, b.firstName, b.lastName, a.reduction FROM `ox_mdt_reports_criminals` a LEFT JOIN `characters` b on b.charid = a.charid WHERE reportid = ?', parameters) or {}

    ---@type { stateId: number | string, label: string, time: number?, fine: number?, points: number?, count: number }[]
    local charges = MySQL.rawExecute.await('SELECT `charid` as stateId, `charge` as label, `time`, `fine`, `points`, `count` FROM `ox_mdt_reports_charges` WHERE reportid = ? GROUP BY `charge`, `charid`', parameters) or {}

    for _, criminal in pairs(criminals) do
        ---@type SelectedCharge[]
        criminal.charges = {}
        local chargesN = 0

        criminal.penalty = {
            time = 0,
            fine = 0,
            points = 0,
            reduction = criminal.reduction
        }

        for _, charge in pairs(charges) do
            if charge.label and charge.stateId == criminal.stateId then
                charge.penalty = {
                    time = charge.time or 0,
                    fine = charge.fine or 0,
                    points = charge.points or 0
                }

                charge.stateId, charge.time, charge.fine, charge.points = nil
                criminal.penalty.time += charge.penalty.time
                criminal.penalty.fine += charge.penalty.fine
                criminal.penalty.points += charge.penalty.points
                chargesN += 1
                criminal.charges[chargesN] = charge
            end
        end

    end

    return criminals
end

function db.selectEvidence(reportId)
    return MySQL.rawExecute.await('SELECT `label`, `value`, `type` FROM `ox_mdt_reports_evidence` WHERE reportid = ?', {reportId})
end

---@param reportId number
---@param criminal Criminal
function db.saveCriminal(reportId, criminal)
    MySQL.prepare.await('DELETE FROM `ox_mdt_reports_charges` WHERE `reportid` = ? AND `charid` = ?', { reportId, criminal.stateId })

    if next(criminal.charges) then
        local queries = {}
        local queryN = 0

        for _, v in pairs(criminal.charges) do
            queryN += 1
            ---@todo fetch and store all criminal offenses; use time, fine, and points
            queries[queryN] = { 'INSERT INTO `ox_mdt_reports_charges` (`reportid`, `charid`, `charge`, `count`, `time`, `fine`, `points`) VALUES (?, ?, ?, ?, ?, ?, ?)', { reportId, criminal.stateId, v.label, v.count } }
        end

        return MySQL.transaction.await(queries)
    end
end

function db.removeCriminal(reportId, charId)
    return MySQL.prepare.await('DELETE FROM `ox_mdt_reports_criminals` WHERE `reportid` = ? AND `charid` = ?', { reportId, charId })
end

---@param reportId number
---@param charId string | number
function db.addCriminal(reportId, charId)
    return MySQL.prepare.await('INSERT INTO `ox_mdt_reports_criminals` (`reportid`, `charid`) VALUES (?, ?)', { reportId, charId }) --[[@as number?]]
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

    profile.relatedReports = MySQL.rawExecute.await('SELECT DISTINCT `id`, `title`, `author`, DATE_FORMAT(`date`, "%Y-%m-%d") as date FROM `ox_mdt_reports` a LEFT JOIN `ox_mdt_reports_charges` b ON b.reportid = a.id WHERE `charid` = ?', parameters) or {}
    profile.pastCharges = MySQL.rawExecute.await('SELECT `charge` AS label, SUM(`count`) AS count FROM `ox_mdt_reports_charges` WHERE `charge` IS NOT NULL AND `charid` = ? GROUP BY `charge`', parameters) or {}

    return profile
end

local selectOfficerInvolved = [[
    SELECT
        firstName,
        lastName,
        characters.charid AS stateId,
        characters.charid AS callSign,
        character_groups.grade AS grade
    FROM
        character_groups
    LEFT JOIN
        characters
    ON
        character_groups.charid = characters.charid
    WHERE
        character_groups.name = "police"
]]

local selectOfficerInvolvedByNameA = selectOfficerInvolved .. ' AND (`firstName` LIKE ? OR `lastName` LIKE ?)'
local selectOfficerInvolvedByNameB = selectOfficerInvolved .. ' AND (`firstName` = ? AND `lastName` LIKE ?)'

---@param search string | number
---@return Officer | Officer[] | nil
function db.selectInvolvedOfficers(search)
    if not search then
        return MySQL.rawExecute.await(selectOfficerInvolved)
    end

    -- todo: search based on callSign (tonumber(search))

    local nameA, nameB = search:match('^([%w]+) ?([%w]*)$')

    if nameB == '' then
        nameA = wildcard:format(nameA)

        return MySQL.rawExecute.await(selectOfficerInvolvedByNameA, { nameA, nameA })
    end

    return MySQL.rawExecute.await(selectOfficerInvolvedByNameB, { nameA, wildcard:format(nameB) })
end

---@param reportId number
---@param stateId number
function db.addOfficer(reportId, stateId)
    return MySQL.prepare.await('INSERT INTO `ox_mdt_reports_officers` (`reportid`, `charid`) VALUES (?, ?)', {reportId, stateId})
end

---@param reportId number
---@param stateId number
function db.removeOfficer(reportId, stateId)
    return MySQL.prepare.await('DELETE FROM `ox_mdt_reports_officers` WHERE `reportid` = ? AND `charid` = ?', {reportId, stateId})
end

---@param id number
---@param type 'image' | 'item'
---@param label string
---@param value string | number 
function db.addEvidence(id, type, label, value)
    return MySQL.prepare.await('INSERT INTO `ox_mdt_reports_evidence` (`reportid`, `label`, `value`, `type`) VALUES (?, ?, ?, ?)', {id, label, value, type})
end

---@param id number
---@param label string
---@param value string
function db.removeEvidence(id, label, value)
    return MySQL.prepare.await('DELETE FROM `ox_mdt_reports_evidence` WHERE `reportid` = ? AND `label` = ? AND `value` = ?', {id, label, value})
end

---@param page number
function db.selectAnnouncements(page)
     return MySQL.rawExecute.await('SELECT a.id, a.contents, a.creator AS stateId, b.firstName, b.lastName, DATE_FORMAT(a.createdAt, "%Y-%m-%d %T") AS createdAt FROM `ox_mdt_announcements` a LEFT JOIN `characters` b ON b.charid = a.creator ORDER BY `createdAt` DESC LIMIT 5 OFFSET ?', {(page - 1) * 5})
end

---@param creator number
---@param contents string
function db.createAnnouncement(creator, contents)
    return MySQL.prepare.await('INSERT INTO `ox_mdt_announcements` (`creator`, `contents`) VALUES (?, ?)', {creator, contents})
end

---@param id number
---@param contents string
function db.updateAnnouncementContents(id, contents)
    return MySQL.prepare.await('UPDATE `ox_mdt_announcements` SET `contents` = ? WHERE `id` = ?', {contents, id})
end

---@param id number
function db.removeAnnouncement(id)
    return MySQL.prepare.await('DELETE FROM `ox_mdt_announcements` WHERE `id` = ?', {id})
end

return db
