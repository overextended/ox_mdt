import React from 'react';
import { Call } from '../../../typings';
import { Badge, createStyles, Divider, Group, SimpleGrid, Stack, Text, Transition } from '@mantine/core';
import { IconBadgeTm, IconCar, IconClock, IconMap2 } from '@tabler/icons-react';
import dayjs from 'dayjs';
import NotificationInfo from './NotificationInfo';
import { useTimeout } from '@mantine/hooks';
import locales from '../../../locales';
import UnitBadge from '../../mdt/components/UnitBadge';
import NotificationControls from './NotificationControls';

interface Props {
  call: Call;
  setQueue: React.Dispatch<React.SetStateAction<Call[]>>;
}

const useStyles = createStyles((theme) => ({
  notification: {
    width: '100%',
    height: 'fit-content',
    backgroundColor: theme.colors.durple[6],
    color: theme.colors.dark[0],
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    opacity: 1,
    boxShadow: theme.shadows.md,
    zIndex: 0,
  },
}));

const DispatchNotification: React.FC<Props> = ({ call, setQueue }) => {
  const { classes } = useStyles();
  const [mounted, setMounted] = React.useState(false);
  const timeout = useTimeout(() => setMounted(false), 8000, {
    autoInvoke: true,
  });

  React.useEffect(() => {
    setMounted(true);
    return () => timeout.clear();
  }, []);

  return (
    <Transition
      mounted={mounted}
      transition="slide-left"
      onExited={() => setQueue((prev) => prev.filter((prevCall) => prevCall.id !== call.id))}
    >
      {(style) => (
        <Stack className={classes.notification} spacing={6} style={style}>
          <Group position="apart">
            <Group spacing="xs">
              <Badge variant="light" color="blue" radius="sm">
                {call.code}
              </Badge>
              <Text>{call.offense}</Text>
            </Group>
            <NotificationControls call={call} />
          </Group>
          <Divider />
          <SimpleGrid cols={2} spacing="xs">
            <NotificationInfo label={dayjs(call.info.time).fromNow()} icon={IconClock} />
            <NotificationInfo icon={IconMap2} label={call.info.location} />
            {call.info.vehicle && <NotificationInfo icon={IconCar} label={call.info.vehicle} />}
            {call.info.plate && <NotificationInfo icon={IconBadgeTm} label={call.info.plate} />}
          </SimpleGrid>
          {call.units.length > 0 && (
            <>
              <Divider label={`${locales.attached_units}`.format(call.units.length)} labelPosition="center" />
              <Group spacing="xs">
                {call.units.map((unit) => (
                  <UnitBadge unit={unit} key={unit.id} />
                ))}
              </Group>
            </>
          )}
        </Stack>
      )}
    </Transition>
  );
};

export default React.memo(DispatchNotification);
