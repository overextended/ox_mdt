local config = require "config"
local ox = {}
local localOfficer = {}

ox.loadedEvent = 'ox:playerLoaded'
ox.logoutEvent = 'ox:playerLogout'
ox.setGroupEvent = 'ox:setGroup'

local group, grade, label

local function getGroupState(name)
    return GlobalState['group.' .. name] --[[@as OxGroup]]
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
local function getGradeLabel(group, grade)
    label = ('%s %s'):format(getGroupLabel(group), getGroupGrades(group)?[grade])
end

local player = Ox.GetPlayer()

function ox.getGroupInfo()
    group = player.get('activeGroup')

    if not group or not lib.array.includes(config.policeGroups, group) then return end

    grade = player.getGroup(group)
    getGradeLabel(group, grade or 1)

    return group, grade, label
end

---@param officer Officer
function ox.getGroupTitle(officer)
    return getGradeLabel(officer.group, officer.grade)
end

function ox.getOfficerData()
    if player and player.charId then
        ox.getGroupInfo()

        localOfficer.stateId = player.get("stateId")
        localOfficer.firstName = player.get("firstName")
        localOfficer.lastName = player.get("lastName")
        localOfficer.group = group
        localOfficer.title = label
        localOfficer.grade = grade
    end

    return localOfficer
end

function ox.getPermissions()
    local groupPermissions = GlobalState[('group.%s:permissions'):format(group)]
    local permissions = {}

    for k, v in pairs(groupPermissions) do
        k = tonumber(k)

        if k < grade then
            for permission, access in pairs(v) do
                permission = permission:match('^mdt%.(.*)')

                if permission then permissions[permission] = access end
            end
        end
    end

    return permissions
end

AddEventHandler(ox.loadedEvent, function()
    player = Ox.GetPlayer()
end)

ox.getGroupLabel = getGroupLabel
ox.getGroupGrades = getGroupGrades

return ox
