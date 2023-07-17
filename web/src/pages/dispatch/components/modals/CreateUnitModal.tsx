import React, { useRef } from 'react';
import { Button, Loader, Select, Stack } from '@mantine/core';
import { IconCar } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { useCharacterState, useSetUnits } from '../../../../state';
import { UnitType } from '../../../../typings';
import { fetchNui } from '../../../../utils/fetchNui';
import locales from '../../../../locales';

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
        members: [
          {
            firstName: character.firstName,
            lastName: character.lastName,
            callSign: character.callSign,
            stateId: character.stateId,
          },
        ],
      },
    ]);
    setCharacter((prev) => ({ ...prev, unit: resp.id }));
  };

  return (
    <Stack>
      <Select
        value={value}
        onChange={(val: UnitType) => setValue(val)}
        label={locales.unit_vehicle_type}
        withinPortal
        icon={<IconCar size={20} />}
        defaultValue="car"
        data={[
          { label: locales.car, value: 'car' },
          { label: locales.boat, value: 'boat' },
          { label: locales.heli, value: 'heli' },
          { label: locales.motor, value: 'motor' },
        ]}
      />
      <Button variant="light" onClick={handleConfirm}>
        Confirm
      </Button>
    </Stack>
  );
};

export default CreateUnitModal;
