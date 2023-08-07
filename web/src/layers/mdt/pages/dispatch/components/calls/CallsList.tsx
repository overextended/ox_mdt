import React from 'react';
import { useCalls, useCharacter } from '../../../../../../state';
import CallCard from './CallCard';
import { Stack } from '@mantine/core';

const CallsList: React.FC = () => {
  const calls = useCalls();
  const character = useCharacter();

  return (
    <Stack sx={{ overflowY: 'scroll', flex: '1 1 0' }}>
      {calls.map((call) => (
        <CallCard key={call.id} call={call} inUnit={character.unit !== undefined} />
      ))}
    </Stack>
  );
};

export default CallsList;
