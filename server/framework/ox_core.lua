local officers = require 'server.officers'
local policeGroups = { 'police' }

local function addOfficer(playerId)
    if officers.get(playerId) then return end

    local player = Ox.GetPlayer(playerId)

    if player and player.hasGroup(policeGroups) then
        officers.add(playerId, player.firstname, player.lastname, player.stateid, 132)
    end
end

for _, playerId in pairs(GetPlayers()) do
    addOfficer(tonumber(playerId))
end

AddEventHandler('ox:playerLoaded', addOfficer)
AddEventHandler('ox:setGroup', addOfficer)
AddEventHandler('ox:playerLogout', officers.remove)

local ox = {}

function ox.getVehicles(parameters)
    local vehicles = MySQL.rawExecute.await('SELECT `plate`, `model` FROM `vehicles` WHERE `owner` = ?', parameters) or {}

    for _, v in pairs(vehicles) do
        v.label = Ox.GetVehicleData(v.model)?.name or v.model
        v.model = nil
    end

    return vehicles
end

function ox.getLicenses(parameters)
    local licenses = MySQL.rawExecute.await('SELECT ox_licenses.label, `issued` FROM character_licenses LEFT JOIN ox_licenses ON ox_licenses.name = character_licenses.name WHERE `charid` = ?', parameters) or {}

    for _, v in pairs(licenses) do
        v.points = 0
    end

    return licenses
end

return ox
