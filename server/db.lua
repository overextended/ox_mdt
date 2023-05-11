local db = {}
local wildcard = '%s%%'

---@param id string | number
function db.selectCharacterById(id)
    return MySQL.query.await(
        'SELECT `firstName`, `lastName`, `dateofbirth` as dob, `charid` as id FROM `characters` WHERE `charid` LIKE ?',
        {
            wildcard:format(id)
        })
end

---@param name string
function db.selectCharacterByName(name)
    local nameA, nameB = name:match('^([%w]+) ?([%w]*)$')

    if nameB == '' then
        nameA = wildcard:format(nameA)

        return MySQL.query.await(
            'SELECT `firstName`, `lastName`, `dateofbirth` as dob, `charid` as id FROM `characters` WHERE `firstName` LIKE ? OR `lastName` LIKE ?',
            {
                nameA, nameA
            })
    end

    return MySQL.query.await(
        'SELECT `firstName`, `lastName`, `dateofbirth` as dob, `charid` as id FROM `characters` WHERE `firstName` = ? AND `lastName` LIKE ?',
        {
            nameA, wildcard:format(nameB)
        })
end

return db
