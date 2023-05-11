local isAuthorised = require 'server.isAuthorised'
local db = require 'server.db'

---@param source number
---@param search string
---@return CriminalProfile[]?
lib.callback.register('ox_mdt:getCriminalProfiles', function(source, search)
    if not isAuthorised(source) then return end

    if tonumber(search) then
        return db.selectCharacterById(search)
    end

    return db.selectCharacterByName(search)
end)
