import React from 'react';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import CreateUnitModal from '../modals/CreateUnitModal';
import { useCharacter } from '../../../../../../state';
import locales from '../../../../../../locales';

const CreateUnitButton: React.FC = () => {
  const character = useCharacter();
  return (
    <Button
      variant="light"
      leftIcon={<IconPlus />}
      disabled={character.unit !== undefined}
      onClick={() =>
        modals.open({
          title: locales.create_unit,
          children: <CreateUnitModal />,
          size: 'xs',
        })
      }
    >
      {locales.create_unit}
    </Button>
  );
};

export default CreateUnitButton;
