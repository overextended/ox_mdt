import { Call, Unit } from '../typings';

export interface CallsResponse extends Omit<Call, 'id' | 'units'> {
  units: { [key: string]: Omit<Unit, 'id'> };
}

export const convertCalls = (resp: CallsResponse): Call[] => {
  return Object.entries(resp).map((entry: [string, CallsResponse]) => {
    const call: Call = { id: +entry[0], ...entry[1], units: [] };
    call.units = Object.entries(entry[1].units).map((unitEntry) => ({ id: +unitEntry[0], ...unitEntry[1] }));

    return call;
  });
};

interface CallResponse extends Omit<Call, 'units'> {
  units: { [key: string]: Omit<Unit, 'id'> };
}

export const convertCall = (resp: CallResponse): Call => {
  const units = Object.entries(resp.units).map((unit) => ({ id: +unit[0], ...unit[1] }));

  return { ...resp, units };
};
