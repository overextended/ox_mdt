local function openMDT()
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'setVisible',
        data = true
    })
end

exports('openMDT', openMDT)

RegisterKeyMapping('openMDT', 'Open the MDT', 'keyboard', 'm')

RegisterCommand('openMDT', openMDT)

RegisterNUICallback('hideMDT', function(_, cb)
    cb(1)
    SetNuiFocus(false, false)
end)

RegisterNUICallback('uiLoaded', function(_, cb)
    cb({
        id = 1,
        firstName = 'John',
        lastName = 'Snow',
        title = 'LSPD Officer',
        grade = 4,
        callSign = 132
    })
end)

RegisterNUICallback('getAnnouncements', function(_, cb)
    cb({})
end)

---@param event string
local function serverNuiCallback(event)
    RegisterNuiCallback(event, function(data, cb)
        cb(lib.callback.await('ox_mdt:'..event, false, data))
    end)
end

serverNuiCallback('getCriminalProfiles')
serverNuiCallback('createReport')
serverNuiCallback('getReports')
serverNuiCallback('getReport')
serverNuiCallback('deleteReport')
serverNuiCallback('setReportTitle')
serverNuiCallback('addCriminal')
serverNuiCallback('removeCriminal')
serverNuiCallback('saveCriminal')
serverNuiCallback('addOfficer')
serverNuiCallback('removeOfficer')
serverNuiCallback('addEvidence')
serverNuiCallback('removeEvidence')
serverNuiCallback('getProfiles')
