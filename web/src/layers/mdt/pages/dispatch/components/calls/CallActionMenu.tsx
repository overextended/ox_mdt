import React from 'react';
import { ActionIcon, Menu, Text } from '@mantine/core';
import { IconCheck, IconDots, IconLink, IconMap2, IconMapPin } from '@tabler/icons-react';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { queryClient } from '../../../../../../main';
import locales from '../../../../../../locales';
import { modals } from '@mantine/modals';
import { Call } from '../../../../../../typings';
import { useCharacter, useDispatchMap } from '../../../../../../state';

interface Props {
  call: Call;
}

const CallActionMenu: React.FC<Props> = ({ call }) => {
  const map = useDispatchMap();
  const character = useCharacter();

  return (
    <>
      <Menu withArrow position="right-start">
        <Menu.Target>
          <ActionIcon variant="light" color="blue">
            <IconDots size={20} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            icon={<IconLink size={20} />}
            disabled={character.unit !== undefined}
            onClick={async () => {
              const resp = await fetchNui('attachToCall', call.id);
              if (resp) await queryClient.invalidateQueries(['calls']);
            }}
          >
            {locales.attach_to_call}
          </Menu.Item>
          <Menu.Item icon={<IconMapPin size={20} />}>{locales.set_waypoint}</Menu.Item>
          <Menu.Item
            icon={<IconMap2 size={20} />}
            onClick={() => {
              if (map) map.flyTo([call.coords[1], call.coords[0]], 4);
            }}
          >
            {locales.find_on_map}
          </Menu.Item>
          <Menu.Item
            icon={<IconCheck size={20} />}
            onClick={() => {
              modals.openConfirmModal({
                title: locales.mark_call_as_completed,
                children: (
                  <Text size="sm">{locales.mark_call_as_completed_confirm.format(call.offense, call.code)}</Text>
                ),
                labels: { confirm: locales.confirm, cancel: locales.cancel },
                confirmProps: { variant: 'light' },
                onConfirm: async () => {
                  await queryClient.invalidateQueries(['calls']);
                },
              });
            }}
          >
            {locales.mark_as_completed}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default CallActionMenu;
