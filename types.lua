---@class ProfileCard
---@field firstName string
---@field lastName string
---@field dob number
---@field stateId number | string
---@field image? string

---@class Profile : ProfileCard
---@field stateId number | string
---@field notes? string
---@field licenses? table<{ label: string, points: number } | string>
---@field vehicles? { label: string, plate: string }
---@field pastCharges? { label: string, count: number }[]
---@field relatedReports? { title: string, author: string, date: string, id: number }[]

---@class Officer
---@field firstName string
---@field lastName string
---@field callSign number
---@field stateId number

---@class CriminalProfile : ProfileCard

---@class Criminal : CriminalProfile
---@field charges SelectedCharge[]
---@field issueWarrant boolean
---@field pleadedGuilty? boolean
---@field warrantExpiry? string
---@field penalty { time: number, fine: number, points: number, reduction?: number }

---@class Charge
---@field label string
---@field type 'misdemeanour' | 'felony' | 'infraction'
---@field description string
---@field penalty { time: number, fine: number, points: number }

---@class SelectedCharge
---@field label string
---@field count number
---@field penalty { time: number, fine: number, points: number }

---@class Report
---@field title string
---@field id number
---@field description? string
---@field officersInvolved { name: string, callSign: number }
---@field evidence table<ImageEvidence | ItemEvidence>
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
