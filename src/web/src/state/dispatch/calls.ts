import { atom, useAtom, useAtomValue } from 'jotai';
import { Call } from '../../typings';
import { isEnvBrowser } from '../../utils/misc';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { fetchNui } from '../../utils/fetchNui';
import { queryClient } from '../../main';
import { CallsResponse, convertCalls } from '../../helpers';

const DEBUG_CALLS: Call[] = [
  {
    id: 1,
    time: Date.now(),
    location: 'Somewhere',
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
        members: [
          { firstName: 'Billy', lastName: 'Bob', callSign: 132, stateId: '321553', playerId: 1, position: [0, 0, 0] },
        ],
        id: 132,
      },
      {
        name: 'Unit 322',
        type: 'heli',
        members: [
          {
            firstName: 'Marc',
            lastName: 'Marshall',
            callSign: 322,
            stateId: '451503',
            playerId: 1,
            position: [0, 0, 0],
          },
        ],
        id: 322,
      },
    ],
  },
  {
    id: 2,
    time: Date.now(),
    location: 'Somewhere',
    info: [
      { label: 'Sultan RS', icon: 'car' },
      { label: 'XYZ 123', icon: 'badge-tm' },
    ],
    coords: [255, 150],
    blip: 51,
    completed: Date.now(),
    linked: false,
    offense: 'Officer Down',
    code: '10-13',
    units: [
      {
        name: 'Unit 132',
        type: 'car',
        members: [
          { firstName: 'Billy', lastName: 'Bob', callSign: 132, stateId: '311342', playerId: 1, position: [0, 0, 0] },
          {
            firstName: 'Martin',
            lastName: 'Contreras',
            callSign: 521,
            stateId: '912132',
            playerId: 1,
            position: [0, 0, 0],
          },
        ],
        id: 132,
      },
      {
        name: 'Unit 823',
        type: 'heli',
        members: [
          {
            firstName: 'Bobby',
            lastName: 'Hopkins',
            callSign: 823,
            stateId: '100341',
            playerId: 1,
            position: [0, 0, 0],
          },
        ],
        id: 823,
      },
      {
        name: 'Unit 531',
        type: 'motor',
        members: [
          {
            firstName: 'Connor',
            lastName: 'Collins',
            callSign: 531,
            stateId: '913213',
            playerId: 1,
            position: [0, 0, 0],
          },
        ],
        id: 531,
      },
      {
        name: 'Unit 274',
        type: 'boat',
        members: [
          { firstName: 'Corey', lastName: 'Hayes', callSign: 274, stateId: '920132', playerId: 1, position: [0, 0, 0] },
        ],
        id: 274,
      },
    ],
  },
  {
    id: 3,
    time: Date.now(),
    location: 'Somewhere',
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
        members: [
          { firstName: 'Billy', lastName: 'bob', callSign: 132, stateId: '913213', playerId: 1, position: [0, 0, 0] },
        ],
        id: 132,
      },
      {
        name: 'Unit 6',
        type: 'heli',
        members: [
          {
            firstName: 'Freddie',
            lastName: 'Reid',
            callSign: 823,
            stateId: '920132',
            playerId: 2,
            position: [0, 0, 0],
          },
        ],
        id: 823,
      },
    ],
  },
];

const getCalls = async (callType: 'active' | 'completed'): Promise<Call[]> => {
  if (isEnvBrowser()) return DEBUG_CALLS;

  const resp = await fetchNui<{ [key: string]: CallsResponse }>('getCalls', callType);

  return convertCalls(resp);
};

const callTypeAtom = atom<'active' | 'completed'>('active');
export const useCallTypeState = () => useAtom(callTypeAtom);

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
