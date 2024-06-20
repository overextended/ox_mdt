local config = require "config"
local ox = {}
local localOfficer = {}

ox.loadedEvent = 'ox:playerLoaded'
ox.logoutEvent = 'ox:playerLogout'
ox.setGroupEvent = 'ox:setGroup'

local function getGroupState(groupName)
    return GlobalState['group.' .. groupName] --[[@as OxGroupProperties]]
end

---@param name string
local function getGroupLabel(name)
    return getGroupState(name)?.label
end

---@param name string
local function getGroupGrades(name)
    return getGroupState(name)?.grades
end

---@param group string
---@param grade number
---@return string
local function getGradeLabel(group, grade)
    return ('%s %s'):format(getGroupLabel(group), getGroupGrades(group)?[grade])
end

local player = Ox.GetPlayer()

function ox.getGroupInfo()
    local groupName, grade = player.getGroup(config.policeGroups)

    if not groupName or not grade then return end

    return groupName, grade, getGradeLabel(groupName, grade)
end

---@param officer Officer
function ox.getGroupTitle(officer)
    return getGradeLabel(officer.group, officer.grade)
end

function ox.getOfficerData()
    if player and player.charId then
        local group, grade, title = ox.getGroupInfo()
        localOfficer.stateId = player.get("stateId")
        localOfficer.firstName = player.get("firstName")
        localOfficer.lastName = player.get("lastName")
        localOfficer.group = group
        localOfficer.title = title
        localOfficer.grade = grade
    end

    return localOfficer
end

AddEventHandler(ox.loadedEvent, function()
    player = Ox.GetPlayer()
end)

ox.getGroupLabel = getGroupLabel
ox.getGroupGrades = getGroupGrades

return ox
