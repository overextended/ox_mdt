local db = {}
local wildcard = '%s%%'
local framework = require 'server.framework.ox_core'
local profileCards = require 'server.profileCards'
local dbSearch = require 'server.dbSearch'

---@param search string
function db.searchCharacters(search)
    return dbSearch(framework.getCharacters, search)
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

---@param stateId string
---@param image string | nil
function db.updateProfileImage(stateId, image)
    return MySQL.prepare.await('INSERT INTO `ox_mdt_profiles` (`stateid`, `image`, `notes`) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE `image` = ?', { stateId, image, nil, image })
end

---@param stateId string
---@param notes string
function db.updateProfileNotes(stateId, notes)
    return MySQL.prepare.await('INSERT INTO `ox_mdt_profiles` (`stateid`, `image`, `notes`) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE `notes` = ?', { stateId, nil, notes, notes })
end

---@param callSign string
function db.selectOfficerCallSign(callSign)
    return MySQL.prepare.await('SELECT `callSign` FROM `ox_mdt_profiles` WHERE callSign = ?', { callSign })
end

---@param stateId string
---@param callSign string
function db.updateOfficerCallSign(stateId, callSign)
    return MySQL.prepare.await('INSERT INTO `ox_mdt_profiles` (`stateId`, `image`, `notes`, `callSign`) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE `callSign` = ?', { stateId, nil, nil, callSign, callSign })
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

---@param page number
---@param search string
---@return PartialProfileData[]?
function db.selectProfiles(page, search)
    local offset = (page - 1) * 10
    -- todo: search based on name or stateid
    return framework.getProfiles({ offset })
end

---@param reportId number
function db.selectOfficersInvolved(reportId)
    return framework.getOfficersInvolved({ reportId })
end

function db.selectCriminalsInvolved(reportId)
    local parameters = { reportId }
    local criminals = framework.getCriminalsInvolved(parameters) or {}
    local charges = framework.getCriminalCharges(parameters) or {}

    for _, criminal in pairs(criminals) do
        ---@type SelectedCharge[]
        criminal.charges = {}
        local chargesN = 0

        criminal.penalty = {
            time = 0,
            fine = 0,
            reduction = criminal.reduction
        }

        for _, charge in pairs(charges) do
            if charge.label and charge.stateId == criminal.stateId then

                charge.stateId = nil
                criminal.penalty.time += charge.time or 0
                criminal.penalty.fine += charge.fine or 0
                chargesN += 1
                criminal.charges[chargesN] = charge
            end
        end

        if criminal.warrantExpiry then
            criminal.issueWarrant = true
        end

        criminal.processed = criminal.processed or false
        criminal.pleadedGuilty = criminal.pleadedGuilty or false
    end

    return criminals
end

function db.selectEvidence(reportId)
    return MySQL.rawExecute.await('SELECT `label`, `value`, `type` FROM `ox_mdt_reports_evidence` WHERE reportid = ?', { reportId })
end

---@param reportId number
---@param criminal Criminal
function db.saveCriminal(reportId, criminal)
    local queries = {
        { 'DELETE FROM `ox_mdt_reports_charges` WHERE `reportid` = ? AND `stateId` = ?', { reportId, criminal.stateId } },
        { 'UPDATE IGNORE `ox_mdt_reports_criminals` SET `warrantExpiry` = ?, `processed` = ?, `pleadedGuilty` = ? WHERE `reportid` = ? AND `stateId` = ?', { criminal.issueWarrant and criminal.warrantExpiry or nil, criminal.processed, criminal.pleadedGuilty, reportId, criminal.stateId } },
    }
    local queryN = #queries

    if next(criminal.charges) then
        for _, v in pairs(criminal.charges) do
            queryN += 1
            queries[queryN] = { 'INSERT INTO `ox_mdt_reports_charges` (`reportid`, `stateId`, `charge`, `count`, `time`, `fine`) VALUES (?, ?, ?, ?, ?, ?)', { reportId, criminal.stateId, v.label, v.count, v.time, v.fine } }
        end
    end

    return MySQL.transaction.await(queries)
end

