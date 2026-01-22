import { Button, Select, Stack } from '@mantine/core';
import React from 'react';
import locales from '../../../../../../locales';
import { RosterOfficer } from '../../../../../../typings';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { useSetRosterRecords } from '../../../../../../state/roster';
import { modals } from '@mantine/modals';

interface Props {
  officer: RosterOfficer;
}

type DepartmentsData = { [key: string]: { label: string; ranks: string[] } };

const SetRankModal: React.FC<Props> = ({ officer }) => {
  const [data, setData] = React.useState<DepartmentsData>({});
  const [department, setDepartment] = React.useState<string | null>(null);
  const [rank, setRank] = React.useState<number | null>(null);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const setRecords = useSetRosterRecords();

  React.useEffect(() => {
    const fetchData = async () => {
      const resp = await fetchNui<DepartmentsData>('getDepartmentsData', null, {
        data: { police: { label: 'LSPD', ranks: ['Cadet', 'Officer', 'Sergeant', 'Captain', 'Commander', 'Chief'] } },
      });

      return resp;
    };

    fetchData().then((resp) => {
      setData(resp);
    });
  }, []);

  const handleConfirm = async () => {
    if (rank === null || department == null) return;
    setConfirmLoading(true);
    const resp = await fetchNui<boolean>(
      'setOfficerRank',
      { stateId: officer.stateId, group: department, grade: +rank },
      { data: true }
    );
    if (!resp) return;
    setRecords((prev) =>
      prev.map((record) =>
        record.stateId === officer.stateId
          ? { ...officer, title: `${data[department].label} ${data[department].ranks[rank]}` }
          : record
      )
    );
    setConfirmLoading(false);
    modals.closeAll();
  };

  return (
    <Stack>
      <Select
        data={Object.entries(data).map(([department, value]) => ({ label: value.label, value: department }))}
        value={department}
        onChange={(value) => {
          if (!value) return;
          setDepartment(value);
        }}
        label={locales.officer_department}
      />
      <Select
        value={rank !== null ? rank.toString() : null}
        data={department ? data[department].ranks.map((rank, index) => ({ label: rank, value: index.toString() })) : []}
        onChange={(value) => setRank(value !== null ? +value : null)}
        label={locales.officer_rank}
      />
      <Button variant="light" onClick={handleConfirm} loading={confirmLoading}>
        {locales.confirm}
      </Button>
    </Stack>
  );
};

export default SetRankModal;
