export interface Announcement {
  id: number;
  creator: {
    stateId: number;
    firstName: string;
    lastName: string;
    callSign: number;
    image?: string;
  };
  contents: string;
  createdAt: number;
}
