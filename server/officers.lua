---@type table<number, Officer>
local activeOfficers = {}

local function addOfficer(playerId, firstName, lastName, stateId, callSign)
    activeOfficers[playerId] = {
        firstName = firstName,
        lastName = lastName,
        stateId = stateId,
        callSign = callSign,
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
