import React from 'react';
import { useCalls } from '../../../../../../state';
import CallCard from './CallCard';
import { Stack } from '@mantine/core';
import { useNuiEvent } from '../../../../../../hooks/useNuiEvent';
import { Call, Unit } from '../../../../../../typings';
import { queryClient } from '../../../../../../main';

const CallsList: React.FC = () => {
  const calls = useCalls();

  useNuiEvent('setCallUnits', (data: { id: number; units: { [key: string]: Omit<Unit, 'id'> } }) => {
    queryClient.setQueriesData<Call[]>(['calls'], (oldData) => {
      if (!oldData) return;

      const callIndex = oldData.findIndex((call) => call.id === data.id);

      if (callIndex === -1) return;

      const units = Object.entries(data.units).map((unit) => ({ id: +unit[0], ...unit[1] }));

      const newData = [...oldData];

      newData[callIndex] = {
        ...newData[callIndex],
        units,
      };

      return newData;
    });
  });

  return (
    <Stack sx={{ overflowY: 'scroll', flex: '1 1 0' }}>
      {calls.map((call) => (
        <CallCard key={call.id} call={call} />
      ))}
    </Stack>
  );
};

export default CallsList;
