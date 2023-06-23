import { atom, useAtom, useAtomValue } from 'jotai';
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
      { name: 'Unit 1', type: 'car', members: [{ name: 'Billy bob', callSign: 132 }] },
      { name: 'Unit 6', type: 'heli', members: [{ name: 'Someone', callSign: 823 }] },
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
      { name: 'Unit 1', type: 'car', members: [{ name: 'Billy bob', callSign: 132 }] },
      { name: 'Unit 6', type: 'heli', members: [{ name: 'Someone', callSign: 823 }] },
      { name: 'Unit 4', type: 'motor', members: [{ name: 'Someone', callSign: 823 }] },
      { name: 'Unit 3', type: 'boat', members: [{ name: 'Someone', callSign: 823 }] },
    ],
  },
];

const callType = atom<'active' | 'completed'>('active');
export const useCallTypeState = () => useAtom(callType);

const callsAtom = atom<Call[]>(isEnvBrowser() ? DEBUG_CALLS : []);
const activeCalls = atom((get) => get(callsAtom).filter((call) => !call.completed));
const completedCalls = atom((get) => get(callsAtom).filter((call) => call.completed));

export const useActiveCalls = () => useAtomValue(activeCalls);
export const useCompletedCalls = () => useAtomValue(completedCalls);
