export interface Charge {
  label: string;
  type: 'misdemeanour' | 'felony' | 'infraction';
  description: string;
  penalty: {
    time: number;
    fine: number;
    points: number;
  };
}

export interface SelectedCharge {
  label: string;
  count: number;
  penalty: {
    time: number;
    fine: number;
    points: number;
  };
}