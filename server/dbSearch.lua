local wildcard = '%s%%'

---Split a search string into search terms for partial and exact lookup by name.
---@param search string
---@return string
---@return string
---@return boolean?
local function splitSearch(search)
    local a, b = search:match('^([%w]+) ?([%w]*)$')

    if b == '' then
        a = wildcard:format(a)

        return a, a
    end

    return a, wildcard:format(b), true
end

---@generic T
---@param fn async fun(parameters?: table, match?: boolean): T
---@param search string?
---@param offset number? Offset query results when using LIMIT.
---@return T
local function dbSearch(fn, search, offset)
    if not search or search == '' then
        return fn({ offset })
    end

    local a, b, match = splitSearch(search)

    return fn({ a, b, offset }, match or false)
end

return dbSearch
