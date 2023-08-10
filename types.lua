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
---@field callSign? number
---@field stateId string

---@class CriminalProfile : ProfileCard

---@class Criminal : CriminalProfile
---@field charges SelectedCharge[]
---@field issueWarrant boolean
---@field pleadedGuilty? boolean
---@field processed? boolean
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
---@field officersInvolved { name: string, callSign: string }
---@field evidence table<Evidence>
---@field criminals Criminal[]

---@class ReportCard
---@field title string
---@field author string
---@field date string
---@field id number

---@class Evidence
---@field type 'image' | 'item'
---@field label string
---@field value string

---@class Announcement
---@field contents string
---@field firstName string
---@field lastName string
---@field image? string
---@field stateId number
---@field callSign string
---@field createdAt number

---@class Units
---@field [number] { name: string, members: Officer[], type: 'car' | 'motor' | 'heli' | 'boat'   }

---@class CallInfo
---@field time number
---@field location string
---@field plate? string
---@field vehicle? string

---@class Calls
---@field [number] { offense: string, code: string, units: Units, coords: table, completed: boolean, info: CallInfo, blip: number }

---@class CallDataInfo
---@field plate? string
---@field vehicle? string

---@class CallData
---@field offense string
---@field code string
---@field coords table
---@field info CallDataInfo
---@field blip number