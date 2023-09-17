---@generic T
---@param fn async fun(parameters?: table, match?: boolean): T
---@param search string?
---@param offset number? Offset query results when using LIMIT.
---@return T?
local function dbSearch(fn, search, offset)
    if not search or search == '' then
        return fn({ offset })
    end

    local str = {}

    for word in search:gmatch('%S+') do
        str[#str + 1] = '+'
        str[#str + 1] = word:gsub('[%p%c]', '')
        str[#str + 1] = '*'
    end

    if #str > 3 then table.remove(str, 3) end

    search = table.concat(str)

    return fn({ search == '+*' and '' or search, offset }, true)
end

return dbSearch
