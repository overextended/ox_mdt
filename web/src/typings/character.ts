export interface Character {
  stateId: string;
  firstName: string;
  lastName: string;
  title: string;
  grade: number;
  group: string;
  image?: string;
  callSign: number;
  unit?: number;
  isDispatch: boolean;
}
