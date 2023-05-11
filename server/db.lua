local db = {}
local selectCharacter = 'SELECT `firstName`, `lastName`, DATE_FORMAT(`dateofbirth`, "%Y-%m-%d") as dob, `charid` as id FROM `characters`'
local wildcard = '%s%%'

local selectCharacterById = selectCharacter .. ' WHERE `charid` LIKE ?'

---@param id string | number
function db.selectCharacterById(id)
    return MySQL.query.await(selectCharacterById, { wildcard:format(id) })
end

local selectCharacterByNameA = selectCharacter .. ' WHERE `firstName` LIKE ? OR `lastName` LIKE ?'
local selectCharacterByNameB = selectCharacter .. ' WHERE `firstName` = ? AND `lastName` LIKE ?'

---@param name string
function db.selectCharacterByName(name)
    local nameA, nameB = name:match('^([%w]+) ?([%w]*)$')

    if nameB == '' then
        nameA = wildcard:format(nameA)

        return MySQL.query.await(selectCharacterByNameA, { nameA, nameA })
    end

    return MySQL.query.await(selectCharacterByNameB, { nameA, wildcard:format(nameB) })
end

return db
