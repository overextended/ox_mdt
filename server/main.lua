lib.locale()

local utils = require 'server.utils'
local db = require 'server.db'
local officers = require 'server.officers'
local units = require 'server.units'
require 'server.charges'

require 'server.calls'
require 'server.framework.ox_core'

---for testing
if not IsPrincipalAceAllowed('mdt.access', 'builtin.everyone') then
    lib.addAce('builtin.everyone', 'mdt.access')
end

utils.registerCallback('ox_mdt:openMdt', function()
    return officers.get(source) and true
end)

---@param source number
---@param page number
utils.registerCallback('ox_mdt:getAnnouncements', function(source, page)
    local announcements = db.selectAnnouncements(page)
    return {
        hasMore = #announcements == 5 or false,
        announcements = announcements
    }
end)

---@param source number
---@param contents string
utils.registerCallback('ox_mdt:createAnnouncement', function(source, contents)
    local officer = officers.get(source)

    return officer and db.createAnnouncement(officer.stateId, contents)
end, 'mdt.create_announcement')

---@param source number
---@param data { announcement: Announcement, value: string }
utils.registerCallback('ox_mdt:editAnnouncement', function(source, data)
    local officer = officers.get(source)

    if not officer or data.announcement.stateId ~= officer.stateId then return end

    return db.updateAnnouncementContents(data.announcement.id, data.value)
end)

---@param source number
---@param id number
utils.registerCallback('ox_mdt:deleteAnnouncement', function(source, id)
    -- todo: permission check or creator check

    return db.removeAnnouncement(id)
end)

---@param source number
---@param search string
---@return CriminalProfile[]?
utils.registerCallback('ox_mdt:getCriminalProfiles', function(source, search)
    return db.searchCharacters(search)
end)

---@param title string
---@return number?
utils.registerCallback('ox_mdt:createReport', function(source, title)
    local officer = officers.get(source)

    return officer and db.createReport(title, ('%s %s'):format(officer.firstName, officer.lastName))
end)

---@param source number
---@param data { page: number, search: string }
---@return PartialReportData[]
utils.registerCallback('ox_mdt:getReports', function(source, data)
    local reports = tonumber(data.search) and db.selectReportById(data.search --[[@as number]]) or db.selectReports(data.page, data.search)

    return {
        hasMore = #reports == 10 or false,
        reports = reports
    }
end)

---@param source number
---@param reportId number
---@return Report?
utils.registerCallback('ox_mdt:getReport', function(source, reportId)
    local response = db.selectReportById(reportId)

    if response then
        ---@todo officersInvovled callSigns
        response.officersInvolved = db.selectOfficersInvolved(reportId)
        response.evidence = db.selectEvidence(reportId)
        response.criminals = db.selectCriminalsInvolved(reportId)
    end

    return response
end)

---@param source number
---@param reportId number
---@return number
utils.registerCallback('ox_mdt:deleteReport', function(source, reportId)
    return db.deleteReport(reportId)
end)

---@param source number
---@param data { id: number, title: string}
---@return number
utils.registerCallback('ox_mdt:setReportTitle', function(source, data)
    return db.updateReportTitle(data.title, data.id)
end)

---@param source number
---@param data { reportId: number, contents: string}
---@return number
utils.registerCallback('ox_mdt:saveReportContents', function(source, data)
    return db.updateReportContents(data.reportId, data.contents)
end)

---@param source number
---@param data { id: number, criminalId: string }
utils.registerCallback('ox_mdt:addCriminal', function(source, data)
    return db.addCriminal(data.id, data.criminalId)
end)

---@param source number
---@param data { id: number, criminalId: string }
utils.registerCallback('ox_mdt:removeCriminal', function(source, data)
    return db.removeCriminal(data.id, data.criminalId)
end)

