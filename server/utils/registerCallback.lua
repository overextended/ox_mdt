local isAuthorised = require 'server.utils.isAuthorised'

---@param event string
---@param cb fun(playerId: number, ...: any): any
---@param permission string | false | nil
local function registerCallback(event, cb, permission)
    lib.callback.register(event, function(source, ...)
        if permission ~= false and not isAuthorised(source, permission or 'mdt.access') then return false end

        return cb(source, ...)
    end)
end

return registerCallback
