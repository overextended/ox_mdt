local utils = require 'server.utils'
local db = require 'server.db'

---@param source string
---@param page number
utils.registerCallback('ox_mdt:getAnnouncements', function(source, page)
    local announcements = db.selectAnnouncements(page)
    return {
        hasMore = #announcements > 0,
        announcements = announcements
    }
end)

---@param source string
---@param contents string
utils.registerCallback('ox_mdt:createAnnouncement', function(source, contents)
    local player = Ox.GetPlayer(source)
    -- todo: permission checks
    return db.createAnnouncement(player.charid, contents)
end)

---@param source string
---@param data {announcement: Announcement, value: string}
utils.registerCallback('ox_mdt:editAnnouncement', function(source, data)
    local player = Ox.GetPlayer(source)

    if data.announcement.stateId ~= player.charid then return end

    return db.updateAnnouncementContents(data.announcement.id, data.value)
end)

---@param source string
---@param id number
utils.registerCallback('ox_mdt:deleteAnnouncement', function(source, id)
    -- todo: permission check or creator check

    print('delete announcement db call')
    return db.removeAnnouncement(id)
end)

---@param source number
---@param search string
---@return CriminalProfile[]?
utils.registerCallback('ox_mdt:getCriminalProfiles', function(source, search)
    if tonumber(search) then
        return db.selectCharacterById(search)
    end

    return db.selectCharacterByName(search)
end)

---@param title string
---@return number?
utils.registerCallback('ox_mdt:createReport', function(source, title)
    local player = Ox.GetPlayer(source)
    return db.createReport(title, player.name)
end)

---@param source number
---@param data {page: number, search: string;}
---@return ReportCard[]
utils.registerCallback('ox_mdt:getReports', function(source, data)

    local reports = tonumber(data.search) and db.selectReportById(data.search) or db.selectReports(data.page, data.search)

    return {
        hasMore = #reports > 0,
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
---@param data { id: number, criminalId: number }
utils.registerCallback('ox_mdt:addCriminal', function(source, data)
    return db.addCriminal(data.id, data.criminalId)
end)

---@param source number
---@param data { id: number, criminalId: number }
utils.registerCallback('ox_mdt:removeCriminal', function(source, data)
    return db.removeCriminal(data.id, data.criminalId)
end)

---@param source number
---@param data { id: number, criminal: Criminal }
utils.registerCallback('ox_mdt:saveCriminal', function(source, data)
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
---@param data string
utils.registerCallback('ox_mdt:getProfiles', function(source, data)
    return db.selectProfiles()
end)

---@param source number
---@param data string
utils.registerCallback('ox_mdt:getProfile', function(source, data)
    return db.selectCharacterProfile(data)
end)

---@param source number
---@param data string
utils.registerCallback('ox_mdt:getSearchOfficers', function(source, data)
    return db.selectInvolvedOfficers(data)
end)

---@param source string
---@param data {id: number, stateId: number}
utils.registerCallback('ox_mdt:addOfficer', function(source, data)
    return db.addOfficer(data.id, data.stateId)
end)

---@param source string
---@param data {id: number, stateId: number}
utils.registerCallback('ox_mdt:removeOfficer', function(source, data)
    return db.removeOfficer(data.id, data.stateId)
end)

---@param source string
---@param charges Charge[]
utils.registerCallback('ox_mdt:getRecommendedWarrantExpiry', function(source, charges)
    local currentTime = os.time(os.date("!*t"))
    local baseWarrantDuration = 259200000 -- 72 hours
    local addonTime = 0

    for i = 1, #charges do
        local charge = charges[i] -- [[as Charge]]
        if charge.penalty.time ~= 0 then
            addonTime = addonTime + (charge.penalty.time * 60 * 60000) -- 1 month of penalty time = 1 hour of warrant time
        end
    end

    return currentTime * 1000 + addonTime + baseWarrantDuration
end)