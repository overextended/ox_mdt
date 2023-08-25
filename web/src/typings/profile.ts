export interface Profile extends ProfileCard {
  notes?: string;
  phoneNumber: string;
  [key: string]: any;
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
  dob: number;
  stateId: string;
  image?: string;
}

export interface CustomProfileData {
  title: string;
  icon: string;
  data: string[];
}
