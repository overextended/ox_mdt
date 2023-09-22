local QBCore = exports['qb-core']:GetCoreObject()

local officers = require 'server.officers'
local units = require 'server.units'
local registerCallback = require 'server.utils.registerCallback'
local config = require 'config'
local dbSearch = require 'server.utils.dbSearch'

CreateThread(function()
    local dbUserIndexes = MySQL.rawExecute.await('SHOW INDEX FROM `players`') or {}

    for i = 1, #dbUserIndexes do
        local index = dbUserIndexes[i]

        if index.Key_name == 'name_search' then return end
    end

    MySQL.update('ALTER TABLE players ADD FULLTEXT INDEX name_search (citizenid, firstname, lastname)')
end)

local function getPlayer(playerId)
    if not playerId then return end
    return QBCore.Functions.GetPlayer(playerId).PlayerData
end

local function setOfflineGroup(group,grade)
    local jobData = {}
    jobData.name = group
    jobData.label = QBCore.Shared.Jobs[group].label
    jobData.onduty = QBCore.Shared.Jobs[group].defaultDuty
    jobData.type = QBCore.Shared.Jobs[group].type or 'none'
    if QBCore.Shared.Jobs[job].grades[group] then
        local jobgrade = QBCore.Shared.Jobs[group].grades[grade]
        jobData.grade = {}
        jobData.grade.name = jobgrade.name
        jobData.grade.level = tonumber(grade)
        jobData.payment = jobgrade.payment or 30
        jobData.isboss = jobgrade.isboss or false
    else
        jobData.grade = {}
        jobData.grade.name = 'No Grades'
        jobData.grade.level = 0
        jobData.payment = 30
    end

    return jobData
end

local function hasGroup(player, groups)
    if type(groups) == "table" then
        for i = 1, #groups do
            if groups[i] == player.job.name then
                return player.job.name, player.job.grade.level
            end
        end
    else
        if groups == player.job.name then
            return job, grade
        end
    end

end

local function addOfficer(playerId)
    local player = getPlayer(playerId)

    if not player then return end

    local group, grade = hasGroup(player, config.policeGroups)

    if group and grade then
        officers.add(playerId, player.charinfo.firstname, player.charinfo.lastname, player.citizenid, group, grade)
    end
end

CreateThread(function()
    for _, playerId in pairs(GetPlayers()) do
        addOfficer(tonumber(playerId))
    end
end)

RegisterNetEvent('QBCore:Server:PlayerLoaded', addOfficer)

RegisterNetEvent('QBCore:Server:OnJobUpdate', function(playerId, job)
    local officer = officers.get(playerId)

    if officer then
        if officer.group == job.name then
            officer.grade = job.grade
        else
            if not hasGroup(getPlayer(playerId), config.policeGroups) then
                officers.remove(playerId)
            end
        end
        return
    end

    addOfficer(playerId)
end)

RegisterNetEvent('QBCore:Server:OnPlayerUnload', function(playerId)
    local officer = officers.get(playerId)

    if officer then
        local state = Player(playerId).state
        units.removePlayerFromUnit(officer, state)
        officers.remove(playerId)
    end
end)

local qb = {}

---@param playerId number
---@param permission number | table<string, number>
---@return boolean?
function qb.isAuthorised(playerId, permission)
    print(playerId, permission)
    if type(permission) == 'table' then
        local _, grade = hasGroup(getPlayer(playerId), permission)
        print(grade, grade >= permission, permission)
        return grade and grade >= permission
    end

    local _, grade = hasGroup(getPlayer(playerId), config.policeGroups)

    print("hello")

    return grade and grade >= permission
end

---@return { label: string, plate: string }[]
function qb.getVehicles(parameters)
    local vehicles = MySQL.rawExecute.await('SELECT `plate`, `vehicle` FROM `player_vehicles` WHERE `citizenid` = ?', parameters) or
        {}

    for _, v in pairs(vehicles) do
        v.label = QBCore.Shared.Vehicles[v.vehicle]?.name or v.vehicle
        v.model = nil
    end

    return vehicles
end

