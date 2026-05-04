import { Profile } from './mdt';

export interface ProfileCardData {
  id: string;
  title: string;
  icon: string;
  getData: (profile: Profile) => Promise<string[]>;
}
