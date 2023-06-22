export interface Profile {
  firstName: string;
  lastName: string;
  stateId: number;
  dob: string;
  notes?: string;
  image?: string;
  licenses?: Array<{ label: string; points: number } | string>;
  vehicles?: {
    label: string;
    plate: string;
  }[];
  pastCharges?: {
    label: string;
    count: number;
  }[];
  relatedReports?: {
    title: string;
    author: string;
    date: string;
    id: number;
  }[];
}

export interface ProfileCard {
  firstName: string;
  lastName: string;
  dob: string;
  playerId: number | string;
  image?: string;
}
