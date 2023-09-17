local permissions = require 'server.permissions'
local framework

CreateThread(function()
   framework = require 'server.framework.ox_core'
end)

---@param playerId number
---@param permission string
---@return boolean?
local function isAuthorised(playerId, permission)
    return framework.isAuthorised(playerId, permissions[permission] or 0)
end

return isAuthorised
