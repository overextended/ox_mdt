import React from 'react';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import locales from '../../../../../../locales';
import AddCriminalModal from '../modals/addCriminal/AddCriminalModal';
import { useCharacter } from '../../../../../../state';
import { hasPermission } from '../../../../../../helpers';

const AddCriminalButton: React.FC = () => {
  const character = useCharacter();

  return (
    <Button
      variant="light"
      disabled={!hasPermission(character, 'add_criminal')}
      leftIcon={<IconPlus size={20} />}
      onClick={() =>
        modals.open({
          title: locales.add_criminal,
          children: <AddCriminalModal />,
          styles: { body: { height: 400, overflow: 'hidden' } },
        })
      }
    >
      {locales.add_criminal}
    </Button>
  );
};

export default AddCriminalButton;
