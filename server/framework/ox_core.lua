local officers = require 'server.officers'
local units = require 'server.units'
local registerCallback = require 'server.utils.registerCallback'
local config = require 'config'
local dbSearch = require 'server.utils.dbSearch'
local permissions = require 'server.permissions'

for i = 1, #config.policeGroups do
    local group = config.policeGroups[i]

    Ox.SetGroupPermission(group, 1, 'mdt.access', 'allow')

    for permission, grade in pairs(permissions) do
        grade = type(grade) == 'number' and grade or grade[group]

        if grade then
            Ox.SetGroupPermission(group, grade, ('mdt.%s'):format(permission), 'allow')
        end
    end
end

CreateThread(function()
    local dbUserIndexes = MySQL.rawExecute.await('SHOW INDEX FROM `characters`') or {}
    local dbPlateIndexes = MySQL.rawExecute.await('SHOW INDEX FROM `vehicles`') or {}
    local insertCharIndex = true

    for i = 1, #dbUserIndexes do
        local index = dbUserIndexes[i]

        if index.Key_name == 'stateId_name' then
            insertCharIndex = false
            break
        end
    end

    if insertCharIndex then
        MySQL.update('ALTER TABLE `characters` ADD FULLTEXT INDEX `stateId_name` (`stateId`, `firstName`, `lastName`)')
    end

    for i = 1, #dbPlateIndexes do
        local index = dbPlateIndexes[i]

        if index.Key_name == 'vehicle_plate' then
            return
        end
    end

    MySQL.update('ALTER TABLE `vehicles` ADD FULLTEXT INDEX `vehicle_plate` (`plate`)')
end)

local function addOfficer(playerId)
    local player = Ox.GetPlayer(playerId)
    local group = player and player.get('activeGroup')
    local grade = group and player.getGroup(group)

    if not grade or not lib.array.includes(config.policeGroups, group) then return end

    officers.add(playerId, player.get('firstName'), player.get('lastName'), player.stateId, group, grade)
end

CreateThread(function()
    for _, playerId in pairs(GetPlayers()) do
        addOfficer(tonumber(playerId))
    end
end)

AddEventHandler('ox:playerLoaded', addOfficer)

AddEventHandler('ox:setActiveGroup', function(playerId, name)
    local officer = officers.get(playerId)

    if officer then
        local grade = Ox.GetPlayer(playerId).getGroup(officer.group)

        if officer.group == name then
            if not grade then
                return officers.remove(playerId)
            end

            officer.grade = grade
        end

        return
    end

    addOfficer(playerId)
end)

AddEventHandler('ox:playerLogout', function(playerId)
    local officer = officers.get(playerId)

    if officer then
        local state = Player(playerId).state
        units.removePlayerFromUnit(officer, state)
        officers.remove(playerId)
    end
end)

local ox = {}

---@param playerId number
---@param permission string
---@return boolean?
function ox.isAuthorised(playerId, permission)
    if config.item and exports.ox_inventory:GetItemCount(playerId, config.item) == 0 then return false end

    local player = Ox.GetPlayer(playerId)
    local group = player and player.get('activeGroup')

    if not group then return end

    permission = ('group.%s.%s'):format(group, permission)

    return player.hasPermission(permission)
end

---@return { label: string, plate: string }[]
function ox.getVehicles(parameters)
    local vehicles = MySQL.rawExecute.await('SELECT `plate`, `model` FROM `vehicles` WHERE `owner` = ?', parameters) or
        {}

    for _, v in pairs(vehicles) do
        v.label = Ox.GetVehicleData(v.model)?.name or v.model
        v.model = nil
    end

    return vehicles
end

---@return table<string, { label: string } | string>[]
function ox.getLicenses(parameters)
    local licenses = MySQL.rawExecute.await(
        'SELECT ox_licenses.label, JSON_VALUE(character_licenses.data, "$.issued") AS `issued` FROM character_licenses LEFT JOIN ox_licenses ON ox_licenses.name = character_licenses.name WHERE `charid` = ?',
        parameters) or {}

    return licenses
end

local selectCharacters = [[
    SELECT
        firstName,
        lastName,
        DATE_FORMAT(`dateofbirth`, "%Y-%m-%d") as dob,
        stateId
    FROM
        characters
]]

local selectCharactersFilter = selectCharacters ..
    'WHERE MATCH (`stateId`, `firstName`, `lastName`) AGAINST (? IN BOOLEAN MODE)'

---@param parameters string[]
---@param filter? boolean
---@return PartialProfileData[]?
function ox.getCharacters(parameters, filter)
    local query = filter and selectCharactersFilter or selectCharacters
    return MySQL.rawExecute.await(query, parameters)
end

