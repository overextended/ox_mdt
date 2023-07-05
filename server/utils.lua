local utils = {}

---@param playerId number
---@return boolean
function utils.isAuthorised(playerId)
    ---@diagnostic disable-next-line: param-type-mismatch
    return IsPlayerAceAllowed(playerId, 'command.openMDT')
end

function utils.registerCallback(event, cb)
    lib.callback.register(event, function(source, ...)
        if not utils.isAuthorised(source) then return end

        return cb(source, ...)
    end)
end

return utils
