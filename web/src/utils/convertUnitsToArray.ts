import { Unit } from '../typings';

export const convertUnitsToArray = (units: { [key: string]: Omit<Unit, 'id'> }): Unit[] => {
  return Object.entries(units).map((unit) => ({ id: +unit[0], ...unit[1] }));
};
