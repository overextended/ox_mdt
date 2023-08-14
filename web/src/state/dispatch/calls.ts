import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Call, Unit } from '../../typings';
import { isEnvBrowser } from '../../utils/misc';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { fetchNui } from '../../utils/fetchNui';
import { queryClient } from '../../main';
import { convertCalls } from '../../utils/convertCalls';

const DEBUG_CALLS: Call[] = [
  {
    id: 1,
    info: {
      time: Date.now(),
      location: 'Somewhere',
    },
    coords: [350, 350],
    completed: false,
    linked: false,
    offense: 'Bank robbery',
    code: '10-29',
    blip: 162,
    units: [
      {
        name: 'Unit 132',
        type: 'car',
        members: [{ firstName: 'Billy', lastName: 'Bob', callSign: 132, stateId: '321553' }],
        id: 132,
      },
      {
        name: 'Unit 322',
        type: 'heli',
        members: [{ firstName: 'Marc', lastName: 'Marshall', callSign: 322, stateId: '451503' }],
        id: 322,
      },
    ],
  },
  {
    id: 2,
    info: {
      time: Date.now(),
      location: 'Somewhere',
    },
    coords: [255, 150],
    blip: 51,
    completed: true,
    linked: false,
    offense: 'Officer Down',
    code: '10-13',
    units: [
      {
        name: 'Unit 132',
        type: 'car',
        members: [
          { firstName: 'Billy', lastName: 'Bob', callSign: 132, stateId: '311342' },
          { firstName: 'Martin', lastName: 'Contreras', callSign: 521, stateId: '912132' },
        ],
        id: 132,
      },
      {
        name: 'Unit 823',
        type: 'heli',
        members: [{ firstName: 'Bobby', lastName: 'Hopkins', callSign: 823, stateId: '100341' }],
        id: 823,
      },
      {
        name: 'Unit 531',
        type: 'motor',
        members: [{ firstName: 'Connor', lastName: 'Collins', callSign: 531, stateId: '913213' }],
        id: 531,
      },
      {
        name: 'Unit 274',
        type: 'boat',
        members: [{ firstName: 'Corey', lastName: 'Hayes', callSign: 274, stateId: '920132' }],
        id: 274,
      },
    ],
  },
  {
    id: 3,
    info: {
      time: Date.now(),
      location: 'Somewhere',
    },
    coords: [500, 750],
    completed: false,
    linked: false,
    blip: 310,
    offense: 'Officer Down',
    code: '10-13',
    units: [
      {
        name: 'Unit 1',
        type: 'car',
        members: [{ firstName: 'Billy', lastName: 'bob', callSign: 132, stateId: '913213' }],
        id: 132,
      },
      {
        name: 'Unit 6',
        type: 'heli',
        members: [{ firstName: 'Freddie', lastName: 'Reid', callSign: 823, stateId: '920132' }],
        id: 823,
      },
    ],
  },
];

interface CallsResponse extends Omit<Call, 'id' | 'units'> {
  units: { [key: string]: Omit<Unit, 'id'> };
}

const getCalls = async (callType: 'active' | 'completed'): Promise<Call[]> => {
  if (isEnvBrowser()) return DEBUG_CALLS;

  const resp = await fetchNui<CallsResponse>('getCalls', callType);

  return convertCalls(resp);
};

const callTypeAtom = atom<'active' | 'completed'>('active');
export const useCallTypeState = () => useAtom(callTypeAtom);

// const callsAtom = atom<Call[]>(isEnvBrowser() ? DEBUG_CALLS : []);
// const filteredCallsAtom = atom((get) => {
//   const callType = get(callTypeAtom);

//   return get(callsAtom).filter((call) => (callType === 'active' ? !call.completed : call.completed));
// });

const [callsAtom] = atomsWithQuery(
  (get) => ({
    queryKey: ['calls', get(callTypeAtom)],
    queryFn: async () => {
      return await getCalls(get(callTypeAtom));
    },
    refetchOnMount: true,
  }),
  () => queryClient
);

export const useCalls = () => useAtomValue(callsAtom);
