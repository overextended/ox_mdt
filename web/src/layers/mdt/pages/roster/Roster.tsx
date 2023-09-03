import React from 'react';
import { Box, createStyles, Stack, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import locales from '../../../../locales';
import RosterTable from './components/RosterTable';

const useStyles = createStyles((theme) => ({
  searchContainer: {
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
}));

const Roster: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Stack spacing="xs" h="100%">
      <Box p="xs" className={classes.searchContainer}>
        <TextInput placeholder={locales.search} icon={<IconSearch />} size="lg" />
      </Box>
      <RosterTable />
    </Stack>
  );
};

export default Roster;
