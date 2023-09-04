import React from 'react';
import { ActionIcon, Group, Menu } from '@mantine/core';
import { Icon123, IconArrowBadgeUp, IconArrowsUpDown, IconBadge, IconSettings, IconUserX } from '@tabler/icons-react';
import { RosterOfficer } from '../../../../../typings';
import locales from '../../../../../locales';
import { modals } from '@mantine/modals';
import SetCallSignModal from './modals/SetCallSignModal';

const RosterOfficerMenu: React.FC<{ officer: RosterOfficer }> = ({ officer }) => {
  return (
    <Group position="center">
      <Menu withinPortal withArrow position="bottom-end">
        <Menu.Target>
          <ActionIcon variant="light" size="lg" color="blue">
            <IconSettings />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            icon={<Icon123 size={20} />}
            onClick={() =>
              modals.open({
                title: locales.set_call_sign,
                children: <SetCallSignModal officer={officer} />,
                size: 'xs',
              })
            }
          >
            {locales.set_call_sign}
          </Menu.Item>
          <Menu.Item icon={<IconArrowBadgeUp size={20} />}>{locales.set_rank}</Menu.Item>
          <Menu.Item icon={<IconUserX size={20} />} color="red">
            {locales.fire_officer}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default React.memo(RosterOfficerMenu);
