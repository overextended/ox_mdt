import { Call, Unit } from '../typings';

export interface CallsResponse extends Omit<Call, 'id' | 'units'> {
  units: { [key: string]: Omit<Unit, 'id'> };
}

export const convertUnitsToArray = (units: { [key: string]: Omit<Unit, 'id'> }): Unit[] => {
  if (!units) return [];
  return Object.entries(units).map((unit) => ({ id: +unit[0], ...unit[1] }));
};

export const convertCalls = (resp: { [key: string]: CallsResponse }): Call[] => {
  return Object.entries(resp).map((entry: [string, CallsResponse]) => {
    const call: Call = { id: +entry[0], ...entry[1], units: [] };
    call.units = convertUnitsToArray(entry[1].units);

    return call;
  });
};

interface CallResponse extends Omit<Call, 'units'> {
  units: { [key: string]: Omit<Unit, 'id'> };
}

export const convertCall = (resp: CallResponse): Call => {
  const units = convertUnitsToArray(resp.units);

  return { ...resp, units };
};
