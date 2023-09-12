import React from 'react';
import { Button, createStyles, Group, Stack, TextInput } from '@mantine/core';
import { IconSearch, IconUserPlus } from '@tabler/icons-react';
import locales from '../../../../locales';
import RosterTable from './components/RosterTable';
import { modals } from '@mantine/modals';
import HireOfficerModal from './components/modals/HireOfficerModal';

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

  return (
    <Stack spacing="xs" h="100%">
      <Group p="xs" className={classes.searchContainer} noWrap spacing="xs">
        <TextInput placeholder={locales.search} icon={<IconSearch size={20} />} sx={{ flex: '1 0 0' }} />
        <Button
          variant="light"
          leftIcon={<IconUserPlus size={20} />}
          onClick={() => modals.open({ title: locales.hire_officer, size: 'xs', children: <HireOfficerModal /> })}
        >
          {locales.hire_officer}
        </Button>
      </Group>
      <RosterTable />
    </Stack>
  );
};

export default Roster;
