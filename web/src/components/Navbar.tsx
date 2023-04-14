import {
  IconAlertTriangle,
  IconGavel,
  IconLayoutDashboard,
  IconMap2,
  IconReceipt,
  IconSettings,
  IconUserShield,
  IconUsers,
} from '@tabler/icons-solidjs';
import { Component } from 'solid-js';
import NavButton from './NavButton';

export const Navbar: Component = () => {
  return (
    <aside class="flex h-full w-1/4 flex-col justify-between rounded-bl-md rounded-tl-md bg-durple-400 p-4 font-main text-white">
      <div>
        <p class="self-start py-2 text-xs font-bold uppercase text-dark-200">Pages</p>
        <NavButton icon={IconLayoutDashboard} label="Dashboard" path="/" />
        <NavButton icon={IconUsers} label="Profiles" path="/profiles" />
        <NavButton icon={IconReceipt} label="Reports" path="/reports" />
        <NavButton icon={IconMap2} label="Dispatch" path="/dispatch" />
        <NavButton icon={IconGavel} label="Laws" path="/laws" />
        <p class="self-start py-2 text-xs font-bold uppercase text-dark-200">Management</p>
        <NavButton icon={IconUserShield} label="Officers" path="/officers" />
      </div>
      <div class="flex w-full items-center gap-4 rounded-md bg-durple-200 p-2">
        <img src="https://avatars.githubusercontent.com/u/39926192?s=120&v=4" alt="pp" class="h-10 w-10 rounded-full" />
        <div class="flex flex-col justify-center overflow-hidden">
          <p class="truncate text-sm text-dark-50">Svetozar Miletić</p>
          <p class="text-xs text-dark-200">LSPD Officer</p>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