---@return table<string, { label: string } | string>[]
function qb.getLicenses(parameters)
    local player = QBCore.Functions.GetPlayerByCitizenId(parameters[1]).PlayerData
    if not player then
        player = QBCore.Functions.GetOfflinePlayer(parameters[1]).PlayerData
    end
    local playerlicenses = player.metadata.licences
    local licenses = {}
    for k,v in pairs(playerlicenses) do
        if v then
            licenses[#licenses+ 1] = {label = k}
        end
    end
    return licenses
end

local selectCharacters = [[
    SELECT
        JSON_VALUE(`charinfo`, "$.firstname") AS firstName,
        JSON_VALUE(`charinfo`, "$.lastname") AS lastName,
        DATE_FORMAT(JSON_VALUE(`charinfo`, "$.birthdate"), "%Y-%m-%d") as dob,
        citizenid as stateId
    FROM
        players
]]

local selectCharactersFilter = selectCharacters .. " WHERE MATCH (`citizenid`, `firstname`, `lastname`) AGAINST (? IN BOOLEAN MODE)"

---@param parameters string[]
---@param filter? boolean
---@return PartialProfileData[]?
function qb.getCharacters(parameters, filter)
    local query = filter and selectCharactersFilter or selectCharacters
    return MySQL.rawExecute.await(query, parameters)
end

local selectOfficers = [[
    SELECT
        ox_mdt_profiles.id,
        JSON_VALUE(players.charinfo, "$.firstname") AS firstName,
        JSON_VALUE(`charinfo`, "$.lastname") AS lastName,
        citizenid AS stateId,
        JSON_VALUE(`job`, "$.name") AS `group`,
        JSON_VALUE(`job`, '$.grade.level') AS `grade`,
        ox_mdt_profiles.image,
        ox_mdt_profiles.callSign
    FROM
       `players` AS players
    LEFT JOIN
        ox_mdt_profiles
    ON
        players.citizenid = ox_mdt_profiles.stateId
    WHERE
        JSON_VALUE(`job`, "$.name") = "police"
]]

local selectOfficersFilter = selectOfficers .. ' AND MATCH (`citizenid`, `firstName`, `lastName`) AGAINST (? IN BOOLEAN MODE)'
local selectOfficersPaginate = selectOfficers .. 'LIMIT 9 OFFSET ?'
local selectOfficersFilterPaginate = selectOfficersFilter .. ' LIMIT 9 OFFSET ?'
local selectOfficersCount = selectOfficers:gsub('SELECT.-FROM', 'SELECT COUNT(*) FROM')

---@param parameters? string[]
---@param filter? boolean
---@return Officer[]?
function qb.getOfficers(parameters, filter)
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
        local response = MySQL.rawExecute.await(filter and selectOfficersFilterPaginate or selectOfficersPaginate, parameters)
        return {
            totalRecords = #response,
            officers = response,
        }
    end, data.search, data.page - 1)
end)

local selectWarrants = [[
    SELECT
        warrants.reportId,
        players.citizenid AS stateId,
        JSON_VALUE(players.charinfo, "$.firstname") AS firstName,
        JSON_VALUE(`charinfo`, "$.lastname") AS lastName,
        DATE_FORMAT(warrants.expiresAt, "%Y-%m-%d %T") AS expiresAt
    FROM
        `ox_mdt_warrants` warrants
    LEFT JOIN
        `players`
    ON
        warrants.stateid = players.citizenid
]]

local selectWarrantsFilter = selectWarrants .. ' WHERE MATCH (characters.citizenid, `firstName`, `lastName`) AGAINST (? IN BOOLEAN MODE)'


---@param parameters table
---@param filter? boolean
function qb.getWarrants(parameters, filter)
    local query = filter and selectWarrantsFilter or selectWarrants
    return MySQL.rawExecute.await(query, parameters)
end

local selectProfiles = [[
    SELECT
        citizenid AS stateId,
        JSON_VALUE(`charinfo`, "$.firstname") AS firstName,
        JSON_VALUE(`charinfo`, "$.lastname") AS lastName,
        DATE_FORMAT(JSON_VALUE(`charinfo`, "$.birthdate"), "%Y-%m-%d") as dob,
        profile.image
    FROM
        `players` AS players
    LEFT JOIN
        ox_mdt_profiles profile
    ON
        profile.stateid = players.citizenid
    LIMIT 10 OFFSET ?
]]

local selectProfilesFilter = selectProfiles:gsub('LIMIT', 'WHERE MATCH (`citizenid`, JSON_VALUE(`charinfo`, "$.firstname") AS firstName, JSON_VALUE(`charinfo`, "$.lastname") AS lastName) AGAINST (? IN BOOLEAN MODE) LIMIT')

---@param parameters table
---@param filter? boolean
function qb.getProfiles(parameters, filter)
    local query = filter and selectProfilesFilter or selectProfiles
    return MySQL.rawExecute.await(query, parameters)
end

---@param parameters { [1]: number }
---@return FetchOfficers?
function qb.getOfficersInvolved(parameters)
    return MySQL.rawExecute.await([[
        SELECT
            JSON_VALUE(players.charinfo, "$.firstname") AS firstName,
            JSON_VALUE(players.charinfo, "$.lastname") AS lastName,
            players.citizenid AS stateId,
            profile.callSign
        FROM
            ox_mdt_reports_officers officer
        LEFT JOIN
            players
        ON
            players.citizenid = officer.stateId
        LEFT JOIN
            ox_mdt_profiles profile
        ON 
            players.citizenid = profile.stateId
        WHERE
            reportid = ?
    ]], parameters)
