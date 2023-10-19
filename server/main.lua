local registerCallback = require 'server.utils.registerCallback'
local db = require 'server.db'
local officers = require 'server.officers'
local isAuthorised = require 'server.utils.isAuthorised'

require 'server.units'
require 'server.charges'
require 'server.calls'

registerCallback('ox_mdt:openMDT', function()
    return officers.get(source) and true
end)

---@param source number
---@param page number
registerCallback('ox_mdt:getAnnouncements', function(source, page)
    local announcements = db.selectAnnouncements(page)
    return {
        hasMore = #announcements == 5 or false,
        announcements = announcements
    }
end)

---@param source number
---@param contents string
registerCallback('ox_mdt:createAnnouncement', function(source, contents)
    local officer = officers.get(source)

    return officer and db.createAnnouncement(officer.stateId, contents)
end, 'create_announcement')

---@param source number
---@param data { announcement: Announcement, value: string }
registerCallback('ox_mdt:editAnnouncement', function(source, data)
    local officer = officers.get(source)
    local announcement = db.selectAnnouncement(data.id)

    if not officer then return end

    if announcement.creator ~= officer.stateId then return end

    return db.updateAnnouncementContents(data.announcement.id, data.value)
end)

---@param source number
---@param id number
registerCallback('ox_mdt:deleteAnnouncement', function(source, id)
    local officer = officers.get(source)
    local announcement = db.selectAnnouncement(id)

    if not isAuthorised(source, 'delete_announcement') and announcement.creator ~= officer.stateId then return end

    return db.removeAnnouncement(id)
end, 'delete_announcement')

---@param source number
---@param page number
registerCallback('ox_mdt:getBOLOs', function(source, page)
    local bolos = db.selectBOLOs(page)

    for i = 1, #bolos do
        bolos[i].images = json.decode(bolos[i].images) or nil
    end

    return {
        hasMore = #bolos == 5 or false,
        bolos = bolos
    }
end)

---@param source number
---@param id number
registerCallback('ox_mdt:deleteBOLO', function(source, id)
    return db.deleteBOLO(id)
end, 'delete_bolo')

---@param source number
---@param data {id: number, contents: string, images: string[]}
registerCallback('ox_mdt:editBOLO', function(source, data)
    local officer = officers.get(source)
    local bolo = db.selectBOLO(data.id)

    if not officer then return end

    if bolo.creator ~= officer.stateId then return end

    return db.updateBOLO(data.id, data.contents, data.images)
end)

---@param source number
---@param data {contents: string, images: string[]}
registerCallback('ox_mdt:createBOLO', function(source, data)
    local officer = officers.get(source)
    local boloId = db.createBOLO(officer.stateId, data.contents)

    db.createBOLOImages(boloId, data.images)

    return boloId
end, 'create_bolo')

---@param source number
---@param search string
---@return CriminalProfile[]?
registerCallback('ox_mdt:getCriminalProfiles', function(source, search)
    return db.searchCharacters(search)
end)

---@param title string
---@return number?
registerCallback('ox_mdt:createReport', function(source, title)
    local officer = officers.get(source)

    return officer and db.createReport(title, ('%s %s'):format(officer.firstName, officer.lastName))
end, 'create_report')

---@param source number
---@param data { page: number, search: string }
---@return PartialReportData[]
registerCallback('ox_mdt:getReports', function(source, data)
    local reports = tonumber(data.search) and db.selectReportById(data.search --[[@as number]]) or db.selectReports(data.page, data.search)

    return {
        hasMore = #reports == 10 or false,
        reports = reports
    }
end)

---@param source number
---@param reportId number
---@return Report?
registerCallback('ox_mdt:getReport', function(source, reportId)
    local response = db.selectReportById(reportId)

    if response then
        response.officersInvolved = db.selectOfficersInvolved(reportId)
        response.evidence = db.selectEvidence(reportId)
        response.criminals = db.selectCriminalsInvolved(reportId)
    end

    return response
end)

---@param source number
---@param reportId number
---@return number
registerCallback('ox_mdt:deleteReport', function(source, reportId)
    return db.deleteReport(reportId)
end, 'delete_report')

---@param source number
---@param data { id: number, title: string}
---@return number
registerCallback('ox_mdt:setReportTitle', function(source, data)
    return db.updateReportTitle(data.title, data.id)
end, 'edit_report_title')

---@param source number
---@param data { reportId: number, contents: string}
---@return number
registerCallback('ox_mdt:saveReportContents', function(source, data)
    return db.updateReportContents(data.reportId, data.contents)
end, 'edit_report_contents')

