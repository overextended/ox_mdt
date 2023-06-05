local isAuthorised = require 'server.isAuthorised'
local db = require 'server.db'

---@param source number
---@param search string
---@return CriminalProfile[]?
lib.callback.register('ox_mdt:getCriminalProfiles', function(source, search)
    if not isAuthorised(source) then return end

    if type(search) == 'number' then
        return db.selectCharacterById(search)
    end

    return db.selectCharacterByName(search)
end)

---@param title string
---@return number?
lib.callback.register('ox_mdt:createReport', function(source, title)
    local player = Ox.GetPlayer(source)
    return db.createReport(title, player.name)
end)

---@param source number
---@param search string | number
---@return ReportCard[]
lib.callback.register('ox_mdt:getReports', function(source, search)
    if type(search) == 'number' then
        return db.selectReportsById(search)
    end

    return db.selectReports(search)
end)

---@param source number
---@param reportId number
---@return Report?
lib.callback.register('ox_mdt:getReport', function(source, reportId)
    local response = db.selectReportById(reportId)

    if response then
        ---@todo
        response.officersInvolved = {}
        response.evidence = {}
        response.criminals = {}

        print(json.encode(response, {indent=true,sort_keys=true}))
    end

    return response
end)

---@param source number
---@param reportId number
---@return number
lib.callback.register('ox_mdt:deleteReport', function(source, reportId)
    return db.deleteReport(reportId)
end)

---@param source number
---@param title string
---@param reportId number
---@return number
lib.callback.register('ox_mdt:setReportTitle', function(source, title, reportId)
    return db.updateReportTitle(title, reportId)
end)