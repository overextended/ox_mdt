-- TODO: sync units to other clients on the disaptch page
-- Every unit function should call an event on all people on the dispatch
-- page and send the new units table to refresh the existing data
-- memo should hopefully only rerender the unit cards that have chaged

---@type Units
local units = {}
local officers = require 'server.officers'
local utils = require 'server.utils'

---@param officer Officer
---@param state StateBag
local function removePlayerFromUnit(officer, state)
    local unitId = state.mdtUnitId

    if not unitId then return end

    local unit = units[unitId]

    if not unit then return end

    -- If unit owner leaves, remove everyone from the unit and delete it
    if unit.id == officer.callSign then
        for i = 1, #unit.members do
            local member = unit.members[i]
            member.unitId = nil
            Player(member.playerId).state.mdtUnitId = nil
        end

        units[unitId] = nil

        return
    end

    for i = 1, #unit.members do
        local member = unit.members[i]

        if officer.stateId == member.stateId then
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
---@param unitId string
local function addPlayerToUnit(playerId, unitId)
    local officer = officers.get(playerId)
    local unit = units[unitId]
    local state = Player(playerId).state

    if not officer or not unit then return end

    if state.mdtUnitId then
        removePlayerFromUnit(officer, state)
    end

    unit.members[#unit.members + 1] = officer
    officer.unitId = unitId
    state.mdtUnitId = unitId

    return true
end

---@param source number
---@param unitType UnitType
utils.registerCallback('ox_mdt:createUnit', function(source, unitType)
    local officer = officers.get(source)

    if not officer or not officer.callSign then return end

    ---@type string
    local unitId = officer.callSign
    local unitName = ('Unit %d'):format(unitId)


    units[unitId] = {
        id = unitId,
        members = {},
        name = unitName,
        type = unitType
    }

    print("Add to unit")
    return addPlayerToUnit(source, unitId) and {
        id = unitId,
        name = unitName
    }
end)

---@param source number
---@param unitId string
utils.registerCallback('ox_mdt:joinUnit', function(source, unitId)
    return addPlayerToUnit(source, unitId)
end)

---@param source number
utils.registerCallback('ox_mdt:leaveUnit', function(source)
    local officer = officers.get(source)

    if not officer then return end

    return removePlayerFromUnit(officer, Player(source).state)
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
