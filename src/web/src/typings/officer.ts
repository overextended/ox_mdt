export interface Officer {
  firstName: string;
  lastName: string;
  callSign?: string | number;
  stateId: string;
  playerId: number;
  position: [number, number, number];
  unitId?: number;
}
