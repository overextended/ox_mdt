import React from 'react';
import { createStyles, Stack } from '@mantine/core';
import { Call, Unit } from '../../typings';
import DispatchNotification from './components/DispatchNotification';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { queryClient } from '../../main';
import { convertUnitsToArray } from '../../helpers';

const useStyles = createStyles((theme) => ({
  notificationsContainer: {
    right: 0,
    top: 0,
    justifyContent: 'right',
    alignItems: 'center',
    position: 'absolute',
    width: 500,
    height: '100%',
    padding: theme.spacing.md,
    zIndex: 0,
  },
}));

const DEBUG_CALLS: Call[] = [
  {
    code: '10-69',
    id: 1,
    time: Date.now(),
    location: 'Strawberry Ave',
    info: [
      { label: 'Sultan RS', icon: 'car' },
      { label: 'XYZ 123', icon: 'badge-tm' },
    ],
    completed: false,
    blip: 51,
    coords: [1, 1],
    linked: false,
    offense: 'Robbery of a financial institution',
    units: [],
  },
];

type EditCallResponseData = { units: { [key: string]: Omit<Unit, 'id'> }; id: number };

const DispatchNotifications: React.FC = () => {
  const { classes } = useStyles();
  const [queue, setQueue] = React.useState<Call[]>([]);

  useNuiEvent('addCall', async (data: Call) => {
    setQueue((prev) => [data, ...prev]);
    // If the dispatch page isn't open on the MDT the queries won't be refetched
    queryClient.setQueriesData<Call[]>(['calls'], (oldData) => {
      if (!oldData) return;

      return [data, ...oldData];
    });
  });

  useNuiEvent('editCallUnits', async (data: EditCallResponseData) => {
    const units = convertUnitsToArray(data.units);
    setQueue((prev) => prev.map((prevCall) => (prevCall.id === data.id ? { ...prevCall, units } : prevCall)));
    queryClient.setQueriesData<Call[]>(['calls'], (oldData) => {
      if (!oldData) return;

      const callIndex = oldData.findIndex((oldCall) => oldCall.id === data.id);

      if (callIndex === -1) return;

      const newData = [...oldData];

      newData[callIndex] = {
        ...newData[callIndex],
        units,
      };

      return newData;
    });
  });

  return (
    <Stack className={classes.notificationsContainer} spacing={6}>
      {queue.map((call) => (
        <DispatchNotification call={call} key={call.id} setQueue={setQueue} />
      ))}
    </Stack>
  );
};

export default DispatchNotifications;
