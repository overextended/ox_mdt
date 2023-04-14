import { Component } from 'solid-js';
import AnnouncementList from './AnnouncementList';

const Dashboard: Component = () => {
  return (
    <div class="flex h-full w-full items-center justify-center gap-4 p-4 font-main">
      <div class="flex h-full w-1/3 flex-col gap-8 rounded-md bg-durple-400 p-4 text-dark-50 shadow-md">
        <div>Announcements</div>
        <AnnouncementList />
      </div>
      <div class="flex h-full w-1/3 flex-col rounded-md bg-durple-400 p-4 text-dark-50 shadow-md">
        <div>Active warrants</div>
      </div>
      <div class="flex h-full w-1/3 flex-col rounded-md bg-durple-400 p-4 text-dark-50 shadow-md">
        <div>Active calls</div>
      </div>
    </div>
  );
};

export default Dashboard;
