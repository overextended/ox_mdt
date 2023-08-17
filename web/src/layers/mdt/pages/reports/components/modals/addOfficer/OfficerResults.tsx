import React from 'react';
import { useOfficers, useReportId, useSetOfficersInvolved } from '../../../../../../../state';
import { createStyles, Group, Stack, Text } from '@mantine/core';
import { IconUserX } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { fetchNui } from '../../../../../../../utils/fetchNui';
import NotFound from '../../../../../components/NotFound';
import locales from '../../../../../../../locales';

const useStyles = createStyles((theme) => ({
  officerContainer: {
    backgroundColor: theme.colors.durple[4],
    boxShadow: theme.shadows.md,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    '&:hover': {
      backgroundColor: theme.colors.durple[2],
      cursor: 'pointer',
    },
  },
}));

const OfficerResults: React.FC = () => {
  const officers = useOfficers();
  const id = useReportId();
  const setOfficersInvolved = useSetOfficersInvolved();
  const { classes } = useStyles();

  return (
    <Stack spacing="sm">
      {officers.length > 0 ? (
        officers.map((officer) => (
          <Group
            key={officer.stateId}
            className={classes.officerContainer}
            position="apart"
            onClick={async () => {
              await fetchNui('addOfficer', { id, stateId: officer.stateId }, { data: 1 });
              modals.closeAll();
              setOfficersInvolved((prev) => [
                ...prev,
                {
                  firstName: officer.firstName,
                  lastName: officer.lastName,
                  callSign: officer.callSign,
                  stateId: officer.stateId,
                  playerId: officer.playerId,
                  position: [1, 1, 1],
                },
              ]);
            }}
          >
            <Text>
              {officer.firstName} {officer.lastName}
            </Text>
            <Text c="dark.2">{officer.callSign || ''}</Text>
          </Group>
        ))
      ) : (
        <NotFound icon={IconUserX} label={locales.no_officers_found} />
      )}
    </Stack>
  );
};

export default OfficerResults;
