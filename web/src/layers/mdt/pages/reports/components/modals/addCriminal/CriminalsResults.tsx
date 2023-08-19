import React from 'react';
import { useCriminalProfiles, useReportId, useSetCriminals } from '../../../../../../../state';
import { Avatar, createStyles, Group, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconUserX } from '@tabler/icons-react';
import { fetchNui } from '../../../../../../../utils/fetchNui';
import NotFound from '../../../../../components/NotFound';
import locales from '../../../../../../../locales';

const useStyles = createStyles((theme) => ({
  profileContainer: {
    backgroundColor: theme.colors.durple[4],
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    boxShadow: theme.shadows.md,
    '&:hover': {
      backgroundColor: theme.colors.durple[2],
      cursor: 'pointer',
    },
  },
}));

const CriminalsResults: React.FC = () => {
  const { classes } = useStyles();
  const profiles = useCriminalProfiles();
  const setCriminals = useSetCriminals();
  const id = useReportId();

  return (
    <Stack sx={{ overflowY: 'scroll' }} spacing="sm">
      <>
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <Group
              className={classes.profileContainer}
              key={profile.stateId}
              onClick={async () => {
                await fetchNui('addCriminal', { id, criminalId: profile.stateId }, { data: 1 });
                modals.closeAll();
                setCriminals((prev) => [
                  ...prev,
                  {
                    stateId: profile.stateId,
                    dob: profile.dob,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    image: profile.image,
                    charges: [],
                    issueWarrant: false,
                    pleadedGuilty: false,
                    processed: false,
                    penalty: { time: 0, reduction: 0, points: 0, fine: 0 },
                  },
                ]);
              }}
            >
              <Avatar variant="light" color="blue" size="lg" src={profile.image} />
              <Stack spacing={0}>
                <Text>
                  {profile.firstName} {profile.lastName}
                </Text>
                <Text size="xs" c="dark.2">
                  {locales.date_of_birth}: {profile.dob}
                </Text>
                <Text size="xs" c="dark.2">
                  {locales.state_id}: {profile.stateId}
                </Text>
              </Stack>
            </Group>
          ))
        ) : (
          <NotFound icon={IconUserX} label={locales.no_profiles_found} />
        )}
      </>
    </Stack>
  );
};

export default CriminalsResults;
