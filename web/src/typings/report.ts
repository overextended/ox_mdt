import { DateValue } from '@mantine/dates';
import { SelectedCharge } from './charges';
import { ProfileCard } from './profile';
import { Officer } from './officer';

export interface Criminal extends CriminalProfile {
  charges: SelectedCharge[];
  issueWarrant: boolean;
  pleadedGuilty?: boolean;
  processed?: boolean;
  warrantExpiry?: DateValue;
  penalty: {
    time: number;
    fine: number;
    points: number;
    reduction: number | null;
  };
}

export type Evidence = {
  type: 'image' | 'item';
  label: string;
  value: string;
};

export interface Report {
  title: string;
  id: number;
  description?: string;
  officersInvolved: Officer[];
  evidence: Evidence[];
  criminals: Criminal[];
}

export interface ReportCard {
  title: string;
  author: string;
  date: number;
  id: number;
}

export interface CriminalProfile extends ProfileCard {}
