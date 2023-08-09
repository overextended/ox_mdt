if not lib then return end

lib.locale()

local hasLoadedUi = false

if LocalPlayer.state.mdtUnitId then
    LocalPlayer.state.mdtUnitId = nil
end

local function openMdt()
    local isAuthorised, callSign = lib.callback.await('ox_mdt:openMdt', 500)

    if isAuthorised then
        if not hasLoadedUi then
            SendNUIMessage({
                action = 'setLocales',
                data = lib.getLocales()
            })

            hasLoadedUi = true
        end

        local group = GlobalState['group.police'] --[[@as OxGroupProperties]]
        local grade = player.groups.police

        SendNUIMessage({
            action = 'setVisible',
            data = {
                stateId = player.stateid,
                firstName = player.firstname,
                lastName = player.lastname,
                unit = LocalPlayer.state.mdtUnitId,
                title = ('%s %s'):format(group.label:gsub('[%U]', ''), group.grades[player.groups.police]),
                grade = grade,
                callSign = callSign
            }
        })

        SetNuiFocus(true, true)
    end
end

exports('openMdt', openMdt)

lib.addKeybind({
    defaultKey = 'm',
    description = 'Open the Police MDT',
    name = 'openMdt',
    onPressed = openMdt
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

RegisterCommand('fix-focus', function()
    SetNuiFocus(false, false)
end)

AddEventHandler('ox:playerLoaded', function(data)
    LocalPlayer.state.mdtUnitId = nil
    hasLoadedUi = false
end)

RegisterNuiCallback('hideMDT', function(_, cb)
    cb(1)
    SetNuiFocus(false, false)
end)

---@param event string
---@param clientCb? fun(data: any, cb: function)
local function serverNuiCallback(event, clientCb)
    RegisterNuiCallback(event, function(data, cb)
        print('triggered ' .. event)
        local response = lib.callback.await('ox_mdt:' .. event, false, data)
        print('response ' .. event, json.encode(response, { indent = true, sort_keys = true }))
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
serverNuiCallback('detachFromCall')
---@param data Calls
---@param cb fun(data: Calls)
serverNuiCallback('getCalls', function(data, cb)
    -- Assign street names to data from the sever to be sent to UI

    for _, call in pairs(data) do
        call.info.location = GetStreetNameFromHashKey(GetStreetNameAtCoord(call.coords[1], call.coords[2]))
    end

    cb(data)
end)
serverNuiCallback('getUnits')
serverNuiCallback('createUnit')
serverNuiCallback('joinUnit')
serverNuiCallback('leaveUnit')

---@param data table
---@param cb function
RegisterNuiCallback('setWaypoint', function(data, cb)
    SetNewWaypoint(data[1], data[2])
    cb(1)
end)

---@param data Call
RegisterNetEvent('ox_mdt:createCall', function(data)
    data.info.location = GetStreetNameFromHashKey(GetStreetNameAtCoord(data.coords[1], data.coords[2]))

    -- TODO: play sound (maybe isEmergency later?)

    SendNUIMessage({
        action = 'addCall',
        data = data
    })
end)

-- SendNUIMessage({
--     action = 'updateOfficerPositions',
--     data = {} -- {name: string; callSign: number; position: [number, number]}[]
-- })
