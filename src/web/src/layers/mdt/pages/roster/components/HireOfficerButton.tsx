import React from 'react';
import { Button } from '@mantine/core';
import { IconUserPlus } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import locales from '../../../../../locales';
import HireOfficerModal from './modals/HireOfficerModal';
import { useCharacter } from '../../../../../state';
import { hasPermission } from '../../../../../helpers';

const HireOfficerButton: React.FC = () => {
  const character = useCharacter();

  return (
    <Button
      disabled={!hasPermission(character, 'hire_officer')}
      variant="light"
      leftIcon={<IconUserPlus size={20} />}
      onClick={() => modals.open({ title: locales.hire_officer, size: 'xs', children: <HireOfficerModal /> })}
    >
      {locales.hire_officer}
    </Button>
  );
};

export default HireOfficerButton;
