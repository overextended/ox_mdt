import React from 'react';
import { createStyles, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconReceipt } from '@tabler/icons-react';
import ReportsList from './components/list/ReportsList';
import ActiveReport from './components/ActiveReport';
import ListContainer from '../../components/ListContainer';
import { reportsListAtoms, useSetReportsDebounce } from '../../../../state';
import ListSearch from '../../components/ListSearch';
import locales from '../../../../locales';
import CreateReportButton from './components/list/CreateReportButton';
import { removePages } from '../../../../helpers';

const useStyles = createStyles((theme) => ({
  container: {
    overflow: 'hidden',
    height: '100%',
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
}));

const Reports: React.FC = () => {
  const { classes } = useStyles();
  const setDebouncedSearch = useSetReportsDebounce();

  React.useEffect(() => {
    return () => removePages(['reports']);
  }, []);

  return (
    <SimpleGrid h="100%" cols={3} sx={{ overflow: 'hidden' }} spacing="xs">
      <Stack className={classes.container} p="md">
        <Group position="apart">
          <Text size="xl">{locales.reports}</Text>
          <IconReceipt />
        </Group>
        <ListSearch setDebouncedValue={setDebouncedSearch} valueAtom={reportsListAtoms.currentValueAtom} />
        <CreateReportButton />
        <ListContainer
          ListComponent={ReportsList}
          setDebouncedSearch={setDebouncedSearch}
          debounceAtom={reportsListAtoms.isDebouncingAtom}
        />
      </Stack>
      <ActiveReport />
    </SimpleGrid>
  );
};

export default Reports;
