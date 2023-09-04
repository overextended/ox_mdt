local utils = require 'server.utils'
local framework = require 'server.framework.ox_core'
local db = require 'server.db'

---@param source number
utils.registerCallback('ox_mdt:getInitialRosterPage', function(source)
    local officers = framework.getOfficers()
    local cbOfficers = {}

    for i = 1, 9 do
        local officer = officers[i]
        cbOfficers[#cbOfficers + 1] = officer
    end

    return {
        totalRecords = #officers,
        officers = cbOfficers
    }
end)

---@param source number
---@param page number
utils.registerCallback('ox_mdt:getRosterPage', function(source, page)
    local officers = framework.getOfficers()
    local cbOfficers = {}

    local START = page * 9
    local END =  START + 9

    for i = START, END do
        local officer = allOfficers[i]
        cbOfficers[#cbOfficers + 1] = officer
    end

    return cbOfficers
end)


---@param source number
---@param data {stateId: string, callSign: string}
utils.registerCallback('ox_mdt:setOfficerCallSign', function(source, data)
    --todo permission checks
    if db.selectOfficerCallSign(data.callSign) then return false end

    db.updateOfficerCallSign(data.stateId, data.callSign)

    return true
end)