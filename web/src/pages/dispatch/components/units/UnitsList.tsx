import React from 'react';
import { useUnits } from '../../../../state/dispatch/units';
import { Stack } from '@mantine/core';
import UnitCard from './UnitCard';

const UnitsList: React.FC = () => {
  const units = useUnits();

  return (
    <Stack>
      {units.map((unit) => (
        <UnitCard key={unit.name} unit={unit} />
      ))}
    </Stack>
  );
};

export default UnitsList;
