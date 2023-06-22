export interface Call {
  id: number;
  offense: {
    label: string;
    code: string;
  };
  completed: boolean;
  linked: boolean;
  info: {
    time: Date;
    location: string;
    plate?: string;
    description?: string;
    vehicle?: string;
  };
  units: Unit[];
}

export interface Unit {
  name: string;
  members: string[];
  type: 'car' | 'motor' | 'heli' | 'boat';
}
