import React from 'react';
import { Avatar, createStyles, Group, Stack, Text } from '@mantine/core';

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
  {
    firstName: 'Bob',
    lastName: 'Johnson',
    dob: '1993-09-22',
    playerId: 789012,
  },
  {
    firstName: 'Emily',
    lastName: 'Williams',
    dob: '1996-11-05',
    playerId: 'GHIJKL',
  },
  {
    firstName: 'James',
    lastName: 'Lee',
    dob: '1988-01-30',
    playerId: 345678,
  },
  {
    firstName: 'Samantha',
    lastName: 'Brown',
    dob: '1997-04-17',
    playerId: 'MNOPQR',
  },
  {
    firstName: 'David',
    lastName: 'Nguyen',
    dob: '1992-08-20',
    playerId: 901234,
  },
  {
    firstName: 'Avery',
    lastName: 'Kim',
    dob: '1987-02-10',
    playerId: 'STUVWX',
  },
  {
    firstName: 'Alex',
    lastName: 'Chen',
    dob: '1998-07-02',
    playerId: 567890,
  },
  {
    firstName: 'Ethan',
    lastName: 'Garcia',
    dob: '1995-12-25',
    playerId: 'YZABCD',
  },
  {
    firstName: 'Isabella',
    lastName: 'Martinez',
    dob: '1991-10-08',
    playerId: 234567,
  },
  {
    firstName: 'William',
    lastName: 'Hernandez',
    dob: '1994-05-01',
    playerId: 'EFGHIJ',
  },
  {
    firstName: 'Olivia',
    lastName: 'Gonzalez',
    dob: '1989-03-18',
    playerId: 890123,
  },
  {
    firstName: 'Mason',
    lastName: 'Lopez',
    dob: '1999-06-11',
    playerId: 'KLMNOP',
  },
  {
    firstName: 'Sophia',
    lastName: 'Perez',
    dob: '1996-01-24',
    playerId: 456789,
  },
  {
    firstName: 'Jacob',
    lastName: 'Rodriguez',
    dob: '1993-09-07',
    playerId: 'QRSTUW',
  },
  {
    firstName: 'Emma',
    lastName: 'Jackson',
    dob: '1997-04-30',
    playerId: 123456,
  },
  {
    firstName: 'Noah',
    lastName: 'Campbell',
    dob: '1992-11-23',
    playerId: 'VWXYZA',
  },
  {
    firstName: 'Ava',
    lastName: 'Green',
    dob: '1988-08-06',
    playerId: 678901,
  },
  {
    firstName: 'Liam',
    lastName: 'Taylor',
    dob: '1991-12-19',
    playerId: 'BCDEFG',
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
    <Stack sx={{ overflowY: 'auto' }}>
      {PROFILES.map((profile) => (
        <Stack className={classes.profileContainer} p="md">
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
        </Stack>
      ))}
    </Stack>
  );
};

export default ProfilesList;
