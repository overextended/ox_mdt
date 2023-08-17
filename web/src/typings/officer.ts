export interface Officer {
  firstName: string;
  lastName: string;
  callSign?: number;
  stateId: string;
  playerId: number;
  position: [number, number, number];
  unitId?: number;
}
