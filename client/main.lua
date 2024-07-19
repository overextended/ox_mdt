if not lib then return end

local hasLoadedUi = false
local isMdtOpen = false
local config = require 'config'
local framework = require(('client.framework.%s'):format(config.framework))
local player = framework.getOfficerData()

local function getOfficersWithTitle(officers)
    for i = 1, #officers do
        ---@todo send group name
        officers[i].title = framework.getGroupTitle(officers[i])
    end

    return officers
end

local tabletAnimDict = 'amb@world_human_seat_wall_tablet@female@base'
local tablet

local function closeMdt(hideUi)
    if not isMdtOpen then return end

    isMdtOpen = false

    if hideUi then
        SendNUIMessage({
            action = 'setVisible',
            data = false
        })

        SetNuiFocus(false, false)
    end

    if IsEntityPlayingAnim(cache.ped, tabletAnimDict, 'base', 3) then
        ClearPedSecondaryTask(cache.ped)
    end

    if tablet then
        if DoesEntityExist(tablet) then
            Wait(300)
            DeleteEntity(tablet)
        end

        tablet = nil
    end
end

AddEventHandler(framework.loadedEvent, function()
    player = framework.getOfficerData()
end)

AddEventHandler(framework.logoutEvent, function()
    hasLoadedUi = false

    if player.group then closeMdt(true) end
end)

AddEventHandler(framework.setGroupEvent, function()
    local lastGroup = player.group

    framework.getOfficerData()

    if not player.group and lastGroup or (lastGroup and lastGroup ~= player.group) then
        closeMdt(true)
    end
end)

local function openMDT()
    ---@type boolean?, string?
    local isAuthorised, callSign = lib.callback.await('ox_mdt:openMDT', 500)

    if not isAuthorised then return end

    isMdtOpen = true

    if not IsEntityPlayingAnim(cache.ped, tabletAnimDict, 'base', 3) then
        lib.requestAnimDict(tabletAnimDict)
        TaskPlayAnim(cache.ped, tabletAnimDict, 'base', 6.0, 3.0, -1, 49, 1.0, false, false, false)
        RemoveAnimDict(tabletAnimDict)
    end

    if not tablet then
        local model = lib.requestModel(`prop_cs_tablet`)

        if not model then return end

        local coords = GetEntityCoords(cache.ped)
        tablet = CreateObject(model, coords.x, coords.y, coords.z, true, true, true)
        AttachEntityToEntity(tablet, cache.ped, GetPedBoneIndex(cache.ped, 28422), 0.0, 0.0, 0.03, 0.0, 0.0, 0.0, true,
            true, false, true, 0, true)
        SetModelAsNoLongerNeeded(model)
    end

    if not hasLoadedUi then
        -- Maybe combine into a single callback?
        local profileCards = lib.callback.await('ox_mdt:getCustomProfileCards')
        local charges = lib.callback.await('ox_mdt:getAllCharges')

        SendNUIMessage({
            action = 'setInitData',
            data = {
                profileCards = profileCards,
                locale = GetConvar('ox:locale', 'en'),
                locales = lib.getLocales(),
                charges = charges
            }
        })

        hasLoadedUi = true
    end

    player.unit = LocalPlayer.state.mdtUnitId
    player.callSign = callSign
    player.group = framework.getGroupInfo()

    SendNUIMessage({
        action = 'setVisible',
        data = player
    })

    SetNuiFocus(true, true)
end

exports('openMDT', openMDT)

lib.addKeybind({
    defaultKey = 'm',
    description = 'Open the Police MDT',
    name = 'openMDT',
    onPressed = openMDT
})

local callsAreFocused = false

lib.addKeybind({
    defaultKey = 'GRAVE',
    description = 'Toggle MDT calls focus',
    name = 'focusCalls',
    onPressed = function()
        if callsAreFocused then
            callsAreFocused = false
            SetNuiFocus(false, false)
            SetNuiFocusKeepInput(false)
            return
        end

        if IsNuiFocused() or IsPauseMenuActive() then return end

        callsAreFocused = true

        SetNuiFocus(true, true)
        SetNuiFocusKeepInput(true)
        SetCursorLocation(0.5, 0.5)

        while callsAreFocused do
            DisablePlayerFiring(cache.playerId, true)
            DisableControlAction(0, 1, true)
            DisableControlAction(0, 2, true)
            DisableControlAction(2, 199, true)
            DisableControlAction(2, 200, true)
            Wait(0)
        end
    end
})

AddEventHandler('onResourceStop', function(resource)
    if resource == cache.resource then closeMdt() end
end)

RegisterNuiCallback('hideMDT', function(_, cb)
    cb(1)
    SetNuiFocus(false, false)
    closeMdt()
end)

RegisterNuiCallback('getDepartmentsData', function(_, cb)
    local groups = {}

    for i = 1, #config.policeGroups do
        local name = config.policeGroups[i]
        groups[name] = {
            label = framework.getGroupLabel(name),
            ranks = framework.getGroupGrades(name)
        }
    end

    cb(groups)
end)

---@param event string
---@param clientCb? fun(data: any, cb: function)
local function serverNuiCallback(event, clientCb)
    RegisterNuiCallback(event, function(data, cb)
        local response = lib.callback.await('ox_mdt:' .. event, false, data)
        if clientCb then return clientCb(response, cb) end
        cb(response)
    end)
