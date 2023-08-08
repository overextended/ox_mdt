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
import { Call, Officer } from '../../../../../../typings';
import dayjs from 'dayjs';
import { useSetActiveReport, useSetIsReportActive } from '../../../../../../state';
import { useNavigate } from 'react-router-dom';
import { fetchNui } from '../../../../../../utils/fetchNui';
import locales from '../../../../../../locales';
import CallActionMenu from './CallActionMenu';

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
  const navigate = useNavigate();
  const setReport = useSetActiveReport();
  const setIsReportActive = useSetIsReportActive();

  return (
    <Stack className={classes.callContainer}>
      <Stack spacing={2}>
        <Group spacing="xs" position="apart" noWrap>
          <Text lineClamp={1}>{call.offense}</Text>
          {!call.completed ? (
            <CallActionMenu call={call} />
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
                    title: `${call.offense} - ${dayjs(call.info.time).format('DD/MM/YYYY')}`,
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
          {call.code}
        </Badge>
      </Stack>
      <Stack spacing={2} c="dark.2">
        <Group spacing="xs">
          <IconClock size={16} />
          <Text size="sm">{dayjs(call.info.time).fromNow()}</Text>
        </Group>
        <Group spacing="xs" noWrap>
          <IconMap2 size={16} />
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

export default React.memo(CallCard);
