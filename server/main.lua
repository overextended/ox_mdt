local utils = require 'server.utils'
local db = require 'server.db'

---@param source number
---@param search string
---@return CriminalProfile[]?
utils.registerCallback('ox_mdt:getCriminalProfiles', function(source, search)
    if tonumber(search) then
        return db.selectCharacterById(search)
    end

    return db.selectCharacterByName(search)
end)

---@param title string
---@return number?
utils.registerCallback('ox_mdt:createReport', function(source, title)
    local player = Ox.GetPlayer(source)
    return db.createReport(title, player.name)
end)

---@param source number
---@param data {page: number, search: string;}
---@return ReportCard[]
utils.registerCallback('ox_mdt:getReports', function(source, data)
    print('getReports', data.page)
    if tonumber(data.search) then
        return db.selectReportsById(data.search)
    end

    return db.selectReports(data.page, data.search)
end)

---@param source number
---@param reportId number
---@return Report?
utils.registerCallback('ox_mdt:getReport', function(source, reportId)
    local response = db.selectReportById(reportId)

    if response then
        ---@todo
        response.officersInvolved = db.selectOfficersInvolved(reportId)
        response.evidence = {}
        response.criminals = db.selectCriminalsInvolved(reportId)
    end

    return response
end)

---@param source number
---@param reportId number
---@return number
utils.registerCallback('ox_mdt:deleteReport', function(source, reportId)
    return db.deleteReport(reportId)
end)

---@param source number
---@param data { id: number, title: string}
---@return number
utils.registerCallback('ox_mdt:setReportTitle', function(source, data)
    return db.updateReportTitle(data.title, data.id)
end)

---@param source number
---@param data { id: number, criminalId: number }
utils.registerCallback('ox_mdt:addCriminal', function(source, data)
    return db.addCriminal(data.id, data.criminalId)
end)

---@param source number
---@param data { id: number, criminalId: number }
utils.registerCallback('ox_mdt:removeCriminal', function(source, data)
    return db.removeCriminal(data.id, data.criminalId)
end)

---@param source number
---@param data { id: number, criminal: Criminal }
utils.registerCallback('ox_mdt:saveCriminal', function(source, data)
    return db.saveCriminal(data.id, data.criminal)
end)

---@param source number
---@param data { id: number, callSign: string }
utils.registerCallback('ox_mdt:addOfficer', function(source, data)
    return 1
end)

---@param source number
---@param data { id: number, index: number }
utils.registerCallback('ox_mdt:removeOfficer', function(source, data)
    return 1
end)

---@param source number
---@param data { id: number, evidence: ItemEvidence | ImageEvidence }
utils.registerCallback('ox_mdt:addEvidence', function(source, data)
    return 1
end)

---@param source number
---@param data { id: number, index: number }
utils.registerCallback('ox_mdt:removeEvidence', function(source, data)
    return 1
end)

---@param source number
---@param data string
utils.registerCallback('ox_mdt:getProfiles', function(source, data)
    return db.selectProfiles()
end)

---@param source number
---@param data string
utils.registerCallback('ox_mdt:getProfile', function(source, data)
    return db.selectCharacterProfile(data)
end)

---@param source number
---@param data string
utils.registerCallback('ox_mdt:getSearchOfficers', function(source, data)
    -- Probably should switch to using firstName and lastName rather than name
    return { { name = 'John Doe', callSign = 132 }}
end)