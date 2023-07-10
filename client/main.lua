local firstOpen = true

local function openMDT()
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'setVisible',
        data = firstOpen and {
            stateId = player.charid,
            firstName = player.firstname,
            lastName = player.lastname,
            title = 'LSPD Officer',
            grade = 4,
            callSign = 132
        }
    })
    firstOpen = false
end

AddEventHandler('ox:playerLoaded', function(data)
    firstOpen = true
end)


exports('openMDT', openMDT)

RegisterKeyMapping('openMDT', 'Open the MDT', 'keyboard', 'm')

RegisterCommand('openMDT', openMDT)

RegisterNUICallback('hideMDT', function(_, cb)
    cb(1)
    SetNuiFocus(false, false)
end)


RegisterNUICallback('getAnnouncements', function(_, cb)
    cb({})
end)

---@param event string
local function serverNuiCallback(event)
    RegisterNuiCallback(event, function(data, cb)
        print('triggered '..event)
        local response = lib.callback.await('ox_mdt:'..event, false, data)
        print('response '..event, json.encode(response, {indent=true,sort_keys=true}))
        cb(response)
    end)
end

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

SendNUIMessage({
    action = 'updateOfficerPositions',
    data = {} -- {name: string; callSign: number; position: [number, number]}[]
})