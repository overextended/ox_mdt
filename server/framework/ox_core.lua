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
