local utils = require 'server.utils'
local framework = require 'server.framework.ox_core'

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
---@param callSign number
utils.registerCallback('ox_mdt:setOfficerCallSign', function(source, callSign)
    --todo

    return true
end)