function db.removeCriminal(reportId, stateId)
    return MySQL.prepare.await('DELETE FROM `ox_mdt_reports_criminals` WHERE `reportid` = ? AND `stateId` = ?', { reportId, stateId })
end

---@param reportId number
---@param stateId string
function db.addCriminal(reportId, stateId)
    return MySQL.prepare.await('INSERT INTO `ox_mdt_reports_criminals` (`reportid`, `stateId`) VALUES (?, ?)', { reportId, stateId }) --[[@as number?]]
end

---@param search string | number
---@return Profile?
function db.selectCharacterProfile(search)
    local parameters = { search }
    local profile = framework.getCharacterProfile(parameters)

    if not profile then return end

    local cards = profileCards.getAll()

    for i = 1, #cards do
        local card = cards[i]
        profile[card.id] = card.getData(profile)
    end

    profile.relatedReports = MySQL.rawExecute.await('SELECT DISTINCT `id`, `title`, `author`, DATE_FORMAT(`date`, "%Y-%m-%d") as date FROM `ox_mdt_reports` a LEFT JOIN `ox_mdt_reports_charges` b ON b.reportid = a.id WHERE `stateId` = ?', parameters) or {}

    return profile
end

---@param search string?
---@return Officer | Officer[] | nil
function db.searchOfficers(search)
    print('searchOfficers', type(search), search)
    return dbSearch(framework.getOfficers, search)
end

---@param reportId number
---@param stateId number
function db.addOfficer(reportId, stateId)
    return MySQL.prepare.await('INSERT INTO `ox_mdt_reports_officers` (`reportid`, `stateId`) VALUES (?, ?)', { reportId, stateId })
end

---@param reportId number
---@param stateId number
function db.removeOfficer(reportId, stateId)
    return MySQL.prepare.await('DELETE FROM `ox_mdt_reports_officers` WHERE `reportid` = ? AND `stateId` = ?', { reportId, stateId })
end

---@param id number
---@param type 'image' | 'item'
---@param label string
---@param value string | number 
function db.addEvidence(id, type, label, value)
    return MySQL.prepare.await('INSERT INTO `ox_mdt_reports_evidence` (`reportid`, `label`, `value`, `type`) VALUES (?, ?, ?, ?)', { id, label, value, type })
end

---@param id number
---@param label string
---@param value string
function db.removeEvidence(id, label, value)
    return MySQL.prepare.await('DELETE FROM `ox_mdt_reports_evidence` WHERE `reportid` = ? AND `label` = ? AND `value` = ?', { id, label, value })
end

---@param id number
---@param value string
function db.updateReportContents(id, value)
    return MySQL.prepare.await('UPDATE `ox_mdt_reports` SET `description` = ? WHERE `id` =  ?', { value, id })
end

---@param page number
function db.selectAnnouncements(page)
    return framework.getAnnouncements({ (page - 1) * 5 })
end

---@param creator string
---@param contents string
function db.createAnnouncement(creator, contents)
    return MySQL.prepare.await('INSERT INTO `ox_mdt_announcements` (`creator`, `contents`) VALUES (?, ?)', { creator, contents })
end

---@param id number
---@param contents string
function db.updateAnnouncementContents(id, contents)
    return MySQL.prepare.await('UPDATE `ox_mdt_announcements` SET `contents` = ? WHERE `id` = ?', { contents, id })
end

---@param id number
function db.removeAnnouncement(id)
    return MySQL.prepare.await('DELETE FROM `ox_mdt_announcements` WHERE `id` = ?', { id })
end

---@param search string
function db.selectWarrants(search)
    print('selectWarrants', type(search), search)
    return dbSearch(framework.getWarrants, search)
end

function db.createWarrant(reportId, stateId, expiry)
    return MySQL.prepare.await('INSERT INTO `ox_mdt_warrants` (`reportid`, `stateid`, `expiresAt`) VALUES (?, ?, ?)', { reportId, stateId, expiry })
end

function db.removeWarrant(reportId, stateId)
    return MySQL.prepare.await('DELETE FROM `ox_mdt_warrants` WHERE `reportid` = ? AND `stateid` = ?', { reportId, stateId })
end

return db
