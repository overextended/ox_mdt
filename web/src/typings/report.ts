import { DateValue } from '@mantine/dates';
import { SelectedCharge } from './charges';

export interface Criminal {
  name: string;
  id: number;
  charges: SelectedCharge[];
  issueWarrant: boolean;
  pleadedGuilty?: boolean;
  warrantExpiry?: DateValue;
  penalty?: {
    time: number;
    fine: number;
    points: number;
    reduction: number | null;
  };
}

export type ImageEvidence = {
  type: 'image';
  url: string;
  label: string;
};
export type ItemEvidence = {
  type: 'item';
  item: string;
  count: number;
};

export interface Report {
  title: string;
  id: number;
  description?: string;
  officersInvolved: {
    name: string;
    callSign: number;
  }[];
  evidence: Array<ImageEvidence | ItemEvidence>;
  criminals: Criminal[];
}

export interface ReportCard {
  title: string;
  author: string;
  date: number;
  id: number;
}

export interface CriminalProfile {
  firstName: string;
  lastName: string;
  dob: string;
  id: number;
  image?: string;
}