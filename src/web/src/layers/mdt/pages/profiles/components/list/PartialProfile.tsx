import React from 'react';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { PartialProfileData, Profile } from '../../../../../../typings';
import { DEBUG_PROFILE, useSetProfile } from '../../../../../../state';
import locales from '../../../../../../locales';
import { Avatar, Box, createStyles, Group, Stack, Text } from '@mantine/core';
import { useSetLoader } from '../../../../../../state/loader';
import dayjs from 'dayjs';

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

interface Props {
  profile: PartialProfileData;
}

const PartialProfile: React.ForwardRefRenderFunction<HTMLDivElement | null, Props> = ({ profile }, ref) => {
  const { classes } = useStyles();
  const setProfile = useSetProfile();
  const setLoaderModal = useSetLoader();

  return (
    <Box
      className={classes.profileContainer}
      ref={ref}
      p="md"
      onClick={async () => {
        setLoaderModal(true);
        const resp = await fetchNui<Profile>('getProfile', profile.stateId, {
          data: {
            ...DEBUG_PROFILE,
            firstName: profile.firstName,
            lastName: profile.lastName,
            stateId: profile.stateId,
          },
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
            {locales.date_of_birth}: {dayjs(profile.dob).format('YYYY/MM/DD')}
          </Text>
          <Text size="xs" c="dark.2">
            {locales.state_id}: {profile.stateId}
          </Text>
        </Stack>
      </Group>
    </Box>
  );
};

export default React.memo(React.forwardRef(PartialProfile));
