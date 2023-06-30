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

---@param title string
---@return number?
lib.callback.register('ox_mdt:createReport', function(source, title)
    local player = Ox.GetPlayer(source)
    return db.createReport(title, player.name)
end)

---@param source number
---@param search string
---@return ReportCard[]
lib.callback.register('ox_mdt:getReports', function(source, search)
    if tonumber(search) then
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

        print(json.encode(response, { indent = true, sort_keys = true }))
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
---@param data { id: number, title: string}
---@return number
lib.callback.register('ox_mdt:setReportTitle', function(source, data)
    return db.updateReportTitle(data.title, data.id)
end)

---@param source number
---@param data { id: number, criminalId: number }
lib.callback.register('ox_mdt:addCriminal', function(source, data)
    return 1
end)

---@param source number
---@param data { id: number, index: number }
lib.callback.register('ox_mdt:removeCriminal', function(source, data)
    return 1
end)

---@param source number
---@param data { id: number, criminal: Criminal }
lib.callback.register('ox_mdt:saveCriminal', function(source, data)
    return 1
end)

---@param source number
---@param data { id: number, callSign: string }
lib.callback.register('ox_mdt:addOfficer', function(source, data)
    return 1
end)

---@param source number
---@param data { id: number, index: number }
lib.callback.register('ox_mdt:removeOfficer', function(source, data)
    return 1
end)

---@param source number
---@param data { id: number, evidence: ItemEvidence | ImageEvidence }
lib.callback.register('ox_mdt:addEvidence', function(source, data)
    return 1
end)

---@param source number
---@param data { id: number, index: number }
lib.callback.register('ox_mdt:removeEvidence', function(source, data)
    return 1
end)

---@param source number
---@param data string
lib.callback.register('ox_mdt:getProfiles', function(source, data)
    return db.selectProfiles(data)
end)