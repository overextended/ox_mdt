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
    <aside class="flex h-full w-1/4 flex-col items-center rounded-bl-md rounded-tl-md bg-durple-400 p-4 font-main text-white">
      <p class="self-start py-2 text-xs font-bold uppercase text-dark-200">Pages</p>
      <NavButton icon={IconLayoutDashboard} label="Dashboard" path="/" />
      <NavButton icon={IconUsers} label="Profiles" path="/profiles" />
      <NavButton icon={IconReceipt} label="Reports" path="/reports" />
      <NavButton icon={IconMap2} label="Dispatch" path="/dispatch" />
      <NavButton icon={IconGavel} label="Laws" path="/laws" />
      <p class="self-start py-2 text-xs font-bold uppercase text-dark-200">Management</p>
      <NavButton icon={IconUserShield} label="Officers" path="/manage" />
    </aside>
  );
};

export default Navbar;