end

---@param parameters { [1]: number }
---@return FetchCriminals?
function qb.getCriminalsInvolved(parameters)
    return MySQL.rawExecute.await([[
        SELECT DISTINCT
            criminal.stateId,
            JSON_VALUE(players.charinfo, "$.firstname") AS firstName,
            JSON_VALUE(players.charinfo, "$.lastname") AS lastName,
            criminal.reduction,
            DATE_FORMAT(criminal.warrantExpiry, "%Y-%m-%d") AS warrantExpiry,
            criminal.processed,
            criminal.pleadedGuilty
        FROM
            ox_mdt_reports_criminals criminal
        LEFT JOIN
            players
        ON
            players.citizenid = criminal.stateId
        WHERE
            reportid = ?
    ]], parameters)
end

---@param parameters { [1]: number }
---@return FetchCharges?
function qb.getCriminalCharges(parameters)
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
function qb.getCharacterProfile(parameters)
    ---@type Profile
    local profile = MySQL.rawExecute.await([[
        SELECT
            JSON_VALUE(a.charinfo, "$.firstname") AS firstName,
            JSON_VALUE(a.charinfo, "$.lastname") AS lastName,
            a.citizenid AS stateId,
            a.citizenid as charid,
            DATE_FORMAT(JSON_VALUE(a.charinfo, "$.birthdate"), "%Y-%m-%d") AS dob,
            JSON_VALUE(a.charinfo, "$.phone") AS phoneNumber,
            b.image,
            b.notes
        FROM
            `players` a
        LEFT JOIN
            `ox_mdt_profiles` b
        ON
            b.stateid = a.citizenid
        WHERE
            a.citizenid = ?
    ]], parameters)?[1]

    return profile
end

---@param parameters { [1]: number }
---@return Announcement[]?
function qb.getAnnouncements(parameters)
    return MySQL.rawExecute.await([[
        SELECT
            a.id,
            a.contents,
            a.creator AS stateId,
            JSON_VALUE(b.charinfo, "$.firstname") AS firstName,
            JSON_VALUE(b.charinfo, "$.lastname") AS lastName,
            c.image,
            c.callSign,
            DATE_FORMAT(a.createdAt, "%Y-%m-%d %T") AS createdAt
        FROM
            `ox_mdt_announcements` a
        LEFT JOIN
            `players` b
        ON
            b.citizenid = a.creator
        LEFT JOIN
            `ox_mdt_profiles` c
        ON
            c.stateId = a.creator
        ORDER BY `id` DESC LIMIT 5 OFFSET ?
    ]], parameters)
end

---@param source number
---@param data {stateId: string, group: string, grade: number}
registerCallback('ox_mdt:setOfficerRank', function(source, data)
    local player = QBCore.Functions.GetPlayerByCitizenId(data.stateId)

    if player then
        local hasJob = false
        for i = 1, #config.policeGroups do
            local group = config.policeGroups[i]
            -- if player has selected police group update it, otherwise remove all the other police groups
            if hasGroup(player.PlayerData, group) and group == group then
                hasJob = true
                break
            end
        end

        if hasJob then
            player.Functions.SetJob(group, data.grade)
        else
            player.Functions.SetJob("unemployed", 0)
        end
    else
        layer = QBCore.Player.GetOfflinePlayer(data.stateId)
        local hasJob = false
        for i = 1, #config.policeGroups do
            local group = config.policeGroups[i]
            -- if player has selected police group update it, otherwise remove all the other police groups
            if hasGroup(player.PlayerData, group) and group == group then
                hasJob = true
                break
            end
        end
        if hasJob then
            setOfflineGroup(data.group,data.grade)
        else
            setOfflineGroup("unemployed", 0)
        end
    end


    -- todo: delete other police groups from db?

    return true
end, 'set_officer_rank')

---@param source number
---@param stateId number
registerCallback('ox_mdt:fireOfficer', function(source, stateId)
    
    local player = QBCore.Functions.GetPlayerByCitizenId(data.stateId)

    if player then
        player.Functions.SetJob("unemployed", 0)
    else
        player = QBCore.Player.GetOfflinePlayer(data.stateId)
        setOfflineGroup("unemployed", 0)
    end

    return true
end, 'fire_officer')

---@param source number
---@param stateId string
registerCallback('ox_mdt:hireOfficer', function(source, stateId)
    local player = QBCore.Functions.GetPlayerByCitizenId(data.stateId)

    if player then
        player.setGroup('police', 1)
        return true
    else
        player = QBCore.Player.GetOfflinePlayer(data.stateId)
        if hasGroup(player.PlayerData,config.policeGroups) then return false end

        setOfflineGroup("unemployed", 0)
    end
end, 'hire_officer')

return qb
