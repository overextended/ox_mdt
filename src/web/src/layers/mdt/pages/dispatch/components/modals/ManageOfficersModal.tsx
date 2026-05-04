import React from 'react';
import { Button, Loader, MultiSelect, Stack } from '@mantine/core';
import locales from '../../../../../../locales';
import { useQuery } from '@tanstack/react-query';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { Officer } from '../../../../../../typings';
import { modals } from '@mantine/modals';

interface Props {
  id: number;
  members: Officer[];
}

const ManageOfficersModal: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState<string[]>([]);
  const query = useQuery({
    queryKey: ['activeOfficers'],
    queryFn: async () => {
      const resp = await fetchNui<Officer[]>('getActiveOfficers', null, { data: [], delay: 1500 });

      console.log(JSON.stringify(resp, null, 2));
      return resp;
    },
    refetchOnMount: true,
  });

  const officers = query.data?.map((officer) => ({
    label: `${officer.firstName} ${officer.lastName} (${officer.callSign})`,
    value: officer.playerId.toString(),
  }));

  React.useEffect(() => {
    setValue(props.members.map((member) => member.playerId.toString()));
  }, [props]);

  return (
    <Stack>
      <MultiSelect
        data={officers || []}
        searchable
        value={value}
        onChange={setValue}
        label={locales.unit_officers}
        description={locales.unit_officers_description}
        readOnly={query.isLoading}
        rightSection={query.isLoading ? <Loader size="sm" /> : null}
      />
      <Button
        variant="light"
        onClick={async () => {
          await fetchNui('setUnitOfficers', { id: props.id, officers: value });
          modals.closeAll();
        }}
      >
        {locales.confirm}
      </Button>
    </Stack>
  );
};

export default ManageOfficersModal;