local selectOfficers = ([[
    SELECT
        ox_mdt_profiles.id,
        firstName,
        lastName,
        characters.stateId,
        character_groups.name AS `group`,
        character_groups.grade,
        ox_mdt_profiles.image,
        ox_mdt_profiles.callSign
    FROM
        character_groups
    LEFT JOIN
        characters
    ON
        character_groups.charId = characters.charId
    LEFT JOIN
        ox_mdt_profiles
    ON
        characters.stateId = ox_mdt_profiles.stateId
    WHERE
        character_groups.name IN ("%s")
]]):format(table.concat(config.policeGroups, '","'))

local selectOfficersFilter = selectOfficers ..
    ' AND MATCH (characters.stateId, `firstName`, `lastName`) AGAINST (? IN BOOLEAN MODE)'
local selectOfficersPaginate = selectOfficers .. 'LIMIT 9 OFFSET ?'
local selectOfficersFilterPaginate = selectOfficersFilter .. ' LIMIT 9 OFFSET ?'
local selectOfficersCount = selectOfficers:gsub('SELECT.-FROM', 'SELECT COUNT(*) FROM')

---@param parameters? string[]
---@param filter? boolean
---@return Officer[]?
function ox.getOfficers(parameters, filter)
    local query = filter and selectOfficersFilter or selectOfficers
    return MySQL.rawExecute.await(query, parameters)
end

---@param source number
---@param data {page: number, search: string}
registerCallback('ox_mdt:fetchRoster', function(source, data)
    if data.search == '' then
        return {
            totalRecords = MySQL.prepare.await(selectOfficersCount),
            officers = MySQL.rawExecute.await(selectOfficersPaginate, { data.page - 1 })
        }
    end

    return dbSearch(function(parameters, filter)
        local response = MySQL.rawExecute.await(filter and selectOfficersFilterPaginate or selectOfficersPaginate,
            parameters)

        return {
            totalRecords = #response,
            officers = response,
        }
    end, data.search, data.page - 1)
end)

local selectWarrants = [[
    SELECT
        warrants.reportId,
        characters.stateId,
        characters.firstName,
        characters.lastName,
        DATE_FORMAT(warrants.expiresAt, "%Y-%m-%d %T") AS expiresAt
    FROM
        `ox_mdt_warrants` warrants
    LEFT JOIN
        `characters`
    ON
        warrants.stateid = characters.stateid
]]

local selectWarrantsFilter = selectWarrants ..
    ' WHERE MATCH (characters.stateId, `firstName`, `lastName`) AGAINST (? IN BOOLEAN MODE)'

---@param parameters table
---@param filter? boolean
function ox.getWarrants(parameters, filter)
    local query = filter and selectWarrantsFilter or selectWarrants
    return MySQL.rawExecute.await(query, parameters)
end

local selectProfiles = [[
    SELECT
        characters.stateId,
        characters.firstName,
        characters.lastName,
        DATE_FORMAT(characters.dateofbirth, "%Y-%m-%d") AS dob,
        profile.image
    FROM
        characters
    LEFT JOIN
        ox_mdt_profiles profile
    ON
        profile.stateid = characters.stateid
    LIMIT 10 OFFSET ?
]]

local selectProfilesFilter = selectProfiles:gsub('LIMIT', [[
    LEFT JOIN
        vehicles
    ON
        vehicles.owner = characters.charId
    WHERE MATCH
        (characters.stateId, `firstName`, `lastName`)
    AGAINST
        (? IN BOOLEAN MODE)
    OR MATCH
        (vehicles.plate)
    AGAINST
        (? IN BOOLEAN MODE)
    GROUP BY
        characters.charId
    LIMIT
]])

---@param parameters table
---@param filter? boolean
function ox.getProfiles(parameters, filter)
    local query = filter and selectProfilesFilter or selectProfiles
    local params = filter and { parameters[1], parameters[1], parameters[2] } or parameters

    return MySQL.rawExecute.await(query, params)
end

---@param parameters { [1]: number }
---@return FetchOfficers?
function ox.getOfficersInvolved(parameters)
    return MySQL.rawExecute.await([[
        SELECT
            characters.firstName,
            characters.lastName,
            characters.stateId,
            profile.callSign
        FROM
            ox_mdt_reports_officers officer
        LEFT JOIN
            characters
        ON
            characters.stateId = officer.stateId
        LEFT JOIN
            ox_mdt_profiles profile
        ON
            characters.stateId = profile.stateId
        WHERE
            reportid = ?
    ]], parameters)
end

---@param parameters { [1]: number }
---@return FetchCriminals?
function ox.getCriminalsInvolved(parameters)
    return MySQL.rawExecute.await([[
        SELECT DISTINCT
            criminal.stateId,
            characters.firstName,
            characters.lastName,
            criminal.reduction,
            DATE_FORMAT(criminal.warrantExpiry, "%Y-%m-%d") AS warrantExpiry,
            criminal.processed,
            criminal.pleadedGuilty
        FROM
            ox_mdt_reports_criminals criminal
        LEFT JOIN
            characters
        ON
            characters.stateId = criminal.stateId
        WHERE
            reportid = ?
    ]], parameters)
