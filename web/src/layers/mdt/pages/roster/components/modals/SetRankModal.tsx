import { Select, Stack, Button } from '@mantine/core';
import React from 'react';
import locales from '../../../../../../locales';
import { RosterOfficer } from '../../../../../../typings';
import { fetchNui } from '../../../../../../utils/fetchNui';

interface Props {
  officer: RosterOfficer;
}

type DepartmentsData = { [key: string]: { label: string; ranks: string[] } };

const SetRankModal: React.FC<Props> = ({ officer }) => {
  const [data, setData] = React.useState<DepartmentsData>({});
  const [department, setDepartment] = React.useState<string | null>(null);
  const [rank, setRank] = React.useState<number | null>(null);

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

  const handleConfirm = () => {
    console.log(department, rank ? +rank + 1 : null);
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
        value={rank ? rank.toString() : null}
        data={department ? data[department].ranks.map((rank, index) => ({ label: rank, value: index.toString() })) : []}
        onChange={(value) => setRank(value ? +value : null)}
        label={locales.officer_rank}
      />
      <Button variant="light" onClick={handleConfirm}>
        {locales.confirm}
      </Button>
    </Stack>
  );
};

export default SetRankModal;
