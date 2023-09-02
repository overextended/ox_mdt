local QBCore = exports['qbx-core']:GetCoreObject()
local qb = {}

qb.loadedEvent = 'QBCore:Client:OnPlayerLoaded'
qb.logoutEvent = 'QBCore:Client:OnPlayerUnload'
qb.setGroupEvent = 'QBCore:Player:SetPlayerData'

function qb.getGroupTitle()
    local groupTitle = QBCore.Functions.GetPlayerData().job.grade.name
    return groupTitle
end

function qb.getGroupGrade()
    return QBCore.Functions.GetPlayerData().job.grade.level
end

function qb.getOfficerData()
    local player = QBCore.Functions.GetPlayerData()

    if (not player) then
        return {}
    end

    local officer = {}

    officer.stateId = player.citizenid
    officer.firstName = player.charinfo.firstname
    officer.lastName = player.charinfo.lastname
    officer.title = qb.getGroupTitle()
    officer.grade = qb.getGroupGrade()

    return officer
end

return qb
