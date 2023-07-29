if not lib then return end

lib.locale()

local hasLoadedUi = false

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

AddEventHandler('ox:playerLoaded', function(data)
    hasLoadedUi = false
end)

RegisterNuiCallback('hideMDT', function(_, cb)
    cb(1)
    SetNuiFocus(false, false)
end)

---@param event string
local function serverNuiCallback(event)
    RegisterNuiCallback(event, function(data, cb)
        print('triggered ' .. event)
        local response = lib.callback.await('ox_mdt:' .. event, false, data)
        print('response ' .. event, json.encode(response, { indent = true, sort_keys = true }))
        cb(response)
    end)
end

serverNuiCallback('getAnnouncements')
serverNuiCallback('getWarrants')
serverNuiCallback('createAnnouncement')
serverNuiCallback('editAnnouncement')
serverNuiCallback('deleteAnnouncement')
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
serverNuiCallback('getProfiles')
serverNuiCallback('getProfile')
serverNuiCallback('saveProfileImage')
serverNuiCallback('saveProfileNotes')
serverNuiCallback('getUnits')
serverNuiCallback('createUnit')
serverNuiCallback('joinUnit')
serverNuiCallback('leaveUnit')
serverNuiCallback('getRecommendedWarrantExpiry')

-- SendNUIMessage({
--     action = 'updateOfficerPositions',
--     data = {} -- {name: string; callSign: number; position: [number, number]}[]
-- })
