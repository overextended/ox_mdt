import React from 'react';
import { Button, Select, Stack } from '@mantine/core';
import { UnitType } from '../../../../../../typings';
import locales from '../../../../../../locales';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { modals } from '@mantine/modals';

interface Props {
  id: number;
  initialValue: string;
}

const ChangeUnitTypeModal: React.FC<Props> = ({ id, initialValue }) => {
  const [value, setValue] = React.useState<string>(initialValue);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await fetchNui('setUnitType', { id, value }, { data: true });
    setIsLoading(false);
    modals.closeAll();
  };

  return (
    <Stack>
      <Select
        value={value}
        onChange={(val: UnitType) => setValue(val)}
        label={locales.unit_vehicle_type}
        withinPortal
        defaultValue="car"
        data={[
          { label: locales.car, value: 'car' },
          { label: locales.boat, value: 'boat' },
          { label: locales.heli, value: 'heli' },
          { label: locales.motor, value: 'motor' },
        ]}
      />
      <Button variant="light" onClick={handleConfirm} loading={isLoading}>
        Confirm
      </Button>
    </Stack>
  );
};

export default ChangeUnitTypeModal;
