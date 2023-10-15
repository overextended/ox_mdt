local config = require 'config'
local permissions = require 'server.permissions'
local framework

CreateThread(function()
   framework = require(('server.framework.%s'):format(config.framework))
end)

---@param playerId number
---@param permission string
---@return boolean?
local function isAuthorised(playerId, permission)
    return framework.isAuthorised(playerId, permissions[permission] or 0, permission)
end

return isAuthorised
