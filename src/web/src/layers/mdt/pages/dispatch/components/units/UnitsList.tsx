import React from 'react';
import { useCharacter, useUnits } from '../../../../../../state';
import { Stack } from '@mantine/core';
import UnitCard from './UnitCard';
import NotFound from '../../../../components/NotFound';
import { IconCarOff } from '@tabler/icons-react';
import locales from '../../../../../../locales';
import { useNuiEvent } from '../../../../../../hooks/useNuiEvent';
import { Unit } from '../../../../../../typings';
import { convertUnitsToArray } from '../../../../../../helpers';
import { queryClient } from '../../../../../../main';

const UnitsList: React.FC = () => {
  const units = useUnits();
  const character = useCharacter();

  useNuiEvent('refreshUnits', (data: { [key: string]: Omit<Unit, 'id'> }) => {
    const units = convertUnitsToArray(data);
    queryClient.setQueriesData<Unit[]>(['units'], (oldData) => {
      if (!oldData) return;

      return units;
    });
  });

  return (
    <Stack sx={{ overflowY: 'scroll', flex: '1 1 0' }}>
      {units.length > 0 ? (
        units.map((unit) => (
          <UnitCard
            key={`${unit.id}-${unit.members}`}
            unit={unit}
            isInThisUnit={character.unit === unit.id}
            isDispatch={character.group === 'dispatch'}
          />
        ))
      ) : (
        <NotFound label={locales.units_not_active} icon={IconCarOff} />
      )}
    </Stack>
  );
};

export default UnitsList;
