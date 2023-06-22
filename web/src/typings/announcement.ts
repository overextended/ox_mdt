export interface Announcement {
  id: number;
  creator: {
    id: string;
    firstName: string;
    lastName: string;
    callSign: number;
    image?: string;
  };
  contents: string;
  createdAt: number;
}