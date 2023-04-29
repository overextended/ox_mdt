import React from 'react';
import { Avatar, Box, createStyles, Group, Stack, Text } from '@mantine/core';

interface ProfileCard {
  firstName: string;
  lastName: string;
  dob: string;
  playerId: number | string;
}

const PROFILES: ProfileCard[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    dob: '1990-06-15',
    playerId: 123456,
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    dob: '1985-03-12',
    playerId: 'ABCDEF',
  },
];

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

  return (
    <Stack sx={{ overflowY: 'auto' }} spacing="sm">
      {PROFILES.map((profile) => (
        <Box
          key={`${profile.playerId}`}
          className={classes.profileContainer}
          p="md"
          onClick={() => {
            //   Fetch data
            //   Set profile
          }}
        >
          <Group>
            <Avatar color="blue" radius="md" size="lg" />
            <Stack spacing={0}>
              <Text size="sm">
                {profile.firstName} {profile.lastName}
              </Text>
              <Text size="xs" c="dark.2">
                DOB: {profile.dob}
              </Text>
              <Text size="xs" c="dark.2">
                ID: {profile.playerId}
              </Text>
            </Stack>
          </Group>
        </Box>
      ))}
    </Stack>
  );
};

export default ProfilesList;
