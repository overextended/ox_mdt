local utils = {}

---@param playerId number
---@return boolean
function utils.isAuthorised(playerId, permission)
    ---@diagnostic disable-next-line: param-type-mismatch
    return IsPlayerAceAllowed(playerId, permission)
end

---@param event string
---@param cb fun(playerId: number, ...: any): any
---@param permission string | false | nil
function utils.registerCallback(event, cb, permission)
    lib.callback.register(event, function(source, ...)
        if permission ~= false and not utils.isAuthorised(source, permission or 'mdt.access') then return false end

        return cb(source, ...)
    end)
end

return utils