end

---@param parameters { [1]: number }
---@return FetchCharges?
function ox.getCriminalCharges(parameters)
    return MySQL.rawExecute.await([[
        SELECT
            stateId,
            charge as label,
            time,
            fine,
            count
        FROM
            ox_mdt_reports_charges
        WHERE
            reportid = ?
        GROUP BY
            charge, stateId
    ]], parameters)
end

---@param parameters { [1]: string }
---@return Profile?
function ox.getCharacterProfile(parameters)
    ---@type Profile
    local profile = MySQL.rawExecute.await([[
        SELECT
            a.firstName,
            a.lastName,
            a.stateId,
            a.charid,
            DATE_FORMAT(a.dateofbirth, "%Y-%m-%d") AS dob,
            a.phoneNumber,
            b.image,
            b.notes
        FROM
            `characters` a
        LEFT JOIN
            `ox_mdt_profiles` b
        ON
            b.stateid = a.stateid
        WHERE
            a.stateId = ?
    ]], parameters)?[1]

    return profile
end

---@param parameters { [1]: number }
---@return Announcement[]?
function ox.getAnnouncements(parameters)
    return MySQL.rawExecute.await([[
        SELECT
            a.id,
            a.contents,
            a.creator AS stateId,
            b.firstName,
            b.lastName,
            c.image,
            c.callSign,
            DATE_FORMAT(a.createdAt, "%Y-%m-%d %T") AS createdAt
        FROM
            `ox_mdt_announcements` a
        LEFT JOIN
            `characters` b
        ON
            b.stateId = a.creator
        LEFT JOIN
            `ox_mdt_profiles` c
        ON
            c.stateId = a.creator
        ORDER BY `id` DESC LIMIT 5 OFFSET ?
    ]], parameters)
end

function ox.getBOLOs(parameters)
    return MySQL.rawExecute.await([[
        SELECT
            a.id,
            a.creator AS stateId,
            a.contents,
            b.callSign,
            b.image,
            c.firstName,
            c.lastName,
            JSON_ARRAYAGG(d.image) AS images,
            DATE_FORMAT(a.createdAt, "%Y-%m-%d %T") AS createdAt
        FROM
            `ox_mdt_bolos` a
        LEFT JOIN
            `ox_mdt_profiles` b
        ON
            b.stateId = a.creator
        LEFT JOIN
            `characters` c
        ON
            c.stateId = b.stateId
        LEFT JOIN
            `ox_mdt_bolos_images` d
        ON
            d.boloId = a.id
        GROUP BY `id` ORDER BY `id` DESC LIMIT 5 OFFSET ?
    ]], parameters)
end

---@param playerId number
---@param data {stateId: string, group: string, grade: number}
registerCallback('ox_mdt:setOfficerRank', function(playerId, data)
    local player = Ox.GetPlayer(playerId)
    local grade = player and player.getGroup(data.group)

    if not grade or grade <= data.grade then return false end

    local target = Ox.GetPlayerFromFilter({ stateId = data.stateId, groups = data.group })

    if target then
        if playerId == target.source or not target.getGroup(data.group) then return false end

        return target.setGroup(data.group, data.grade + 1)
    end

    MySQL.prepare.await(
        'UPDATE `character_groups` SET `grade` = ? WHERE `charId` = (SELECT `charId` FROM `characters` WHERE `stateId` = ?) AND `name` = ? ',
        { data.grade + 1, data.stateId, data.group })

    return true
end, 'set_officer_rank')

---@param source number
---@param stateId number
registerCallback('ox_mdt:fireOfficer', function(source, stateId)
    local player = Ox.GetPlayerFromFilter({ stateId = stateId })

    if player then
        for i = 1, #config.policeGroups do
            local group = config.policeGroups[i]
            player.setGroup(group, -1)
        end

        return true
    end

    local charId = MySQL.prepare.await('SELECT `charid` FROM `characters` WHERE `stateId` = ?', { stateId })

    MySQL.prepare.await('DELETE FROM `character_groups` WHERE `charId` = ? AND `name` IN (?) ',
        { charId, config.policeGroups })

    return true
end, 'fire_officer')

---@param source number
---@param stateId string
registerCallback('ox_mdt:hireOfficer', function(source, stateId)
    local player = Ox.GetPlayerFromFilter({ stateId = stateId })

    if player then
        if player.getGroup(config.policeGroups) then return false end

        player.setGroup('police', 1)
        return true
    end

    local charId = MySQL.prepare.await('SELECT `charid` FROM `characters` WHERE `stateId` = ?', { stateId })

    local success = pcall(MySQL.prepare.await,
        'INSERT INTO `character_groups` (`charId`, `name`, `grade`) VALUES (?, ?, ?)', { charId, 'police', 1 })

    return success
end, 'hire_officer')

return ox
