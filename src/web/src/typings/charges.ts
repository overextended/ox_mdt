export interface Charge {
  label: string;
  type: 'misdemeanor' | 'felony' | 'infraction';
  description: string;
  time: number;
  fine: number;
}

export interface SelectedCharge extends Omit<Charge, 'type' | 'description'> {
  count: number;
}
