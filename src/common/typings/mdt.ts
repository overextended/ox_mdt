export interface PartialProfileData {
  firstName: string;
  lastName: string;
  dob: number;
  stateId: string;
  image?: string;
}

export interface Profile extends PartialProfileData {
  charid: number | string;
  notes?: string;
  licenses?: Record<string, { label: string } | string>[];
  vehicles?: { label: string; plate: string }[];
  pastCharges?: { label: string; count: number }[];
  relatedReports?: { title: string; author: string; date: string; id: number }[];
}

export interface Officer {
  firstName: string;
  lastName: string;
  stateId: string;
  callSign?: string;
  unitId?: string;
  position?: [number, number];
  title?: string;
  ped: number;
  playerId: number;
  grade: number;
  group: string;
}

export interface CriminalProfile extends PartialProfileData {}

export interface Criminal extends CriminalProfile {
  charges: SelectedCharge[];
  issueWarrant: boolean;
  pleadedGuilty?: boolean;
  processed?: boolean;
  warrantExpiry?: string;
  penalty: { time: number; fine: number; reduction?: number };
}

export interface Charge {
  label: string;
  type: 'misdemeanour' | 'felony' | 'infraction';
  description: string;
  time: number;
  fine: number;
  count: number;
}

export interface SelectedCharge {
  label: string;
  count: number;
  time: number;
  fine: number;
}

export interface Evidence {
  label: string;
  image: string;
}

export interface Report {
  title: string;
  id: number;
  description?: string;
  officersInvolved: { name: string; callSign: string };
  evidence: Evidence[];
  criminals: Criminal[];
}

export interface PartialReportData {
  title: string;
  author: string;
  date: string;
  id: number;
}

export interface Announcement {
  id: number;
  contents: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  creator: string;
}

export type UnitType = 'car' | 'motor' | 'heli' | 'boat';
export const isUnitTypeValid = (value: string): boolean => {
  return ['car', 'motor', 'heli', 'boat'].includes(value);
};

export interface Unit {
  id: string;
  name: string;
  members: Officer[];
  type: UnitType;
}

export type Units = Record<string, Unit>;

export interface CallInfo {
  plate?: string;
  vehicle?: string;
}

export interface Call {
  id: number;
  offense: string;
  code: string;
  completed: boolean | number;
  coords: [number, number];
  blip: number;
  units: Units;
  time: number;
  location: string;
  isEmergency?: boolean;
  info: CallInfo;
}

export type Calls = Call[];

export interface CallDataInfo {
  plate?: string;
  vehicle?: string;
}

export interface CallData {
  offense: string;
  code: string;
  coords: [number, number];
  info: CallDataInfo;
  blip: number;
}

export type FetchOfficers = {
  firstName: string;
  lastName: string;
  stateId: string;
}[];

export type FetchCriminals = {
  stateId: string;
  firstName: string;
  lastName: string;
  reduction: number;
  dob: number;
  warrantExpiry?: string;
  processed?: number | boolean;
  pleadedGuilty?: number | boolean;
  issueWarrant?: boolean;
  [key: string]: any;
}[];

export type FetchCharges = {
  stateId: string;
  label: string;
  time?: number;
  fine?: number;
  count: number;
}[];

// for the getBolos db method joining data for display
export interface BoloRecap {
  id: number;
  stateId: string;
  contents: string;
  callSign: string | null;
  image: string | null;
  firstName: string;
  lastName: string;
  images: string[];
  createdAt: string;
}

export interface DBBolo {
  id: number;
  creator: string;
  contents: string;
  createdAt: string;
}
