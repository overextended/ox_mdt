import { IconAlertTriangle, IconLayoutDashboard, IconReceipt, IconUsers } from '@tabler/icons-solidjs';
import { Component } from 'solid-js';
import NavButton from './NavButton';

export const Navbar: Component = () => {
  return (
    <aside class="flex h-full w-fit flex-col items-center rounded-bl-md rounded-tl-md bg-durple-400 p-4 font-main text-white">
      <NavButton icon={IconLayoutDashboard} label="Dashboard" path="/" />
      <NavButton icon={IconAlertTriangle} label="Incidents" path="/incidents" />
      <NavButton icon={IconUsers} label="Profiles" path="/profiles" />
      <NavButton icon={IconReceipt} label="Reports" path="/reports" />
    </aside>
  );
};

export default Navbar;
