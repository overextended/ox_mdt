if not lib then return end

lib.locale()

local hasLoadedUi = false

local function openMDT()
    SetNuiFocus(true, true)

    if hasLoadedUi then
        return SendNUIMessage({
            action = 'setVisible'
        })
    end

    SendNUIMessage({
        action = 'setLocales',
        data = lib.getLocales()
    })

    SendNUIMessage({
        action = 'setVisible',
        data = {
            stateId = player.stateid,
            firstName = player.firstname,
            lastName = player.lastname,
            title = 'LSPD Officer',
            grade = 4,
            callSign = 132
        }
    })

    hasLoadedUi = true
end

exports('openMDT', openMDT)

lib.addKeybind({
    defaultKey = 'm',
    description = 'Open the Police MDT',
    name = 'openmdt',
    onPressed = openMDT
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
serverNuiCallback('getProfiles')
serverNuiCallback('getProfile')
serverNuiCallback('saveProfileImage')
serverNuiCallback('saveProfileNotes')
serverNuiCallback('createUnit') -- Returns a table with id and name property which is the created unit id and name
serverNuiCallback('joinUnit')
serverNuiCallback('leaveUnit')
serverNuiCallback('getRecommendedWarrantExpiry')

-- SendNUIMessage({
--     action = 'updateOfficerPositions',
--     data = {} -- {name: string; callSign: number; position: [number, number]}[]
-- })
