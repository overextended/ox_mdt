import React from 'react';
import { ActionIcon, Badge, createStyles, Divider, Group, Stack, Text, Tooltip } from '@mantine/core';
import {
  IconCar,
  IconCheck,
  IconClock,
  IconFileImport,
  IconHelicopter,
  IconLink,
  IconMapPin,
  IconMotorbike,
  IconSpeedboat,
} from '@tabler/icons-react';
import { Call } from '../../../typings';
import dayjs from 'dayjs';

const useStyles = createStyles((theme) => ({
  callContainer: {
    background: theme.colors.durple[5],
    boxShadow: theme.shadows.md,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
}));

const CallCard: React.FC<{ call: Call }> = ({ call }) => {
  const { classes } = useStyles();

  return (
    <Stack className={classes.callContainer}>
      <Group position="apart">
        <Group spacing="xs">
          <Text>{call.offense.label}</Text>
          <Badge variant="light" color="blue">
            {call.offense.code}
          </Badge>
        </Group>
        <Group spacing="xs">
          {!call.completed ? (
            <>
              <Tooltip label="Mark as completed">
                <ActionIcon color="green" variant="light">
                  <IconCheck size={20} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Attach to call">
                <ActionIcon color="blue" variant="light">
                  <IconLink size={20} />
                </ActionIcon>
              </Tooltip>
            </>
          ) : (
            <Tooltip label="Create report">
              <ActionIcon color="blue" variant="light">
                <IconFileImport size={20} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      </Group>
      <Stack spacing="xs" c="dark.2">
        <Group spacing="xs">
          <IconClock size={16} />
          <Text size="sm">{dayjs(call.info.time).fromNow()}</Text>
        </Group>
        <Group spacing="xs">
          <IconMapPin size={16} />
          <Text size="sm">{call.info.location}</Text>
        </Group>
      </Stack>
      {call.units.length > 0 && (
        <>
          <Divider
            label={`${call.completed ? 'Involved' : 'Attached'} units (${call.units.length})`}
            labelPosition="center"
          />
          <Group spacing="xs">
            {call.units.map((unit) => (
              <Badge
                leftSection={
                  <Stack>
                    {unit.type === 'car' ? (
                      <IconCar size={18} />
                    ) : unit.type === 'motor' ? (
                      <IconMotorbike size={18} />
                    ) : unit.type === 'boat' ? (
                      <IconSpeedboat size={18} />
                    ) : (
                      <IconHelicopter size={18} />
                    )}
                  </Stack>
                }
              >
                {unit.name}
              </Badge>
            ))}
          </Group>
        </>
      )}
    </Stack>
  );
};

export default CallCard;
