import React from 'react';
import { Avatar, Box, createStyles, Group, Stack, Text } from '@mantine/core';
import { DEBUG_PROFILE, useProfilesList, useSetProfile } from '../../../state';
import { fetchNui } from '../../../utils/fetchNui';
import profile from './Profile';
import NotFound from '../../../components/NotFound';
import { IconUserOff } from '@tabler/icons-react';
import { Profile } from '../../../typings';
import { modals } from '@mantine/modals';
import { useSetLoader } from '../../../state/loader';
import locales from '../../../locales';

const useStyles = createStyles((theme) => ({
  profileContainer: {
    backgroundColor: theme.colors.durple[4],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    '&:hover': {
      backgroundColor: theme.colors.durple[2],
      cursor: 'pointer',
    },
  },
}));

const ProfilesList: React.FC = () => {
  const { classes } = useStyles();
  const profiles = useProfilesList();
  const setProfile = useSetProfile();
  const setLoaderModal = useSetLoader();

  return (
    <Stack sx={{ overflowY: 'auto' }} spacing="sm">
      {profiles.length > 0 ? (
        profiles.map((profile) => (
          <Box
            key={`${profile.stateId}`}
            className={classes.profileContainer}
            p="md"
            onClick={async () => {
              setLoaderModal(true);
              const resp = await fetchNui<Profile>('getProfile', profile.stateId, {
                data: { ...DEBUG_PROFILE, firstName: profile.firstName, lastName: profile.lastName },
              });
              setProfile(resp);
              setLoaderModal(false);
            }}
          >
            <Group>
              <Avatar color="blue" radius="md" size="lg" src={profile.image} />
              <Stack spacing={0}>
                <Text size="sm">
                  {profile.firstName} {profile.lastName}
                </Text>
                <Text size="xs" c="dark.2">
                  DOB: {new Date(profile.dob).toLocaleDateString()}
                </Text>
                <Text size="xs" c="dark.2">
                  ID: {profile.stateId}
                </Text>
              </Stack>
            </Group>
          </Box>
        ))
      ) : (
        <NotFound icon={IconUserOff} label={locales.no_profiles_found}/>
      )}
    </Stack>
  );
};

export default ProfilesList;
