import React from 'react';
import { useUnits } from '../../../../state/dispatch/units';
import { Box, Stack } from '@mantine/core';
import UnitCard from './UnitCard';

const UnitsList: React.FC = () => {
  const units = useUnits();

  return (
    <Stack sx={{ overflowY: 'scroll', flex: '1 1 0' }}>
      {units.map((unit) => (
        <UnitCard key={unit.name} unit={unit} />
      ))}
    </Stack>
  );
};

export default UnitsList;
