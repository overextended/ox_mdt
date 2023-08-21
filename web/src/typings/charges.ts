export interface Charge {
  label: string;
  type: 'misdemeanour' | 'felony' | 'infraction';
  description: string;
  penalty: {
    time: number;
    fine: number;
  };
}

export interface SelectedCharge extends Omit<Charge, 'type' | 'description'> {
  count: number;
}
