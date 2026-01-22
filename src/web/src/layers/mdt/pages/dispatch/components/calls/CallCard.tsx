import React from 'react';
import { ActionIcon, Badge, createStyles, Divider, Group, Stack, Text, Tooltip } from '@mantine/core';
import { IconClock, IconFileImport, IconMap2 } from '@tabler/icons-react';
import { Call, Officer } from '../../../../../../typings';
import dayjs from 'dayjs';
import { useCharacter, useSetActiveReport, useSetIsReportActive } from '../../../../../../state';
import { useNavigate } from 'react-router-dom';
import { fetchNui } from '../../../../../../utils/fetchNui';
import locales from '../../../../../../locales';
import CallActionMenu from './CallActionMenu';
import UnitBadge from '../../../../components/UnitBadge';
import { useSetLoader } from '../../../../../../state/loader';
import { hasPermission } from '../../../../../../helpers';

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
  const setLoaderModal = useSetLoader();
  const character = useCharacter();

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
                disabled={!hasPermission(character, 'create_report')}
                onClick={async () => {
                  setLoaderModal(true);
                  const resp = await fetchNui<number>(
                    'createReport',
                    `${call.offense} - ${dayjs(call.time).format('YYYY/MM/DD')}`,
                    { data: 199 }
                  );
                  navigate('/reports');
                  const officers: Officer[] = [];
                  call.units.map((unit) => unit.members.map((officer) => officers.push(officer)));
                  setReport({
                    title: `${call.offense} - ${dayjs(call.time).format('YYYY/MM/DD')}`,
                    description: '<p></p>',
                    id: resp,
                    evidence: [],
                    officersInvolved: officers,
                    criminals: [],
                  });
                  setIsReportActive(true);
                  setLoaderModal(false);
                }}
              >
                <IconFileImport size={20} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
        <Badge variant="light" color={call.isEmergency ? 'red' : 'blue'} sx={{ alignSelf: 'flex-start' }} radius="sm">
          {call.code}
        </Badge>
      </Stack>
      <Stack spacing={2} c="dark.2">
        <Group spacing="xs">
          <IconClock size={16} />
          <Text size="sm">{dayjs(call.time).fromNow()}</Text>
        </Group>
        <Group spacing="xs" noWrap>
          <IconMap2 size={16} />
          <Text size="sm">{call.location}</Text>
        </Group>
        {call.info &&
          call.info.length > 0 &&
          call.info.map((info) => (
            <Group spacing="xs" key={info.label}>
              <i className={`ti ti-${info.icon}`} style={{ fontSize: 16 }} />
              <Text size="sm">{info.label}</Text>
            </Group>
          ))}
      </Stack>
      {call.units.length > 0 && (
        <>
          <Divider
            label={locales[call.completed ? 'involved_units' : 'attached_units'].format(call.units.length)}
            labelPosition="center"
          />
          <Group spacing="xs">
            {call.units.map((unit) => (
              <UnitBadge unit={unit} key={unit.id} />
            ))}
          </Group>
        </>
      )}
    </Stack>
  );
};

export default React.memo(CallCard);
