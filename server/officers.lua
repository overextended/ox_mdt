---@type table<number, Officer>
local activeOfficers = {}
local officersArray = {}

SetInterval(function()
    local n = 0

    for _, officer in pairs(activeOfficers) do
        local coords = GetEntityCoords(officer.ped)
        officer.position[1] = coords.y
        officer.position[2] = coords.x
        officer.position[3] = coords.z
        n += 1
        officersArray[n] = officer
    end

    for playerId in pairs(activeOfficers) do
        TriggerClientEvent('ox_mdt:updateOfficerPositions', playerId, officersArray)
    end

    table.wipe(officersArray)
end, math.max(500, GetConvarInt('mdt:positionRefreshInterval', 5000)))

local function addOfficer(playerId, firstName, lastName, stateId, callSign)
    activeOfficers[playerId] = {
        firstName = firstName,
        lastName = lastName,
        stateId = stateId,
        callSign = callSign,
        playerId = playerId,
        ped = GetPlayerPed(playerId),
        position = {},
    }
end

local function removeOfficer(playerId)
    activeOfficers[playerId] = nil
end

local policeGroups = { 'police' }

local function getOfficer(playerId)
    if not activeOfficers[playerId] then
        local player = Ox.GetPlayer(source)

        if player then
            if player.hasGroup(policeGroups) then
                addOfficer(playerId, player.firstname, player.lastname, player.stateid, 132)
            end
        end
    end

    return activeOfficers[playerId]
end

return {
    add = addOfficer,
    remove = removeOfficer,
    get = getOfficer,
}
