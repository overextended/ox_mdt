import React from 'react';
import { Avatar, Box, createStyles, Group, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import NotFound from '../../../components/NotFound';
import { IconFileOff } from '@tabler/icons-react';
import locales from '../../../locales';
import { useWarrants } from '../../../state/dashboard/warrants';

interface Warrant {
  firstName: string;
  lastName: string;
  expiresIn: number;
  reason: string;
}

const WARRANTS: Warrant[] = [
  {
    firstName: 'Spencer',
    lastName: 'Carr',
    expiresIn: 1682250523000,
    reason: 'Did some crime',
  },
  {
    firstName: 'Lennon',
    lastName: 'Herman',
    expiresIn: Date.now(),
    reason: 'Stole a cat',
  },
];

const useStyles = createStyles((theme) => ({
  warrantContainer: {
    backgroundColor: theme.colors.durple[4],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
}));

const WarrantList: React.FC = () => {
  const { classes } = useStyles();
  const warrants = useWarrants();

  // TODO: Clickable and redirect to report

  return (
    <Stack sx={{ overflow: 'auto' }}>
      {warrants.length > 0 ? (
        warrants.map((warrant) => (
          <Stack key={`${warrant.firstName} ${warrant.lastName}`} className={classes.warrantContainer} p="md">
            <Group>
              <Avatar size="lg" color="blue" radius="md" />
              <Stack spacing={2}>
                <Text>
                  {warrant.firstName} {warrant.lastName}
                </Text>
                <Text size="xs" c="dark.2">
                  {locales.expires_in}:{' '}
                  <Text component="span" c="dark.0">
                    {dayjs().to(warrant.expiresAt, true)}
                  </Text>
                </Text>
              </Stack>
            </Group>
          </Stack>
        ))
      ) : (
        <NotFound icon={IconFileOff} label={locales.no_active_warrants} />
      )}
    </Stack>
  );
};

export default WarrantList;
