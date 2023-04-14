import { Component } from 'solid-js';
import AnnouncementList from './AnnouncementList';
import { IconFileDescription, IconMessageCircle, IconPhoneCall } from '@tabler/icons-solidjs';
import WarrantList from './WarrantList';

const Dashboard: Component = () => {
  return (
    <div class="flex h-full w-full items-center justify-center gap-4 p-4 font-main">
      <div class="flex h-full w-1/3 flex-col gap-8 rounded-md bg-durple-400 p-4 text-dark-50 shadow-md">
        <div class="flex w-full items-center justify-between">
          <p class="text-xl">Announcements</p>
          <IconMessageCircle />
        </div>
        <AnnouncementList />
      </div>
      <div class="flex h-full w-1/3 flex-col gap-8 rounded-md bg-durple-400 p-4 text-dark-50 shadow-md">
        <div class="flex w-full items-center justify-between">
          <p class="text-xl">Active warrants</p>
          <IconFileDescription />
        </div>
        <WarrantList />
      </div>
      <div class="flex h-full w-1/3 flex-col gap-8 rounded-md bg-durple-400 p-4 text-dark-50 shadow-md">
        <div class="flex w-full items-center justify-between">
          <p class="text-xl">Active calls</p>
          <IconPhoneCall />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
