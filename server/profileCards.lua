local utils = require 'server.utils'
local framework = require 'server.framework.ox_core'

---@class CustomProfileCard
---@field [string] CustomProfileCardValue

---@class CustomProfileCardValue
---@field title string
---@field icon string
---@field getData fun(parameters: {search: string}): string[]

---@type CustomProfileCard
local customProfileCards = {}

---@param data CustomProfileCard
local function createProfileCard(data)
    for k, v in pairs(data) do
        customProfileCards[k] = v
    end
end

exports('createProfileCard', createProfileCard)

local function getAll()
    return customProfileCards
end

createProfileCard({
    licenses = {
        title = 'Licenses',
        icon = '',
        getData = function(profile)
            local licenses = framework.getLicenses({profile.charid})
            local licenseLabels = {}

            for i = 1, #licenses do
                licenseLabels[#licenseLabels+1] = licenses[i].label
            end

            return licenseLabels
        end
    },
    vehicles = {
        title = 'Vehicles',
        getData = function(profile)
            local vehicles = framework.getVehicles({profile.charid})
            local vehicleLabels = {}

            for i = 1, #vehicles do
                vehicleLabels[#vehicleLabels+1] = vehicles[i].label .. ' (' ..vehicles[i].plate.. ')'
            end

            return vehicleLabels
        end,
        icon = ''
    },
    pastCharges = {
        title = 'Past charges',
        getData = function(profile)
            local charges = MySQL.rawExecute.await('SELECT `charge` AS label, SUM(`count`) AS count FROM `ox_mdt_reports_charges` WHERE `charge` IS NOT NULL AND `stateId` = ? GROUP BY `charge`', {profile.stateId}) or {}
            local chargeLabels = {}

            for i = 1, #charges do
                chargeLabels[#chargeLabels+1] = charges[i].count ..'x ' ..  charges[i].label
            end

            return chargeLabels
        end,
        icon = ''
    },
    property = {
        title = 'Property',
        icon = '',
        getData = function()
            return {'Strawberry Ave 40', 'Pogchamp Street 13'}
        end
    }
})

utils.registerCallback('ox_mdt:getCustomProfileCards', function()
    return customProfileCards
end)

return {
    getAll = getAll,
    create = createProfileCard
}