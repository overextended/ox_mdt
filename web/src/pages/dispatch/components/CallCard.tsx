import React from 'react';
import { ActionIcon, Badge, createStyles, Divider, Group, Menu, Stack, Text, Tooltip } from '@mantine/core';
import {
  IconCar,
  IconCheck,
  IconClock,
  IconDots,
  IconFileImport,
  IconHelicopter,
  IconLink,
  IconMap2,
  IconMapPin,
  IconMotorbike,
  IconSpeedboat,
} from '@tabler/icons-react';
import { Call } from '../../../typings';
import dayjs from 'dayjs';
import { useSetCalls } from '../../../state/dispatch';
import { modals } from '@mantine/modals';

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
  const setCalls = useSetCalls();

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
              <Menu withArrow position="right-start">
                <Menu.Target>
                  <ActionIcon variant="light" color="blue">
                    <IconDots size={20} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item icon={<IconLink size={20} />}>Attach to call</Menu.Item>
                  <Menu.Item icon={<IconMapPin size={20} />}>Set waypoint</Menu.Item>
                  <Menu.Item icon={<IconMap2 size={20} />}>Find on map</Menu.Item>
                  <Menu.Item
                    icon={<IconCheck size={20} />}
                    onClick={() => {
                      modals.openConfirmModal({
                        title: 'Mark call as completed?',
                        children: (
                          <Text size="sm">
                            Mark {call.offense.label} ({call.offense.code}) as completed?
                          </Text>
                        ),
                        labels: { confirm: 'Confirm', cancel: 'Cancel' },
                        confirmProps: { variant: 'light' },
                        onConfirm: () => {
                          setCalls((prev) => {
                            const calls = [...prev];
                            const callIndex = calls.findIndex((value) => value.id === call.id);

                            calls[callIndex] = { ...prev[callIndex], completed: true };

                            return calls;
                          });
                        },
                      });
                    }}
                  >
                    Mark as completed
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
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
      <Stack spacing={2} c="dark.2">
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
                key={unit.name}
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
