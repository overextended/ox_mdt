import React from 'react';
import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { fetchNui } from '../../../utils/fetchNui';
import { IconLink, IconMapPin, IconUnlink } from '@tabler/icons-react';
import { useCharacter } from '../../../state';
import { Call } from '../../../typings';

const NotificationControls: React.FC<{ call: Call }> = ({ call }) => {
  const character = useCharacter();
  const attached = React.useMemo(() => call.units.some((unit) => unit.id === character.unit), [call, character]);

  return (
    <Group spacing={6}>
      <Tooltip label="Attach" position="top">
        <ActionIcon
          variant="light"
          color="blue"
          disabled={character.unit === undefined}
          onClick={() => {
            fetchNui(attached ? 'detachFromCall' : 'attachToCall', call.id);
          }}
        >
          {attached ? <IconUnlink size={20} /> : <IconLink size={20} />}
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Add waypoint" position="top">
        <ActionIcon variant="light" color="blue" onClick={() => fetchNui('setWaypoint', call.coords).then()}>
          <IconMapPin size={20} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default NotificationControls;
