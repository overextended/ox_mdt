import { Officer } from './officer';

export interface RosterOfficer extends Officer {
  title: string;
  image?: string;
}
