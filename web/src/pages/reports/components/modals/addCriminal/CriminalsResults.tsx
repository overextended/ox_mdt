import React from 'react';
import { useCriminalProfiles } from '../../../../../state';
import { Avatar, createStyles, Group, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useSetCriminals } from '../../../../../state';
import { IconUserX } from '@tabler/icons-react';

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

  return (
    <Stack sx={{ overflowY: 'scroll' }} spacing="sm">
      <>
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <Group
              className={classes.profileContainer}
              key={profile.id}
              onClick={() => {
                modals.closeAll();
                setCriminals((prev) => [
                  ...prev,
                  {
                    name: `${profile.firstName} ${profile.lastName}`,
                    id: profile.id,
                    charges: [],
                    issueWarrant: false,
                    pleadedGuilty: false,
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
                  DOB: {profile.dob}
                </Text>
                <Text size="xs" c="dark.2">
                  ID: {profile.id}
                </Text>
              </Stack>
            </Group>
          ))
        ) : (
          <Stack justify="center" align="center" spacing={0} c="dark.2">
            <IconUserX size={36} />
            <Text size="xl">No profiles found</Text>
          </Stack>
        )}
      </>
    </Stack>
  );
};

export default CriminalsResults;
