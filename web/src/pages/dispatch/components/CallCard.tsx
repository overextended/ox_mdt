import React from 'react';
import { ActionIcon, Badge, createStyles, Divider, Group, rem, Stack, Text } from '@mantine/core';
import {
  IconCar,
  IconCheck,
  IconClock,
  IconEdit,
  IconHelicopter,
  IconLink,
  IconMapPin,
  IconMotorbike,
  IconTrash,
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  callContainer: {
    background: theme.colors.durple[5],
    boxShadow: theme.shadows.md,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
}));

const CallCard: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Stack className={classes.callContainer}>
      <Group position="apart">
        <Group spacing="xs">
          <Text>Drag racing</Text>
          <Badge variant="light" color="blue">
            10-94
          </Badge>
        </Group>
        <Group spacing="xs">
          <ActionIcon color="green" variant="light">
            <IconCheck size={20} />
          </ActionIcon>
          <ActionIcon color="blue" variant="light">
            <IconLink size={20} />
          </ActionIcon>
        </Group>
      </Group>
      <Stack spacing="xs" c="dark.2">
        <Group spacing="xs">
          <IconClock size={16} />
          <Text size="sm">3 minutes ago</Text>
        </Group>
        <Group spacing="xs">
          <IconMapPin size={16} />
          <Text size="sm">Strawberry Ave, Los Santos</Text>
        </Group>
      </Stack>
      <Divider label="Attached units (3)" labelPosition="center" />
      <Group>
        <Badge
          leftSection={
            <Stack>
              <IconCar size={18} />
            </Stack>
          }
        >
          Unit 1
        </Badge>
        <Badge
          leftSection={
            <Stack>
              <IconMotorbike size={18} />
            </Stack>
          }
        >
          Unit 2
        </Badge>
        <Badge
          leftSection={
            <Stack>
              <IconHelicopter size={18} />
            </Stack>
          }
        >
          Unit 3
        </Badge>
      </Group>
    </Stack>
  );
};

export default CallCard;
