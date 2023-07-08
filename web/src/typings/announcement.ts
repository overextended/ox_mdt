import { Officer } from './officer';

interface AnnouncementCreator extends Officer {
  image?: string;
}

export interface Announcement {
  id: number;
  creator: AnnouncementCreator;
  contents: string;
  createdAt: number;
}
