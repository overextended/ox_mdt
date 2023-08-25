local officers = require 'server.officers'
local policeGroups = { 'police' }

local function addOfficer(playerId)
    if officers.get(playerId) then return end

    local player = Ox.GetPlayer(playerId)

    if player and player.hasGroup(policeGroups) then
        officers.add(playerId, player.firstName, player.lastName, player.stateId, 132)
    end
end

for _, playerId in pairs(GetPlayers()) do
    addOfficer(tonumber(playerId))
end

AddEventHandler('ox:playerLoaded', addOfficer)
AddEventHandler('ox:setGroup', addOfficer)
AddEventHandler('ox:playerLogout', officers.remove)

local ox = {}

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
        'SELECT ox_licenses.label, `issued` FROM character_licenses LEFT JOIN ox_licenses ON ox_licenses.name = character_licenses.name WHERE `charid` = ?',
        parameters) or {}

    print('FRAMEWORK', json.encode(parameters))

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

local searchCharacters = selectCharacters .. ' WHERE `firstName` = ? AND `lastName` LIKE ?'
local selectCharacterPartial = selectCharacters .. ' WHERE `lastName` LIKE ? OR `stateId` LIKE ?'

---@param parameters string[]
---@return ProfileCard[]?
function ox.getCharacters(parameters, match)
    return MySQL.rawExecute.await(match and searchCharacters or selectCharacterPartial, parameters)
end

local selectOfficers = [[
    SELECT
        firstName,
        lastName,
        characters.stateId,
        character_groups.grade AS grade,
        ox_mdt_profiles.callSign
    FROM
        character_groups
    LEFT JOIN
        characters
    ON
        character_groups.charid = characters.charid
    LEFT JOIN
        ox_mdt_profiles
    ON
        characters.stateId = ox_mdt_profiles.stateId
    WHERE
        character_groups.name = "police"
]]

local selectOfficersByName = selectOfficers .. ' AND (`firstName` = ? AND `lastName` LIKE ?)'
local selectOfficersPartial = selectOfficers .. ' AND (`lastName` LIKE ? OR ox_mdt_profiles.callsign LIKE ?)'

---@param parameters? string[]
---@param match? boolean
---@return Officer[]?
function ox.getOfficers(parameters, match)
    if not parameters then
        return MySQL.rawExecute.await(selectOfficers)
    end

    return MySQL.rawExecute.await(match and selectOfficersByName or selectOfficersPartial, parameters)
end

local selectWarrants = [[
    SELECT
        a.reportId,
        a.stateId,
        b.firstName,
        b.lastName,
        DATE_FORMAT(a.expiresAt, "%Y-%m-%d %T") AS expiresAt
    FROM
        `ox_mdt_warrants` a
    LEFT JOIN
        `characters` b
    ON
        a.stateid = b.stateid
]]

local selectWarrantsByName = selectWarrants .. ' WHERE `firstName` = ? AND `lastName` LIKE ?'
local selectWarrantsPartial = selectWarrants .. ' WHERE `lastName` LIKE ? OR a.stateId LIKE ?'

function ox.getWarrants(parameters, match)
    if not parameters then
        return MySQL.rawExecute.await(selectWarrants)
    end

    return MySQL.rawExecute.await(match and selectWarrantsByName or selectWarrantsPartial, parameters)
end

function ox.getProfiles(parameters)
    return MySQL.rawExecute.await([[
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
    ]], parameters)
end

---@param parameters { [1]: number }
---@return FetchOfficers?
function ox.getOfficersInvolved(parameters)
    return MySQL.rawExecute.await([[
        SELECT
            characters.firstName,
            characters.lastName,
            characters.stateId
        FROM
            ox_mdt_reports_officers officer
        LEFT JOIN
            characters
        ON
            characters.stateId = officer.stateId
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
            a.phone_number AS phoneNumber,
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
            DATE_FORMAT(a.createdAt, "%Y-%m-%d %T") AS createdAt
        FROM
            `ox_mdt_announcements` a
        LEFT JOIN
            `characters` b
        ON
            b.stateId = a.creator
        ORDER BY `createdAt` DESC LIMIT 5 OFFSET ?
    ]], parameters)
end

return ox
