---@class PartialProfileData
---@field firstName string
---@field lastName string
---@field dob number
---@field stateId string
---@field image? string

---@class Profile : PartialProfileData
---@field stateId string
---@field charid number | string
---@field notes? string
---@field licenses? table<string, { label: string } | string>[]
---@field vehicles? { label: string, plate: string }[]
---@field pastCharges? { label: string, count: number }[]
---@field relatedReports? { title: string, author: string, date: string, id: number }[]

---@class Officer
---@field firstName string
---@field lastName string
---@field stateId string
---@field callSign? string
---@field unitId? string
---@field position? { [1]: number, [2]: number }
---@field ped number
---@field playerId number
---@field grade number
---@field group string

---@class CriminalProfile : PartialProfileData

---@class Criminal : CriminalProfile
---@field charges SelectedCharge[]
---@field issueWarrant boolean
---@field pleadedGuilty? boolean
---@field processed? boolean
---@field warrantExpiry? string
---@field penalty { time: number, fine: number, reduction?: number }

---@class Charge
---@field label string
---@field type 'misdemeanour' | 'felony' | 'infraction'
---@field description string
---@field time number
---@field fine number

---@class SelectedCharge
---@field label string
---@field count number
---@field time number
---@field fine number

---@class Report
---@field title string
---@field id number
---@field description? string
---@field officersInvolved { name: string, callSign: string }
---@field evidence table<Evidence>
---@field criminals Criminal[]

---@class PartialReportData
---@field title string
---@field author string
---@field date string
---@field id number

---@class Evidence
---@field label string
---@field image string

---@class Announcement
---@field id number
---@field contents string
---@field createdAt string
---@field firstName string
---@field lastName string
---@field stateId string

---@alias UnitType
---| 'car'
---| 'motor'
---| 'heli'
---| 'boat'

---@alias Unit { id: number, name: string, members: Officer[], type: UnitType }

---@class Units
---@field [number] Unit

---@class CallInfo
---@field plate? string
---@field vehicle? string

---@class Call
---@field id number
---@field offense string
---@field code string
---@field completed boolean
---@field coords { [1]: number, [2]: number }
---@field blip number
---@field units Units
---@field time number
---@field location string
---@field isEmergency? boolean
---@field info { [string]: string | number }

---@class Calls
---@field [number] Call

---@class CallDataInfo
---@field plate? string
---@field vehicle? string

---@class CallData
---@field offense string
---@field code string
---@field coords table
---@field info CallDataInfo
---@field blip number

---@alias FetchOfficers { firstName: string, lastName: string, stateId: string }[]
---@alias FetchCriminals { stateId: string, firstName: string, lastName: string, reduction: number, warrantExpiry?: string, processed?: number | boolean, pleadedGuilty?: number | boolean, issueWarrant?: boolean, [string]: any }[]
---@alias FetchCharges { stateId: string, label: string, time: number?, fine: number?, count: number }[]