local QBCore = exports['qb-core']:GetCoreObject()

local config = require "config"
local qb = {}
local localOfficer = {}

qb.loadedEvent = 'QBCore:Client:OnPlayerLoaded'
qb.logoutEvent = 'QBCore:Client:OnPlayerUnloaded'
qb.setGroupEvent = 'QBCore:Client:OnJobUpdate'




local function getGroupState(group)
    return QBCore.Shared.Jobs[group] --[[@as OxGroupProperties]]
end

---@param name string
local function getGroupLabel(name)
    return getGroupState(name)?.label:gsub('[%U]', '')
end

---@param name string
local function getGroupGrades(name, grade)
    return getGroupState(name)?.grades
end

---@param group string
---@param grade number
---@return string
local function getGradeLabel(group, grade)
    print(group,grade)
    return ('%s %s'):format(getGroupLabel(group), getGroupGrades(group)?[tostring(grade)].name)
end

function qb.getGroupInfo()
    local job = QBCore.Functions.GetPlayerData().job

    if not job or not job.grade then return end


    return job.name, job.grade.level, getGradeLabel(job.name, job.grade.level)
end

---@param officer Officer
function qb.getGroupTitle(officer)
    return getGradeLabel(officer.group, officer.grade)
end

function qb.getOfficerData()
    local player = QBCore.Functions.GetPlayerData()

    local group, grade, title = qb.getGroupInfo()
    localOfficer.stateId = player.citizenid
    localOfficer.firstName = player.charinfo.firstname
    localOfficer.lastName = player.charinfo.lastname
    localOfficer.group = group
    localOfficer.title = title
    localOfficer.grade = grade

    return localOfficer
end

qb.getGroupLabel = getGroupLabel
qb.getGroupGrades = getGroupGrades

return qb
