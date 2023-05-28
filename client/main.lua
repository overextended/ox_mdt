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

---@param search string
---@param cb function
RegisterNUICallback('getCriminalProfiles', function(search, cb)
    local response = lib.callback.await('ox_mdt:getCriminalProfiles', false, search) --[[@as CriminalProfile[]?]]
    cb(response or {})
end)

---@param id number Report ID
RegisterNUICallback('getReport', function(id, cb)
    cb({
        id = 1,
        officersInvolved = {},
        evidence = {},
        title = 'Some report title',
        description = '<p></p>',
        criminals = {},
      })
end)

---@param title string Report Title
RegisterNUICallback('createReport', function(title, cb)
    local reportId = 1
    cb(reportId)
end)

---@param search string
RegisterNUICallback('getReports', function(search, cb)
    cb({
        {
            id = 1,
            title = 'Report title',
            author = 'Michael Jordan',
            date = '01/01/1970',
        }
    })
end)

---@param id number
RegisterNUICallback('deleteReport', function(id, cb)
    cb(1)
end)

-- data: {id: number; title: string}
RegisterNUICallback('setReportTitle', function(data, cb)
    cb(1)
end)

-- data: {id: number (Reprot ID); criminalId: string/number?????}
RegisterNUICallback('addCriminal', function(data, cb)
    cb(1)
end)

-- data: {id: number (Report ID); index: number;}
RegisterNUICallback('removeCriminal', function(data, cb)
    cb(1)
end)

-- data: {id: number (Report ID); criminal: Criminal}
RegisterNUICallback('saveCriminal', function(data, cb)
    cb(1)
end)

-- data: {id: number (Report ID); callSign: number}
RegisterNUICallback('addOfficer', function(data, cb)
    cb(1)
end)

-- data: {id: number (Report ID); index: number}
RegisterNUICallback('removeOfficer', function(data, cb)
    cb(1)
end)