---@param source number
---@param data { id: number, criminal: Criminal }
utils.registerCallback('ox_mdt:saveCriminal', function(source, data)
    if data.criminal.issueWarrant then
        db.createWarrant(data.id, data.criminal.stateId, data.criminal.warrantExpiry)
    else
        -- This would still run the delete query even if the criminal was saved without
        -- there previously being a warrant issued, but should be fine?
        db.removeWarrant(data.id, data.criminal.stateId)
    end

    return db.saveCriminal(data.id, data.criminal)
end)

---@param source number
---@param data { id: number, callSign: string }
utils.registerCallback('ox_mdt:addOfficer', function(source, data)
    return 1
end)

---@param source number
---@param data { id: number, index: number }
utils.registerCallback('ox_mdt:removeOfficer', function(source, data)
    return 1
end)

---@param source number
---@param data { id: number, evidence: Evidence }
utils.registerCallback('ox_mdt:addEvidence', function(source, data)
    return db.addEvidence(data.id, data.evidence.type, data.evidence.label, data.evidence.value)
end)

---@param source number
---@param data { id: number, label: string, value: string }
utils.registerCallback('ox_mdt:removeEvidence', function(source, data)
    return db.removeEvidence(data.id, data.label, data.value)
end)

---@param source number
---@param data {page: number, search: string}
utils.registerCallback('ox_mdt:getProfiles', function(source, data)
    local profiles = db.selectProfiles(data.page, data.search)

    return {
        hasMore = #profiles == 10 or false,
        profiles = profiles
    }
end)

---@param source number
---@param data string
utils.registerCallback('ox_mdt:getProfile', function(source, data)
    return db.selectCharacterProfile(data)
end)

---@param source number
---@param data {stateId: string, image: string}
utils.registerCallback('ox_mdt:saveProfileImage', function(source, data)
    return db.updateProfileImage(data.stateId, data.image)
end)

---@param source number
---@param data {stateId: string, notes: string}
utils.registerCallback('ox_mdt:saveProfileNotes', function(source, data)
    return db.updateProfileNotes(data.stateId, data.notes)
end)

---@param source number
---@param data string
utils.registerCallback('ox_mdt:getSearchOfficers', function(source, data)
    return db.searchOfficers(data)
end)

---@param source number
---@param data {id: number, stateId: number}
utils.registerCallback('ox_mdt:addOfficer', function(source, data)
    return db.addOfficer(data.id, data.stateId)
end)

---@param source number
---@param data {id: number, stateId: number}
utils.registerCallback('ox_mdt:removeOfficer', function(source, data)
    return db.removeOfficer(data.id, data.stateId)
end)

---@param source number
---@param charges Charge[]
utils.registerCallback('ox_mdt:getRecommendedWarrantExpiry', function(source, charges)
    ---@diagnostic disable-next-line: param-type-mismatch
    local currentTime = os.time(os.date("!*t"))
    local baseWarrantDuration = 259200000 -- 72 hours
    local addonTime = 0

    for i = 1, #charges do
        local charge = charges[i]
        if charge.time ~= 0 then
            addonTime = addonTime + (charge.time * 60 * 60000) -- 1 month of penalty time = 1 hour of warrant time
        end
    end

    return currentTime * 1000 + addonTime + baseWarrantDuration
end)

-- TODO: use cron daily to remove existing warrants?
---@param search string
utils.registerCallback('ox_mdt:getWarrants', function(source, search)
    return db.selectWarrants(search)
end)

utils.registerCallback('ox_mdt:getActiveOfficers', function()
    return officers.getAll()
end)


AddEventHandler('onResourceStop', function(resource)
    if resource ~= cache.resource then return end

    for playerId, officer in pairs(officers.getAll()) do
        if officer.unitId then
            Player(playerId).state.mdtUnitId = nil
        end
    end
end)

AddEventHandler('ox:playerLogout', function(playerId)
    local officer = officers.get(playerId)

    if officer then
        local state = Player(playerId).state
        units.removePlayerFromUnit(officer, state)
        officers.remove(playerId)
    end
end)