import React from 'react';
import { createStyles, Group, Stack } from '@mantine/core';
import locales from '../../../../locales';
import RosterTable from './components/RosterTable';
import ListSearch from '../../components/ListSearch';
import { tableSearchAtoms, useSetRosterSearchDebounce } from '../../../../state/roster/tableSearch';
import HireOfficerButton from './components/HireOfficerButton';

const useStyles = createStyles((theme) => ({
  searchContainer: {
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    width: '100%',
  },
}));

const Roster: React.FC = () => {
  const { classes } = useStyles();
  const setRosterDebounce = useSetRosterSearchDebounce();

  return (
    <Stack spacing="xs" h="100%">
      <Group p="xs" className={classes.searchContainer} noWrap spacing="xs">
        <ListSearch
          placeholder={locales.search_officers}
          setDebouncedValue={setRosterDebounce}
          valueAtom={tableSearchAtoms.currentValueAtom}
          style={{ flex: '1 0 0' }}
        />
        <HireOfficerButton />
      </Group>
      <RosterTable />
    </Stack>
  );
};

export default Roster;
