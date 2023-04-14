import { IconPhoneOff } from '@tabler/icons-solidjs';
import { Component } from 'solid-js';

const CallsList: Component = () => {
  return (
    <div class="flex h-full flex-col items-center justify-center text-2xl text-dark-200">
      <IconPhoneOff size={36} />
      <p>No active calls</p>
    </div>
  );
};

export default CallsList;
