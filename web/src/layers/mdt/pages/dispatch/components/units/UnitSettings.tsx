import React from 'react';
import { ActionIcon, Menu } from '@mantine/core';
import { IconCar, IconSettings, IconUsers } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import locales from '../../../../../../locales';
import ManageOfficersModal from '../modals/ManageOfficersModal';
import { Unit } from '../../../../../../typings';

interface Props {
  id: number;
  members: Unit['members'];
  isDispatch: boolean;
}

const UnitSettings: React.FC<Props> = ({ id, members, isDispatch }) => {
  return (
    <Menu withArrow>
      <Menu.Target>
        <ActionIcon variant="light" color="blue">
          <IconSettings size={20} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<IconCar size={20} />}>Change type</Menu.Item>
        <Menu.Item
          icon={<IconUsers size={20} />}
          disabled={!isDispatch}
          onClick={() => {
            modals.open({
              title: locales.manage_members,
              children: <ManageOfficersModal id={id} members={members} />,
            });
          }}
        >
          Manage members
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UnitSettings;
