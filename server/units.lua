-- TODO: sync units to other clients on the disaptch page
-- Every unit function should call an event on all people on the dispatch
-- page and send the new units table to refresh the existing data
-- memo should hopefully only rerender the unit cards that have chaged

---@type Units
local units = {}
local unitsCreated = 0
local officers = require 'server.officers'
local utils = require 'server.utils'

---@param stateId string
---@param state StateBag
local function removePlayerFromUnit(stateId, state)
    local unitId = state.mdtUnitId

    if not unitId then return end

    local unit = units[unitId]

    for i = 1, #unit.members do
        local member = unit.members[i]

        if stateId == member.stateId then
            state.mdtUnitId = nil
            table.remove(unit.members, i)

            if #unit.members == 0 then
                units[unitId] = nil
                -- TODO: Remove unit from all calls it's attached to
            end

            return true
        end
    end
end

---@param playerId number
---@param unitId number
local function addPlayerToUnit(playerId, unitId)
    local officer = officers.get(playerId)
    local unit = units[unitId]
    local state = Player(playerId).state

    if not officer or not unit then return end

    if state.mdtUnitId then
        removePlayerFromUnit(officer.stateId, state)
    end

    unit.members[#unit.members + 1] = officer
    state.mdtUnitId = unitId

    return true
end

---@param source number
---@param unitType UnitType
utils.registerCallback('ox_mdt:createUnit', function(source, unitType)
    unitsCreated += 1
    local unitName = ('Unit %d'):format(unitsCreated)

    units[unitsCreated] = {
        id = unitsCreated,
        members = {},
        name = unitName,
        type = unitType
    }

    return addPlayerToUnit(source, unitsCreated) and {
        id = unitsCreated,
        name = unitName
    }
end)

---@param source number
---@param unitId number
utils.registerCallback('ox_mdt:joinUnit', function(source, unitId)
    return addPlayerToUnit(source, unitId)
end)

---@param source number
utils.registerCallback('ox_mdt:leaveUnit', function(source)
    local officer = officers.get(source)

    if officer then
        return removePlayerFromUnit(officer.stateId, Player(source).state)
    end
end)

utils.registerCallback('ox_mdt:getUnits', function()
    return units
end)

local function getUnit(unitId)
    return units[unitId]
end

return {
    getUnit = getUnit,
}
