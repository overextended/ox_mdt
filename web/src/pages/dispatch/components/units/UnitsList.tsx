import React from 'react';
import { useUnits } from '../../../../state';
import { Stack } from '@mantine/core';
import UnitCard from './UnitCard';
import NotFound from '../../../../components/NotFound';
import { IconCarOff } from '@tabler/icons-react';

const UnitsList: React.FC = () => {
  const units = useUnits();

  return (
    <Stack sx={{ overflowY: 'scroll', flex: '1 1 0' }}>
      {units.length > 0 ? (
        units.map((unit) => <UnitCard key={unit.name} unit={unit} />)
      ) : (
        <NotFound label="No units active" icon={IconCarOff} />
      )}
    </Stack>
  );
};

export default UnitsList;
