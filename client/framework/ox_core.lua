local ox = {}
local officer = {}

ox.loadedEvent = 'ox:playerLoaded'
ox.logoutEvent = 'ox:playerLogout'
ox.setGroupEvent = 'ox:setGroup'

function ox.getDepartments()
    --todo: support multiple police jobs
    local group = GlobalState['group.police']

    return {
        police = {
            label = group.label:gsub('[%U]', ''),
            ranks = group.grades
        }
    }
end

---@param officer? Officer
function ox.getGroupTitle(officer)
    if not ox.getGroupGrade() and not officer then return end

    local group = GlobalState['group.police'] --[[@as OxGroupProperties]]

    return ('%s %s'):format(group.label:gsub('[%U]', ''), group.grades[officer and officer.grade or player.groups.police])
end

function ox.getGroupGrade()
    return player.groups.police
end

function ox.getOfficerData()
    if player then
        officer.stateId = player.stateId
        officer.firstName = player.firstName
        officer.lastName = player.lastName
        officer.title = ox.getGroupTitle()
        officer.grade = ox.getGroupGrade()
    end

    return officer
end

return ox
