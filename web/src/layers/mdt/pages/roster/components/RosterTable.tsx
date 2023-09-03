import React from 'react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { fetchNui } from '../../../../../utils/fetchNui';
import { ActionIcon, Avatar, createStyles, Group } from '@mantine/core';
import { RosterOfficer } from '../../../../../typings';
import { IconSettings } from '@tabler/icons-react';

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
    render: (record) => `${record.firstName} ${record.lastName}`,
  },
  {
    accessor: 'callSign',
  },
  {
    accessor: 'stateId',
    title: 'State ID',
  },
  {
    accessor: 'title',
  },
  {
    accessor: 'actions',
    title: '',
    render: (record) => {
      return (
        <Group position="center">
          <ActionIcon variant="light" size="lg" color="blue">
            <IconSettings />
          </ActionIcon>
        </Group>
      );
    },
  },
];

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.durple[6],
    '&& td': {
      backgroundColor: theme.colors.durple[5],
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
  const { classes } = useStyles();
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [records, setRecords] = React.useState<RosterOfficer[]>([]);
  const [totalRecords, setTotalRecords] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      return await fetchNui<{ totalRecords: number; data: RosterOfficer[] }>('getInitialRosterPage', null, {
        data: { totalRecords: 9, data: DEBUG_DATA },
        delay: 2000,
      });
    };

    fetchData().then((resp) => {
      setRecords(resp.data);
      setTotalRecords(resp.totalRecords);
      setIsLoading(false);
    });
  }, []);

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
      fetching={isLoading}
      onPageChange={async (newPage) => {
        setIsLoading(true);
        setPage(newPage);
        const resp = await fetchNui('getRosterPage', newPage, { data: DEBUG_DATA, delay: 2000 });
        setRecords(resp);
        setIsLoading(false);
      }}
      recordsPerPage={9}
    />
  );
};

export default RosterTable;
