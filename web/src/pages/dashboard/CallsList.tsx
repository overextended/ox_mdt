import { IconPhoneOff } from '@tabler/icons-solidjs';
import { Component, For } from 'solid-js';
import { createStore } from 'solid-js/store';

interface Call {
  id: number;
  location: string;
  createdAt: number;
  code: string;
  description?: string;
  title: string;
  attached?: string[];
}

const CALLS: Call[] = [
  {
    id: 1,
    location: 'Havick Ave',
    createdAt: Date.now(),
    code: '10-13A',
    description: 'Officer down near X',
    title: 'Officer down',
  },
  {
    id: 2,
    location: 'Strawberry Ave',
    createdAt: Date.now(),
    code: '10-50',
    title: 'Vehicle crash',
    attached: ['132', '152', '231', '132', '111', '424'],
  },
];

const CallsList: Component = () => {
  const [calls, setCalls] = createStore<Call[]>(CALLS);

  if (!calls || calls.length <= 0)
    return (
      <div class="flex h-full flex-col items-center justify-center text-2xl text-dark-200">
        <IconPhoneOff size={36} />
        <p>No active calls</p>
      </div>
    );

  return (
    <div class="flex flex-col gap-2">
      <For each={calls}>
        {(call) => (
          <div class="flex flex-col gap-4 rounded-md bg-durple-200 p-4 shadow-md hover:cursor-pointer hover:bg-durple-100">
            <div class="flex flex-col justify-between">
              <p>{call.title}</p>
              <p class="text-xs text-dark-100">{call.code}</p>
            </div>
            <div class="flex flex-col gap-2">
              <div>
                <p class="text-xs text-dark-200">Loaction:</p>
                <p>{call.location}</p>
              </div>
              <div>
                <p class="text-xs text-dark-200">Created at:</p>
                <p>{new Date(call.createdAt).toLocaleDateString()}</p>
              </div>
              {call.description && (
                <div>
                  <p class="text-xs text-dark-200">Description:</p>
                  <p>{call.description}</p>
                </div>
              )}
              {call.attached && (
                <div class="flex flex-col">
                  <p class="mb-1 text-xs text-dark-200">Attached units:</p>
                  <div class="flex flex-wrap gap-1 text-sm">
                    <For each={call.attached}>
                      {(unit) => <div class="rounded-full bg-durple-50 p-1 px-3">{unit}</div>}
                    </For>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </For>
    </div>
  );
};

export default CallsList;
