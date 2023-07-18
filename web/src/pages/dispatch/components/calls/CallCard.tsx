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
import { Call, Officer } from '../../../../typings';
import dayjs from 'dayjs';
import { useDispatchMap, useSetActiveReport, useSetCalls, useSetIsReportActive } from '../../../../state';
import { modals } from '@mantine/modals';
import { useNavigate } from 'react-router-dom';
import { fetchNui } from '../../../../utils/fetchNui';
import locales from '../../../../locales';

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
  const map = useDispatchMap();
  const navigate = useNavigate();
  const setReport = useSetActiveReport();
  const setIsReportActive = useSetIsReportActive();

  return (
    <Stack className={classes.callContainer}>
      <Stack spacing={2}>
        <Group spacing="xs" position="apart" noWrap>
          <Text lineClamp={1}>{call.offense.label}</Text>
          {!call.completed ? (
            <>
              <Menu withArrow position="right-start">
                <Menu.Target>
                  <ActionIcon variant="light" color="blue">
                    <IconDots size={20} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item icon={<IconLink size={20} />}>{locales.attach_to_call}</Menu.Item>
                  <Menu.Item icon={<IconMapPin size={20} />}>{locales.set_waypoint}</Menu.Item>
                  <Menu.Item
                    icon={<IconMap2 size={20} />}
                    onClick={() => {
                      if (map) map.flyTo(call.coords, 4);
                    }}
                  >
                    {locales.find_on_map}
                  </Menu.Item>
                  <Menu.Item
                    icon={<IconCheck size={20} />}
                    onClick={() => {
                      modals.openConfirmModal({
                        title: locales.mark_call_as_completed,
                        children: (
                          <Text size="sm">
                            {locales.mark_call_as_completed_confirm.format(call.offense.label, call.offense.code)}
                          </Text>
                        ),
                        labels: { confirm: locales.confirm, cancel: locales.cancel },
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
                    {locales.mark_as_completed}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          ) : (
            <Tooltip label={locales.create_report}>
              <ActionIcon
                color="blue"
                variant="light"
                onClick={async () => {
                  const resp = await fetchNui<number>('createReport', null, { data: 199 });
                  navigate('/reports');
                  const officers: Officer[] = [];
                  call.units.map((unit) => unit.members.map((officer) => officers.push(officer)));
                  setReport({
                    title: `${call.offense.label} - ${dayjs(call.info.time).format('DD/MM/YYYY')}`,
                    description: '<p></p>',
                    id: resp,
                    evidence: [],
                    officersInvolved: officers,
                    criminals: [],
                  });
                  setIsReportActive(true);
                }}
              >
                <IconFileImport size={20} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
        <Badge variant="light" color="blue" sx={{ alignSelf: 'flex-start' }} radius="sm">
          {call.offense.code}
        </Badge>
      </Stack>
      <Stack spacing={2} c="dark.2">
        <Group spacing="xs">
          <IconClock size={16} />
          <Text size="sm">{dayjs(call.info.time).fromNow()}</Text>
        </Group>
        <Group spacing="xs" noWrap>
          <IconMapPin size={16} />
          <Text size="sm">{call.info.location}</Text>
        </Group>
      </Stack>
      {call.units.length > 0 && (
        <>
          <Divider
            label={locales[call.completed ? 'involved_units' : 'attached_units'].format(call.units.length)}
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
