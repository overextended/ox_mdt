import React, { useRef } from 'react';
import { Button, Loader, Select, Stack } from '@mantine/core';
import { IconCar } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { useCharacterState, useSetUnits } from '../../../../state';
import { UnitType } from '../../../../typings';
import { fetchNui } from '../../../../utils/fetchNui';

const CreateUnitModal: React.FC = () => {
  const selectRef = useRef<HTMLInputElement>(null);
  const setUnits = useSetUnits();
  const [character, setCharacter] = useCharacterState();
  const [value, setValue] = React.useState<UnitType>('car');

  const handleConfirm = async () => {
    modals.closeAll();
    const resp = await fetchNui<{ id: number; name: string }>('createUnit', value, {
      data: { id: 1, name: `Unit 1` },
    });
    setUnits((prev) => [
      ...prev,
      {
        id: resp.id,
        name: resp.name,
        type: value,
        members: [{ name: `${character.firstName} ${character.lastName}`, callSign: character.callSign }],
      },
    ]);
    setCharacter((prev) => ({ ...prev, unit: resp.id }));
  };

  return (
    <Stack>
      <Select
        value={value}
        onChange={(val: UnitType) => setValue(val)}
        label="Unit vehicle type"
        withinPortal
        icon={<IconCar size={20} />}
        defaultValue="car"
        data={[
          { label: 'Car', value: 'car' },
          { label: 'Boat', value: 'boat' },
          { label: 'Heli', value: 'heli' },
          { label: 'Motor', value: 'motor' },
        ]}
      />
      <Button variant="light" onClick={handleConfirm}>
        Confirm
      </Button>
    </Stack>
  );
};

export default CreateUnitModal;
