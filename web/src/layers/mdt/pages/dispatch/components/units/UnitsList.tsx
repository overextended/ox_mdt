import React from 'react';
import { useCharacter, useUnits } from '../../../../../../state';
import { Stack } from '@mantine/core';
import UnitCard from './UnitCard';
import NotFound from '../../../../components/NotFound';
import { IconCarOff } from '@tabler/icons-react';
import locales from '../../../../../../locales';

const UnitsList: React.FC = () => {
  const units = useUnits();
  const character = useCharacter();

  return (
    <Stack sx={{ overflowY: 'scroll', flex: '1 1 0' }}>
      {units.length > 0 ? (
        units.map((unit) => (
          <UnitCard key={`${unit.id}-${unit.members}`} unit={unit} isInThisUnit={character.unit === unit.id} />
        ))
      ) : (
        <NotFound label={locales.units_not_active} icon={IconCarOff} />
      )}
    </Stack>
  );
};

export default UnitsList;