end


-- Dashboard
serverNuiCallback('getAnnouncements')
serverNuiCallback('getWarrants')
serverNuiCallback('createAnnouncement')
serverNuiCallback('editAnnouncement')
serverNuiCallback('deleteAnnouncement')
serverNuiCallback('getBOLOs')
serverNuiCallback('deleteBOLO')
serverNuiCallback('createBOLO')
serverNuiCallback('editBOLO')

-- Reports
serverNuiCallback('getCriminalProfiles')
serverNuiCallback('createReport')
serverNuiCallback('getReports')
serverNuiCallback('getReport')
serverNuiCallback('deleteReport')
serverNuiCallback('setReportTitle')
serverNuiCallback('getSearchOfficers')
serverNuiCallback('addCriminal')
serverNuiCallback('removeCriminal')
serverNuiCallback('saveCriminal')
serverNuiCallback('addOfficer')
serverNuiCallback('removeOfficer')
serverNuiCallback('addEvidence')
serverNuiCallback('removeEvidence')
serverNuiCallback('saveReportContents')
serverNuiCallback('getRecommendedWarrantExpiry')

-- Profiles
serverNuiCallback('getProfiles')
serverNuiCallback('getProfile')
serverNuiCallback('saveProfileImage')
serverNuiCallback('saveProfileNotes')

-- Dispatch
serverNuiCallback('attachToCall')
serverNuiCallback('completeCall')
serverNuiCallback('detachFromCall')
---@param data Calls
---@param cb fun(data: Calls)
serverNuiCallback('getCalls', function(data, cb)
    -- Assign street names to data from the sever to be sent to UI

    for _, call in pairs(data) do
        call.location = GetStreetNameFromHashKey(GetStreetNameAtCoord(call.coords[1], call.coords[2], 0))
    end

    cb(data)
end)
serverNuiCallback('getUnits')
serverNuiCallback('createUnit')
serverNuiCallback('joinUnit')
serverNuiCallback('leaveUnit')
serverNuiCallback('setCallUnits')
serverNuiCallback('getActiveOfficers')
serverNuiCallback('setUnitOfficers')
serverNuiCallback('setUnitType')

-- Roster
serverNuiCallback('getRosterPage', function(data, cb)
    data = getOfficersWithTitle(data)

    cb(data)
end)
serverNuiCallback('setOfficerCallSign')
serverNuiCallback('setOfficerRank')
serverNuiCallback('fireOfficer')
serverNuiCallback('hireOfficer')
serverNuiCallback('fetchRoster', function(data, cb)
    data.officers = getOfficersWithTitle(data.officers)

    cb(data)
end)


---@param data table
---@param cb function
RegisterNuiCallback('setWaypoint', function(data, cb)
    SetNewWaypoint(data[1], data[2])
    cb(1)
end)

---@param data {id: number, call: Call}
RegisterNetEvent('ox_mdt:createCall', function(data)
    data.call.id = data.id
    data.call.location = GetStreetNameFromHashKey(GetStreetNameAtCoord(data.call.coords[1], data.call.coords[2], 0))

    --todo: play more emergent sound for isEmergency
    PlaySoundFrontend(-1, 'Near_Miss_Counter_Reset', 'GTAO_FM_Events_Soundset', false)

    SendNUIMessage({
        action = 'addCall',
        data = data.call
    })
end)

---@param data {id: number, call: Call}
RegisterNetEvent('ox_mdt:editCallUnits', function(data)
    SendNUIMessage({
        action = 'editCallUnits',
        data = data
    })
end)

---@param data {id: number, coords: table}
RegisterNetEvent('ox_mdt:updateCallCoords', function(data)
    SendNUIMessage({
        action = 'updateCallCoords',
        data = data
    })
end)

---@param data {id: number, units: Units}
RegisterNetEvent('ox_mdt:setCallUnits', function(data)
    SendNUIMessage({
        action = 'setCallUnits',
        data = data
    })
end)

---@param data Units
RegisterNetEvent('ox_mdt:refreshUnits', function(data)
    SendNUIMessage({
        action = 'refreshUnits',
        data = data
    })
end)

local blips = {}

---@param data Officer[]
RegisterNetEvent('ox_mdt:updateOfficerPositions', function(data)
    if not hasLoadedUi then return end

    for i = 1, #data do
        local officer = data[i]

        if officer.stateId ~= player.stateid then
            local blip = blips[officer.stateId]

            if not blip then
                local name = ('police:%s'):format(officer.stateId)
                blip = AddBlipForCoord(officer.position[2], officer.position[1], officer.position[3])
                blips[officer.stateId] = blip

                SetBlipSprite(blip, 1)
                SetBlipDisplay(blip, 3)
                SetBlipColour(blip, 42)
                ShowFriendIndicatorOnBlip(blip, true)
                AddTextEntry(name, ('%s %s (%s)'):format(officer.firstName, officer.lastName, officer.callSign))
                BeginTextCommandSetBlipName(name)
                EndTextCommandSetBlipName(blip)
                SetBlipCategory(blip, 7)
            else
                SetBlipCoords(blip, officer.position[2], officer.position[1], officer.position[3])
            end
        end
    end

    SendNUIMessage({
        action = 'updateOfficerPositions',
        data = data
    })
end)
