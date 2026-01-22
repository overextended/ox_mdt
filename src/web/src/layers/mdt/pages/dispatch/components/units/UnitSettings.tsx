import React from 'react';
import { ActionIcon, Menu } from '@mantine/core';
import { IconCar, IconSettings, IconUsers } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import locales from '../../../../../../locales';
import ManageOfficersModal from '../modals/ManageOfficersModal';
import { Unit } from '../../../../../../typings';
import { useCharacter } from '../../../../../../state';
import ChangeUnitTypeModal from './ChangeUnitTypeModal';

interface Props {
  unit: Unit;
  isDispatch: boolean;
}

const UnitSettings: React.FC<Props> = ({ unit, isDispatch }) => {
  const character = useCharacter();

  return (
    <Menu withArrow>
      <Menu.Target>
        <ActionIcon variant="light" color="blue" disabled={!isDispatch && character.unit !== unit.id}>
          <IconSettings size={20} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={<IconCar size={20} />}
          disabled={!isDispatch && character.unit !== unit.id}
          onClick={() => {
            modals.open({
              title: locales.change_unit_type,
              size: 'xs',
              children: <ChangeUnitTypeModal id={unit.id} initialValue={unit.type} />,
            });
          }}
        >
          {locales.change_unit_type}
        </Menu.Item>
        <Menu.Item
          icon={<IconUsers size={20} />}
          disabled={!isDispatch}
          onClick={() => {
            modals.open({
              title: locales.manage_members,
              children: <ManageOfficersModal id={unit.id} members={unit.members} />,
            });
          }}
        >
          {locales.manage_members}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UnitSettings;
