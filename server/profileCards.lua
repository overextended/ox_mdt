local registerCallback = require 'server.utils.registerCallback'
local config = require 'config'
local framework = require(('server.framework.%s'):format(config.framework))

---@class CustomProfileCard
---@field id string
---@field title string
---@field icon string
---@field getData fun(parameters: {search: string}): string[]

---@type CustomProfileCard[]
local customProfileCards = {}

---@param newCard CustomProfileCard
local function checkCardExists(newCard)
    for i = 1, #customProfileCards do
        local card = customProfileCards[i]

        if card.id == newCard.id then
            assert(false, ("Custom card with id `%s` already exists!"):format(card.id))
            return true
         end
    end

    return false
end

---@param data CustomProfileCard | CustomProfileCard[]
local function createProfileCard(data)
    local arrLength = #data
    if arrLength > 0 then
        for i = 1, arrLength do
            local newCard = data[i]
            if not checkCardExists(newCard) then
                customProfileCards[#customProfileCards+1] = newCard
            end
        end
        return
    end

    ---@diagnostic disable-next-line: param-type-mismatch
    if not checkCardExists(data.id) then
        customProfileCards[#customProfileCards+1] = data
     end
end

exports('createProfileCard', createProfileCard)

local function getAll()
    return customProfileCards
end

createProfileCard({
    {
        id = 'licenses',
        title = locale('licenses'),
        icon = 'certificate',
        getData = function(profile)
            local licenses = framework.getLicenses({profile.charid})
            local licenseLabels = {}

            for i = 1, #licenses do
                licenseLabels[#licenseLabels+1] = licenses[i].label
            end

            return licenseLabels
        end
    },
    {
        id = 'vehicles',
        title = locale('vehicles'),
        icon = 'car',
        getData = function(profile)
            local vehicles = framework.getVehicles({profile.charid})
            local vehicleLabels = {}

            for i = 1, #vehicles do
                vehicleLabels[#vehicleLabels+1] = vehicles[i].label .. ' (' ..vehicles[i].plate.. ')'
            end

            return vehicleLabels
        end,
    },
    {
        id = 'pastCharges',
        title = locale("past_charges"),
        icon = 'gavel',
        getData = function(profile)
            local charges = MySQL.rawExecute.await('SELECT `charge` AS label, SUM(`count`) AS count FROM `ox_mdt_reports_charges` WHERE `charge` IS NOT NULL AND `stateId` = ? GROUP BY `charge`', {profile.stateId}) or {}
            local chargeLabels = {}

            for i = 1, #charges do
                chargeLabels[#chargeLabels+1] = charges[i].count ..'x ' ..  charges[i].label
            end

            return chargeLabels
        end,
    },
})

registerCallback('ox_mdt:getCustomProfileCards', function()
    return customProfileCards
end)

return {
    getAll = getAll,
    create = createProfileCard
}