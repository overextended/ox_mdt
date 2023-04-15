import { Component } from 'solid-js';
import AnnouncementList from './AnnouncementList';
import { IconBrandTelegram, IconFileDescription, IconMessageCircle, IconPhoneCall } from '@tabler/icons-solidjs';
import WarrantList from './WarrantList';
import CallsList from './CallsList';

const Dashboard: Component = () => {
  return (
    <div class="flex h-full w-full items-center justify-center gap-4 p-4 font-main">
      <div class="flex h-full w-1/3 flex-col gap-8 rounded-md bg-durple-400 pr-0 text-dark-50 shadow-md">
        <div class="flex w-full items-center justify-between px-4 pt-4">
          <p class="text-xl">Announcements</p>
          <IconMessageCircle />
        </div>
        <AnnouncementList />
        <button class="flex h-24 w-full items-center justify-center gap-2 rounded-bl-md rounded-br-md bg-durple-200 text-dark-200 hover:bg-durple-100 hover:text-white disabled:bg-dark-400 disabled:text-dark-300">
          <IconBrandTelegram />
          Create a new announcement
        </button>
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
        <CallsList />
      </div>
    </div>
  );
};

export default Dashboard;
