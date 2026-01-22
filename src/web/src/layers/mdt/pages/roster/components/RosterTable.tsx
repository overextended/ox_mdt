import React from 'react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { fetchNui } from '../../../../../utils/fetchNui';
import { Avatar, createStyles } from '@mantine/core';
import { RosterOfficer } from '../../../../../typings';
import locales from '../../../../../locales';
import RosterOfficerMenu from './RosterOfficerMenu';
import { useRosterRecordsState } from '../../../../../state/roster';
import { useIsRosterDebouncing, useRosterSearchDebouncedValue } from '../../../../../state/roster/tableSearch';

const DEBUG_DATA: RosterOfficer[] = [
  {
    stateId: 'AF32142',
    lastName: 'Doe',
    firstName: 'John',
    callSign: 132,
    position: [0, 0, 0],
    playerId: 1,
    title: 'LSPD Seargent',
    unitId: 3,
  },
  {
    stateId: 'QE32142',
    lastName: 'Doe',
    firstName: 'John',
    callSign: 132,
    position: [0, 0, 0],
    playerId: 1,
    title: 'BCSO Deputy',
    unitId: 3,
  },
  {
    stateId: 'CA92151',
    lastName: 'Doe',
    firstName: 'John',
    callSign: 132,
    position: [0, 0, 0],
    title: 'LSPD Lieutenant',
    playerId: 1,
    unitId: 3,
  },
];

const COLUMNS: DataTableColumn<RosterOfficer>[] = [
  {
    accessor: 'image',
    title: '',
    render: (record) => {
      return <Avatar color="blue" radius="md" size="lg" src={record.image} />;
    },
  },
  {
    accessor: 'name',
    title: locales.name,
    render: (record) => `${record.firstName} ${record.lastName}`,
  },
  {
    accessor: 'callSign',
    title: locales.call_sign,
    render: (record) => record.callSign || `-`,
  },
  {
    accessor: 'stateId',
    title: locales.state_id,
  },
  {
    accessor: 'title',
    title: locales.officer_rank,
  },
  {
    accessor: 'actions',
    title: '',
    render: (record) => <RosterOfficerMenu officer={record} />,
  },
];

const useStyles = createStyles((theme, params: { isEmpty: boolean }) => ({
  root: {
    backgroundColor: theme.colors.durple[6],
    '&& td': {
      backgroundColor: theme.colors.durple[params.isEmpty ? 6 : 5],
    },
  },
  header: {
    '&& th': {
      backgroundColor: theme.colors.durple[6],
    },
  },
  pagination: {
    backgroundColor: theme.colors.durple[6],
    button: {
      backgroundColor: theme.colors.durple[4],
      border: 'none',
      '&:not([data-active="true"]):hover': {
        backgroundColor: `${theme.colors.durple[2]} !important`,
      },
    },
  },
}));

const RosterTable: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [records, setRecords] = useRosterRecordsState();
  const [totalRecords, setTotalRecords] = React.useState(0);
  const { classes } = useStyles({ isEmpty: records.length === 0 });
  const isRosterDebouncing = useIsRosterDebouncing();
  const rosterSearchDebouncedValue = useRosterSearchDebouncedValue();

  React.useEffect(() => {
    setIsLoading(true);
    setPage(1);
    const fetchData = async () => {
      return await fetchNui<{ totalRecords: number; officers: RosterOfficer[] }>(
        'fetchRoster',
        { page: 1, search: rosterSearchDebouncedValue },
        {
          data: {
            totalRecords: DEBUG_DATA.length,
            officers: DEBUG_DATA,
          },
        }
      );
    };

    fetchData().then((resp) => {
      setRecords(resp.officers);
      setTotalRecords(resp.totalRecords);
      setIsLoading(false);
    });
  }, [rosterSearchDebouncedValue]);

  return (
    <DataTable
      classNames={{ ...classes }}
      idAccessor="stateId"
      columns={COLUMNS}
      records={records}
      totalRecords={totalRecords}
      borderRadius="md"
      shadow="md"
      withBorder={false}
      page={page}
      fetching={isLoading || isRosterDebouncing}
      noRecordsText={locales.no_records}
      onPageChange={async (newPage) => {
        setIsLoading(true);
        setPage(newPage);
        const resp = await fetchNui<{ totalRecords: number; officers: RosterOfficer[] }>(
          'fetchRoster',
          { page: newPage, search: rosterSearchDebouncedValue },
          { data: { totalRecords: 0, officers: DEBUG_DATA }, delay: 2000 }
        );
        setRecords(resp.officers);
        setIsLoading(false);
      }}
      recordsPerPage={9}
    />
  );
};

export default RosterTable;
