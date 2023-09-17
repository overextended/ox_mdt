local config = require "config"
local ox = {}
local localOfficer = {}

ox.loadedEvent = 'ox:playerLoaded'
ox.logoutEvent = 'ox:playerLogout'
ox.setGroupEvent = 'ox:setGroup'

local function getGroupState(groupName)
    return GlobalState['group.' .. groupName] --[[@as OxGroupProperties]]
end

---@param group OxGroupProperties
local function getGroupLabel(group)
    return group.label:gsub('[%U]', '')
end

---@param group OxGroupProperties
---@param grade number
---@return string
local function getGradeLabel(group, grade)
    return ('%s %s'):format(getGroupLabel(group), group.grades[grade])
end

function ox.getGroupInfo()
    local groupName, grade = player.hasGroup(config.policeGroups)

    if not groupName or not grade then return end

    return groupName, grade, getGradeLabel(getGroupState(groupName), grade)
end

function ox.getDepartments()
    local groups = {}

    for i = 1, #config.policeGroups do
        local name = config.policeGroups[i]
        local group = getGroupState(name)

        groups[name] = {
            label = getGroupLabel(group),
            ranks = group.grades
        }
    end

    return groups
end

---@param groupName string
---@param officer Officer
function ox.getGroupTitle(groupName, officer)
    return getGradeLabel(getGroupState(groupName), officer.grade)
end

function ox.getOfficerData()
    if player then
        local group, grade, title = ox.getGroupInfo()
        localOfficer.stateId = player.stateId
        localOfficer.firstName = player.firstName
        localOfficer.lastName = player.lastName
        localOfficer.group = group
        localOfficer.title = title
        localOfficer.grade = grade
    end

    return localOfficer
end

return ox
