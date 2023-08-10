import { Officer } from './officer';

export type UnitType = 'car' | 'motor' | 'heli' | 'boat';

export interface Call {
  id: number;
  offense: string;
  code: string;
  completed: boolean;
  linked: boolean;
  coords: [number, number];
  blip: number;
  info: {
    time: number;
    location: string;
    plate?: string;
    vehicle?: string;
  };
  units: Unit[];
}

export interface Unit {
  id: number;
  name: string;
  members: Officer[];
  type: UnitType;
}
