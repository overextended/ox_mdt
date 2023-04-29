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