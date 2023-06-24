import React from 'react';
import { Button, Select, Stack } from '@mantine/core';
import { IconCar } from '@tabler/icons-react';
import { modals } from '@mantine/modals';

const CreateUnitModal: React.FC = () => {
  const handleConfirm = () => {
    modals.closeAll();
  };

  return (
    <Stack>
      <Select
        label="Unit vehicle type"
        withinPortal
        icon={<IconCar size={20} />}
        defaultValue="car"
        data={[
          { label: 'Car', value: 'car' },
          { label: 'Boat', value: 'boat' },
          { label: 'Heli', value: 'Heli' },
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
