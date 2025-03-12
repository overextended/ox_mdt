local config = require 'config'
local framework

CreateThread(function()
    framework = require(('server.framework.%s'):format(config.framework))
end)

---@param playerId number
---@param permission string
---@return boolean?
local function isAuthorised(playerId, permission)
    return framework.isAuthorised(playerId, permission)
end

return isAuthorised
