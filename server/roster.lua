local utils = require 'server.utils'
local framework = require 'server.framework.ox_core'
local db = require 'server.db'

---@param source number
utils.registerCallback('ox_mdt:getInitialRosterPage', function(source)
    local officers = framework.getOfficers()
    local cbOfficers = {}

    for i = 1, 9 do
        local officer = officers[i]
        cbOfficers[#cbOfficers + 1] = officer
    end

    return {
        totalRecords = #officers,
        officers = cbOfficers
    }
end)

---@param source number
---@param page number
utils.registerCallback('ox_mdt:getRosterPage', function(source, page)
    local officers = framework.getOfficers()
    local cbOfficers = {}

    local START = page * 9
    local END =  START + 9

    for i = START, END do
        local officer = allOfficers[i]
        cbOfficers[#cbOfficers + 1] = officer
    end

    return cbOfficers
end)


---@param source number
---@param data {stateId: string, callSign: string}
utils.registerCallback('ox_mdt:setOfficerCallSign', function(source, data)
    --todo permission checks
    if db.selectOfficerCallSign(data.callSign) then return false end

    db.updateOfficerCallSign(data.stateId, data.callSign)

    return true
end)

---@param source number
---@param data {stateId: string, group: string, grade: number}
utils.registerCallback('ox_mdt:setOfficerRank', function(source, data)
    -- todo: move into framework
    local player = Ox.GetPlayerByFilter({stateId = data.stateId})

    -- todo: permission and security checks

    local policeGroups = {'police'}

    if player then
        for i = 1, #policeGroups do
            local group = policeGroups[i]
            -- if player has selected police group update it, otherwise remove all the other police groups
            if player.hasGroup(group) and group == data.group then
                player.setGroup(data.group, data.grade + 1)
            else
                player.setGroup(group, -1)
            end
        end

        return true
    end

    local charId = MySQL.prepare.await('SELECT `charid` FROM `characters` WHERE `stateId` = ?', { data.stateId })

    MySQL.prepare.await('UPDATE `character_groups` SET `grade` = ? WHERE `charId` = ? AND `name` = ? ', { data.grade + 1, charId, data.group })

    -- todo: delete other police groups from db?

    return true
end)

---@param source number
---@param stateId number
utils.registerCallback('ox_mdt:fireOfficer', function(source, stateId)
    -- todo: permission and security checks

    -- todo: move into framework
    local player = Ox.GetPlayerByFilter({stateId = stateId})

    local policeGroups = {'police'}

    if player then
        for i = 1, #policeGroups do
            local group = policeGroups[i]
            player.setGroup(group, -1)
        end

        return true
    end

    local charId = MySQL.prepare.await('SELECT `charid` FROM `characters` WHERE `stateId` = ?', { stateId })

    -- todo: delete other police groups
    MySQL.prepare.await('DELETE FROM `character_groups` WHERE `charId` = ? AND `name` = ? ', { charId, 'police' })

    return true
end)

---@param source number
---@param stateId string
utils.registerCallback('ox_mdt:hireOfficer', function(source, stateId)
    -- todo: permission and security checks

    -- todo: move into framework
    local player = Ox.GetPlayerByFilter({stateId = stateId})

    local policeGroups = {'police'}

    if player then
        if player.hasGroup(policeGroups) then return false end

        player.setGroup('police', 1)
        return true
    end

    local charId = MySQL.prepare.await('SELECT `charid` FROM `characters` WHERE `stateId` = ?', { stateId })

    local success = pcall(MySQL.prepare.await, 'INSERT INTO `character_groups` (`charId`, `name`, `grade`) VALUES (?, ?, ?)', { charId, 'police', 1 })

    return success
end)