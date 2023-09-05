import React from 'react';
import { ActionIcon, Group, Menu, Text } from '@mantine/core';
import { Icon123, IconArrowBadgeUp, IconArrowsUpDown, IconBadge, IconSettings, IconUserX } from '@tabler/icons-react';
import { RosterOfficer } from '../../../../../typings';
import locales from '../../../../../locales';
import { modals } from '@mantine/modals';
import SetCallSignModal from './modals/SetCallSignModal';
import SetRankModal from './modals/SetRankModal';
import { useSetRosterRecords } from '../../../../../state/roster';
import { fetchNui } from '../../../../../utils/fetchNui';

const RosterOfficerMenu: React.FC<{ officer: RosterOfficer }> = ({ officer }) => {
  const setRecords = useSetRosterRecords();

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
          <Menu.Item
            icon={<IconArrowBadgeUp size={20} />}
            onClick={() =>
              modals.open({ title: locales.set_rank, size: 'xs', children: <SetRankModal officer={officer} /> })
            }
          >
            {locales.set_rank}
          </Menu.Item>
          <Menu.Item
            icon={<IconUserX size={20} />}
            color="red"
            onClick={() =>
              modals.openConfirmModal({
                title: locales.fire_officer,
                children: (
                  <Text c="dark.2" size="sm">
                    {locales.fire_officer_description.format(officer.firstName, officer.lastName)}
                  </Text>
                ),
                labels: { confirm: locales.confirm, cancel: locales.cancel },
                centered: true,
                groupProps: {
                  spacing: 6,
                },
                confirmProps: {
                  color: 'red',
                },
                onConfirm: async () => {
                  const resp = await fetchNui('fireOfficer', officer.stateId, { data: true });
                  if (!resp) return;
                  setRecords((prev) => prev.filter((record) => record.stateId !== officer.stateId));
                  modals.closeAll();
                },
              })
            }
          >
            {locales.fire_officer}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default React.memo(RosterOfficerMenu);
