import React from 'react';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import CreateUnitModal from '../modals/CreateUnitModal';
import { useCharacter } from '../../../../state';

const CreateUnitButton: React.FC = () => {
  const character = useCharacter();
  return (
    <Button
      variant="light"
      leftIcon={<IconPlus />}
      disabled={!!character.unit}
      onClick={() =>
        modals.open({
          title: 'Create unit',
          children: <CreateUnitModal />,
          size: 'xs',
        })
      }
    >
      Create unit
    </Button>
  );
};

export default CreateUnitButton;
