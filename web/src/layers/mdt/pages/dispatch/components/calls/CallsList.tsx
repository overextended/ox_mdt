import React from 'react';
import { useCallTypeState, useFilteredCalls } from '../../../../../../state';
import CallCard from './CallCard';
import { Stack } from '@mantine/core';

const CallsList: React.FC = () => {
  const calls = useFilteredCalls();

  return (
    <Stack sx={{ overflowY: 'scroll', flex: '1 1 0' }}>
      {calls.map((call) => (
        <CallCard key={call.id} call={call} />
      ))}
    </Stack>
  );
};

export default CallsList;
