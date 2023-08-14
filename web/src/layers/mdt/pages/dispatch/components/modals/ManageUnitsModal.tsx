import React from 'react';
import { Button, MultiSelect, Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useUnits } from '../../../../../../state';
import { Call } from '../../../../../../typings';
import { fetchNui } from '../../../../../../utils/fetchNui';

interface Props {
  call: Call;
}

const ManageUnitsModal: React.FC<Props> = ({ call }) => {
  const _units = useUnits();
  const [value, setValue] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const units: { label: string; value: string }[] = _units.map((unit) => ({
    label: unit.name,
    value: unit.id.toString(),
  }));

  React.useEffect(() => {
    console.log(call.units.map((unit) => unit.id));
    setValue(call.units.map((unit) => unit.id.toString()));
  }, [call.units]);

  const handleConfirm = async () => {
    setIsLoading(true);
    await fetchNui<boolean>(
      'setCallUnits',
      { id: call.id, units: value.map((unitId) => +unitId) },
      { data: true, delay: 3000 }
    );
    setIsLoading(false);
    modals.closeAll();
  };

  return (
    <Stack>
      <MultiSelect
        label="Units"
        searchable
        description="Manage active units on the call"
        data={units}
        value={value}
        onChange={setValue}
      />
      <Button variant="light" onClick={handleConfirm} loading={isLoading}>
        Confirm
      </Button>
    </Stack>
  );
};

export default ManageUnitsModal;
