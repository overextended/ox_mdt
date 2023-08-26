export interface Profile extends PartialProfileData {
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

export interface PartialProfileData {
  firstName: string;
  lastName: string;
  dob: number;
  stateId: string;
  image?: string;
}

export interface CustomProfileData {
  id: string;
  title: string;
  icon: string;
}
