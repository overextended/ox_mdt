import React from 'react';
import { createStyles, Stack, Text, Badge, Group, Box, ActionIcon, Divider } from '@mantine/core';
import { IconCar, IconClock, IconLink, IconMap2, IconMapPin, IconPin } from '@tabler/icons-react';
import dayjs from 'dayjs';

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

const Dispatch: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Stack className={classes.notificationsContainer} spacing={6}>
      <Stack className={classes.notification} spacing={6}>
        <Stack spacing={0}>
          <Group position="apart">
            <Text size="lg">Robbery of a financial institution</Text>
            <Group spacing={6}>
              <ActionIcon variant="light" color="blue">
                <IconLink size={20} />
              </ActionIcon>
              <ActionIcon variant="light" color="blue">
                <IconMapPin size={20} />
              </ActionIcon>
            </Group>
          </Group>
          <Badge variant="light" color="blue" sx={{ alignSelf: 'flex-start' }} radius="sm">
            10-24
          </Badge>
        </Stack>
        <Divider />
        <Group>
          <Group c="dark.2" spacing={6}>
            <IconMap2 size={20} />
            <Text size="sm">Strawberry Ave</Text>
          </Group>
          <Group c="dark.2" spacing={6}>
            <IconClock size={20} />
            <Text size="sm">{dayjs().fromNow()}</Text>
          </Group>
          <Group c="dark.2" spacing={6}>
            <IconCar size={20} />
            <Text size="sm">XYZ 123</Text>
          </Group>
        </Group>
      </Stack>
    </Stack>
  );
};

export default Dispatch;
