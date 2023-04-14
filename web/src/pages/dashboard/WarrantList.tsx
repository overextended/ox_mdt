import { Component, For, createSignal } from 'solid-js';

interface Warrant {
  image: string;
  firstName: string;
  lastName: string;
  reason: string;
  expiresIn: number;
}

const WARRANTS: Warrant[] = [
  {
    image: 'https://avatars.githubusercontent.com/u/39926192?s=120&v=4',
    firstName: 'Svetozar',
    lastName: 'Miletić',
    reason: 'Being a bitch',
    expiresIn: Date.now(),
  },
  {
    image: 'https://avatars.githubusercontent.com/u/31368547?s=120&v=4',
    firstName: 'Doka',
    lastName: 'Doka',
    reason: 'Being too cute',
    expiresIn: Date.now(),
  },
];

const WarrantList: Component = () => {
  const [warrants, setWarrants] = createSignal<Warrant[]>(WARRANTS);

  return (
    <div class="flex flex-col gap-2">
      <For each={warrants()}>
        {(warrant) => (
          <div class="flex gap-3 rounded-md bg-durple-200 p-3 text-dark-200 shadow-md">
            <img src={warrant.image} alt="warrant_image" class="w-1/3 rounded-md" />
            <div class="flex flex-col">
              <p class="text-lg text-dark-50">
                {warrant.firstName} {warrant.lastName}
              </p>
              <p class="text-xs">
                Wanted for: <span class="text-dark-50">{warrant.reason}</span>
              </p>
              <p class="text-xs">
                Expires: <span class="text-dark-50">{new Date(warrant.expiresIn).toLocaleDateString()}</span>
              </p>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};

export default WarrantList;
