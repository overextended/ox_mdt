import React from 'react';
import { useCalls } from '../../../../../../state';
import CallCard from './CallCard';
import { Stack } from '@mantine/core';
import { useNuiEvent } from '../../../../../../hooks/useNuiEvent';
import { Call, UnitsObject } from '../../../../../../typings';
import { queryClient } from '../../../../../../main';
import { convertUnitsToArray } from '../../../../../../helpers';

const CallsList: React.FC = () => {
  const calls = useCalls();

  useNuiEvent('setCallUnits', (data: { id: number; units: UnitsObject }) => {
    queryClient.setQueriesData<Call[]>(['calls'], (oldData) => {
      if (!oldData) return;

      const callIndex = oldData.findIndex((call) => call.id === data.id);

      if (callIndex === -1) return;

      const units = convertUnitsToArray(data.units);

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