---@param source number
---@param data { id: number, criminalId: string }
registerCallback('ox_mdt:addCriminal', function(source, data)
    return db.addCriminal(data.id, data.criminalId)
end, 'add_criminal')

---@param source number
---@param data { id: number, criminalId: string }
registerCallback('ox_mdt:removeCriminal', function(source, data)
    return db.removeCriminal(data.id, data.criminalId)
end, 'remove_criminal')

---@param source number
---@param data { id: number, criminal: Criminal }
registerCallback('ox_mdt:saveCriminal', function(source, data)
    if data.criminal.issueWarrant then
        db.createWarrant(data.id, data.criminal.stateId, data.criminal.warrantExpiry)
    else
        -- This would still run the delete query even if the criminal was saved without
        -- there previously being a warrant issued, but should be fine?
        db.removeWarrant(data.id, data.criminal.stateId)
    end

    return db.saveCriminal(data.id, data.criminal)
end, 'save_criminal')

---@param source number
---@param data { id: number, evidence: Evidence }
registerCallback('ox_mdt:addEvidence', function(source, data)
    return db.addEvidence(data.id, data.evidence.label, data.evidence.image)
end, 'add_evidence')

---@param source number
---@param data { id: number, label: string, image: string }
registerCallback('ox_mdt:removeEvidence', function(source, data)
    return db.removeEvidence(data.id, data.label, data.image)
end, 'remove_evidence')

---@param source number
---@param data {page: number, search: string}
registerCallback('ox_mdt:getProfiles', function(source, data)
    local profiles = db.selectProfiles(data.page, data.search)

    return {
        hasMore = #profiles == 10 or false,
        profiles = profiles
    }
end)

---@param source number
---@param data string
registerCallback('ox_mdt:getProfile', function(source, data)
    return db.selectCharacterProfile(data)
end)

---@param source number
---@param data {stateId: string, image: string}
registerCallback('ox_mdt:saveProfileImage', function(source, data)
    return db.updateProfileImage(data.stateId, data.image)
end, 'change_profile_picture')

---@param source number
---@param data {stateId: string, notes: string}
registerCallback('ox_mdt:saveProfileNotes', function(source, data)
    return db.updateProfileNotes(data.stateId, data.notes)
end, 'edit_profile_notes')

---@param source number
---@param data string
registerCallback('ox_mdt:getSearchOfficers', function(source, data)
    return db.searchOfficers(data)
end)

---@param source number
---@param data {id: number, stateId: number}
registerCallback('ox_mdt:addOfficer', function(source, data)
    return db.addOfficer(data.id, data.stateId)
end, 'add_officer_involved')

---@param source number
---@param data {id: number, stateId: number}
registerCallback('ox_mdt:removeOfficer', function(source, data)
    return db.removeOfficer(data.id, data.stateId)
end, 'remove_officer_involved')

---@param source number
---@param charges Charge[]
registerCallback('ox_mdt:getRecommendedWarrantExpiry', function(source, charges)
    ---@diagnostic disable-next-line: param-type-mismatch
    local currentTime = os.time(os.date("!*t"))
    local baseWarrantDuration = 259200000 -- 72 hours
    local addonTime = 0

    for i = 1, #charges do
        local charge = charges[i]
        if charge.time ~= 0 then
            addonTime = addonTime + (charge.time * 60 * 60000 * charge.count)  -- 1 month of penalty time = 1 hour of warrant time
        end
    end

    return currentTime * 1000 + addonTime + baseWarrantDuration
end)

---@param search string
registerCallback('ox_mdt:getWarrants', function(source, search)
    return db.selectWarrants(search)
end)

registerCallback('ox_mdt:getActiveOfficers', function()
    return officers.getAll()
end)

---@param source number
---@param data { stateId: string, callSign: string }
registerCallback('ox_mdt:setOfficerCallSign', function(source, data)
    if db.selectOfficerCallSign(data.callSign) then return false end

    db.updateOfficerCallSign(data.stateId, data.callSign)

    return true
end, 'set_call_sign')

AddEventHandler('onResourceStop', function(resource)
    if resource ~= cache.resource then return end

    for playerId, officer in pairs(officers.getAll()) do
        if officer.unitId then
            Player(playerId).state.mdtUnitId = nil
        end
    end
end)

lib.cron.new('0 */1 * * *', function()
    db.removeOldWarrants()
end)