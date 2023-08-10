import React from 'react';
import { createStyles, Stack } from '@mantine/core';
import { Call, Unit } from '../../typings';
import DispatchNotification from './components/DispatchNotification';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { queryClient } from '../../main';
import { convertCall } from '../../utils/convertCalls';

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
    info: {
      plate: 'XYZ 123',
      location: 'Strawberry Ave',
      time: Date.now(),
      vehicle: 'Sultan RS',
    },
    completed: false,
    coords: [1, 1],
    linked: false,
    offense: 'Robbery of a financial institution',
    units: [],
  },
];

interface EditCallResponseData extends Omit<Call, 'units'> {
  units: { [key: string]: Omit<Unit, 'id'> };
}

const DispatchNotifications: React.FC = () => {
  const { classes } = useStyles();
  const [queue, setQueue] = React.useState<Call[]>([]);

  useNuiEvent('addCall', async (data: Call) => {
    setQueue((prev) => [data, ...prev]);
    // If the dispatch page isn't open on the MDT the queries won't be refetched
    await queryClient.invalidateQueries(['calls']);
  });

  useNuiEvent('editCall', async (data: EditCallResponseData) => {
    setQueue((prev) => prev.map((prevCall) => (prevCall.id === data.id ? convertCall(data) : prevCall)));
    await queryClient.invalidateQueries(['calls']);
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
