import React from 'react';
import { Box, Button, createStyles, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconFileImport, IconReceipt } from '@tabler/icons-react';
import ReportsList from './components/ReportsList';
import { modals } from '@mantine/modals';
import CreateReportModal from './components/modals/CreateReportModal';
import ActiveReport from './components/ActiveReport';
import ListContainer from '../../components/ListContainer';
import { reportsListAtoms, useSetReportsDebounce } from '../../../../state';
import ListSearch from '../../components/ListSearch';
import { queryClient } from '../../../../main';
import { PartialReportData } from '../../../../typings';
import locales from '../../../../locales';

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
    return () => {
      queryClient.setQueriesData<{ pages: PartialReportData[][]; pageParams: number[] }>(['reports'], (data) => {
        if (!data) return;

        return {
          pages: [data.pages[0]],
          pageParams: [data.pageParams[0]],
        };
      });
    };
  }, []);

  return (
    <SimpleGrid h="100%" cols={3} sx={{ overflow: 'hidden' }} spacing="xs">
      <Stack className={classes.container} p="md">
        <Group position="apart">
          <Text size="xl">{locales.reports}</Text>
          <IconReceipt />
        </Group>
        <ListSearch setDebouncedValue={setDebouncedSearch} valueAtom={reportsListAtoms.currentValueAtom} />
        <Box>
          <Button
            fullWidth
            variant="light"
            leftIcon={<IconFileImport size={20} />}
            onClick={() => modals.open({ title: locales.create_report, size: 'sm', children: <CreateReportModal /> })}
          >
            {locales.create_report}
          </Button>
        </Box>
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
