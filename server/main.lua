local utils = require 'server.utils'
local db = require 'server.db'

---for testing
if not IsPrincipalAceAllowed('mdt.access', 'builtin.everyone') then
    lib.addAce('builtin.everyone', 'mdt.access')
end

utils.registerCallback('ox_mdt:openMdt', function()
    return true
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
    local player = Ox.GetPlayer(source)
    -- todo: permission checks
    return db.createAnnouncement(player.stateid, contents)
end, 'mdt.create_announcement')

---@param source number
---@param data {announcement: Announcement, value: string}
utils.registerCallback('ox_mdt:editAnnouncement', function(source, data)
    local player = Ox.GetPlayer(source)

    if data.announcement.stateId ~= player.stateid then return end

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
    return db.selectInvolvedOfficers(data)
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

-- TODO: use cron daily to remove existing warrants?
---@param search string
utils.registerCallback('ox_mdt:getWarrants', function(source, search)
    return db.selectWarrants(search)
end)

-- TODO: sync units to other clients on the disaptch page
-- Every unit function should call an event on all people on the dispatch
-- page and send the new units table to refresh the existing data
-- memo should hopefully only rerender the unit cards that have chaged

---@type Units
local units = {
    [15] = {
        members = {{firstName = 'John', lastName = 'Doe', stateId = 'BD30942', callSign = 312}},
        name = 'Unit 15',
        type = 'car'
    }
}
local unitsCreated = 0

utils.registerCallback('ox_mdt:getUnits', function()
    return units
end)

---@param source number
---@param unitType 'car' | 'motor' | 'heli' | 'boat' -- How do you do Units['type'] in Lua????
utils.registerCallback('ox_mdt:createUnit', function(source, unitType)
    local player = Ox.GetPlayer(source)

    -- TODO: Get player callSign, make sure player isn't already in a unit (maybe just run removePlayerFromUnit?)
    units[unitsCreated] = {
        members = {
            { firstName = player.firstname, lastName = player.lastname, callSign = 132, stateId = player.stateid }
        },
        name = ('Unit %d'):format(unitsCreated + 1),
        type = unitType
    }

    Player(source).state.mdtUnitId = unitsCreated
    unitsCreated += 1

    return {
        id = unitsCreated - 1,
        name = ('Unit %d'):format(unitsCreated - 1)
    }
end)

local function removePlayerFromUnit(player)
    -- TODO: fix being in a unit then restarting the resource and still
    -- being in the unit causing you not to be able to join a new one
    local playerUnitId = Player(player.source).state.mdtUnitId
    if not playerUnitId then return end
    local playerUnit = units[playerUnitId]
    for i = 1, #playerUnit.members do
        local member = playerUnit.members[i]
        if member.stateId == player.stateid then
            units[playerUnitId].members[i] = nil
            Player(source).state.mdtUnitId = nil
            if #units[playerUnitId].members == 0 then
                units[playerUnitId] = nil
                -- TODO: Remove unit from all calls it's attached to
            end
            break
        end
    end
end

---@param source number
---@param unitId number
utils.registerCallback('ox_mdt:joinUnit', function(source, unitId)
    local player = Ox.GetPlayer(source)

    removePlayerFromUnit(player)

    units[unitId].members[#units[unitId].members+1] = {
        firstName = player.firstname,
        lastName = player.lastname,
        stateId = player.stateid,
        callSign = 132
    }

    Player(source).state.mdtUnitId = unitId

    return 1
end)

---@param source number
---@param unitId number
utils.registerCallback('ox_mdt:leaveUnit', function(source, unitId)
    local player = Ox.GetPlayer(source)

    removePlayerFromUnit(player)

    return 1
end)

---@type Calls
local activeCalls = {}

---@type Calls
local completedCalls = {}

local callId = 0

---@param data CallData
function createCall(data)
    activeCalls[callId] = {
        code = data.code,
        offense = data.offense,
        completed = false,
        units = {},
        coords = data.coords,
        blip = data.blip,
        info = {
            time = os.time() * 1000,
            location = '',
            plate = data.info.plate,
            vehicle = data.info.vehicle
        }
    }

    -- TODO: iterate over in service officers and trigger events on them
    TriggerClientEvent('ox_mdt:createCall', -1, {id = callId, call = activeCalls[callId]})

    callId += 1

    return callId - 1
end

exports('createCall', createCall)

Citizen.SetTimeout(7500, function()
    local coords = GetEntityCoords(GetPlayerPed(1))

    local id = createCall({
        offense = 'Speeding',
        code = '10-69',
        blip = 51,
        info = {
            plate = 'XYZ 123',
            vehicle = 'Dinka Blista'
        },
        coords = {coords.x, coords.y}
    })
end)

---@param source number
---@param data 'active' | 'completed'
utils.registerCallback('ox_mdt:getCalls', function(source, data)
    return data == 'active' and activeCalls or completedCalls
end)

---@param source number
---@param id number
utils.registerCallback('ox_mdt:attachToCall', function(source, id)
    local playerUnitId = Player(source).state.mdtUnitId --[[@as number]]
    if not playerUnitId then return false end

    local playerUnit = units[playerUnitId]

    if activeCalls[id].units[playerUnitId] then return false end
    activeCalls[id].units[playerUnitId] = playerUnit

    -- Used to update a call notification - does not refresh calls list in the MDT
    TriggerClientEvent('ox_mdt:updateCall', -1, {id = id, call = activeCalls[id]})

    return true
end)

---@param source number
---@param id number
utils.registerCallback('ox_mdt:detachFromCall', function(source, id)
    local playerUnitId = Player(source).state.mdtUnitId --[[@as number]]
    if not playerUnitId then return false end

    if not activeCalls[id].units[playerUnitId] then return false end

    activeCalls[id].units[playerUnitId] = nil

    -- Used to update a call notification - does not refresh calls list in the MDT
    TriggerClientEvent('ox_mdt:updateCall', -1, {id = id, call = activeCalls[id]})

    return true
end)

---@param source number
---@param id number
utils.registerCallback('ox_mdt:completeCall', function(source, id)
    if not activeCalls[id] then return end

    activeCalls[id].completed = true
    completedCalls[id] = activeCalls[id]
    activeCalls[id] = nil

    return true
end)