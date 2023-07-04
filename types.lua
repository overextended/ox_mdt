---@class ProfileCard
---@field firstName string
---@field lastName string
---@field dob number
---@field playerId number | string
---@field image? string


---@class Profile : ProfileCard
---@field stateId number | string
---@field notes? string
---@field licenses? table<{ label: string, points: number } | string>
---@field vehicles? { label: string, plate: string }
---@field pastCharges? { label: string, count: number }[]
---@field relatedReports? { title: string, author: string, date: string, id: number }[]

---@class CriminalProfile
---@field firstName string
---@field lastName string
---@field dob string
---@field id number
---@field image? string

---@class Criminal
---@field name string
---@field id number
---@field charges table[]
---@field issueWarrant boolean
---@field pleadedGuilty? boolean
---@field warrantExpiry? string
---@field penalty? { time: number, fine: number, points: number, reduction?: number }

---@class Report
---@field title string
---@field id number
---@field description? string
---@field officersInvolved { name: string, callSign: number }
---@field evidence table[]
---@field criminals Criminal[]

---@class ReportCard
---@field title string
---@field author string
---@field date string
---@field id number

---@class ImageEvidence
---@field type 'image'
---@field url string
---@field label string

---@class ItemEvidence
---@field type 'item'
---@field item string
---@field count number
