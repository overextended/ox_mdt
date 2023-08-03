import React from 'react';
import { createStyles, Stack } from '@mantine/core';
import { Call } from '../../typings';
import DispatchNotification from './components/DispatchNotification';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { debugData } from '../../utils/debugData';

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
  {
    code: '10-70',
    id: 2,
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
  {
    code: '10-71',
    id: 3,
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

debugData<Call>(
  [
    {
      action: 'addCall',
      data: DEBUG_CALLS[0],
    },
  ],
  2000
);

debugData<Call>(
  [
    {
      action: 'addCall',
      data: DEBUG_CALLS[1],
    },
  ],
  3500
);

const Dispatch: React.FC = () => {
  const { classes } = useStyles();
  const [queue, setQueue] = React.useState<Call[]>([]);

  useNuiEvent('addCall', (data: Call) => {
    setQueue((prev) => [data, ...prev]);
  });

  useNuiEvent('editCall', (data: Call) => {
    setQueue((prev) => prev.map((prevCall) => (prevCall.id === data.id ? data : prevCall)));
  });

  return (
    <Stack className={classes.notificationsContainer} spacing={6}>
      {queue.map((call) => (
        <DispatchNotification call={call} key={call.id} setQueue={setQueue} />
      ))}
    </Stack>
  );
};

export default Dispatch;
