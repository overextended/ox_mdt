import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Call } from '../../typings';
import { isEnvBrowser } from '../../utils/misc';

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
    offense: {
      label: 'Bank robbery',
      code: '10-29',
    },
    units: [
      {
        name: 'Unit 1',
        type: 'car',
        members: [{ firstName: 'Billy', lastName: 'Bob', callSign: 132, stateId: 321553 }],
        id: 1,
      },
      {
        name: 'Unit 6',
        type: 'heli',
        members: [{ firstName: 'Marc', lastName: 'Marshall', callSign: 322, stateId: 451503 }],
        id: 2,
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
    completed: true,
    linked: false,
    offense: {
      label: 'Officer Down',
      code: '10-13',
    },
    units: [
      {
        name: 'Unit 1',
        type: 'car',
        members: [
          { firstName: 'Billy', lastName: 'Bob', callSign: 132, stateId: 311342 },
          { firstName: 'Martin', lastName: 'Contreras', callSign: 521, stateId: 912132 },
        ],
        id: 1,
      },
      {
        name: 'Unit 6',
        type: 'heli',
        members: [{ firstName: 'Bobby', lastName: 'Hopkins', callSign: 823, stateId: 100341 }],
        id: 2,
      },
      {
        name: 'Unit 4',
        type: 'motor',
        members: [{ firstName: 'Connor', lastName: 'Collins', callSign: 531, stateId: 913213 }],
        id: 3,
      },
      {
        name: 'Unit 3',
        type: 'boat',
        members: [{ firstName: 'Corey', lastName: 'Hayes', callSign: 274, stateId: 920132 }],
        id: 4,
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
    offense: {
      label: 'Officer Down',
      code: '10-13',
    },
    units: [
      {
        name: 'Unit 1',
        type: 'car',
        members: [{ firstName: 'Billy', lastName: 'bob', callSign: 132, stateId: 913213 }],
        id: 1,
      },
      {
        name: 'Unit 6',
        type: 'heli',
        members: [{ firstName: 'Freddie', lastName: 'Reid', callSign: 823, stateId: 920132 }],
        id: 2,
      },
    ],
  },
];

const callTypeAtom = atom<'active' | 'completed'>('active');
export const useCallTypeState = () => useAtom(callTypeAtom);

const callsAtom = atom<Call[]>(isEnvBrowser() ? DEBUG_CALLS : []);
const filteredCallsAtom = atom((get) => {
  const callType = get(callTypeAtom);

  return get(callsAtom).filter((call) => (callType === 'active' ? !call.completed : call.completed));
});

export const useFilteredCalls = () => useAtomValue(filteredCallsAtom);
export const useSetCalls = () => useSetAtom(callsAtom);
