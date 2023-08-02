import React from 'react';
import { createStyles, Stack } from '@mantine/core';
import { Call } from '../../typings';
import DispatchNotification from './components/DispatchNotification';

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

const Dispatch: React.FC = () => {
  const { classes } = useStyles();
  const [queue, setQueue] = React.useState<Call[]>(DEBUG_CALLS);

  return (
    <Stack className={classes.notificationsContainer} spacing={6}>
      {queue.map((call) => (
        <DispatchNotification call={call} key={call.id} />
      ))}
    </Stack>
  );
};

export default Dispatch;
