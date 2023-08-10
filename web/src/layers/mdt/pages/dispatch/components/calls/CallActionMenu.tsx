import React from 'react';
import { ActionIcon, Menu, Text } from '@mantine/core';
import { IconCheck, IconDots, IconLink, IconMap2, IconMapPin, IconUnlink } from '@tabler/icons-react';
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

  const attached = React.useMemo(() => call.units.some((unit) => unit.id === character.unit), [call, character]);

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
            icon={attached ? <IconUnlink size={20} /> : <IconLink size={20} />}
            disabled={character.unit === undefined}
            onClick={async () => {
              const resp = await fetchNui(attached ? 'detachFromCall' : 'attachToCall', call.id);
              if (resp) await queryClient.invalidateQueries(['calls']);
            }}
          >
            {attached ? locales.detach_from_call : locales.attach_to_call}
          </Menu.Item>
          <Menu.Item
            icon={<IconMapPin size={20} />}
            onClick={() => {
              fetchNui('setWaypoint', call.coords).then();
            }}
          >
            {locales.set_waypoint}
          </Menu.Item>
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
                  <Text size="sm" c="dark.2">
                    {locales.mark_call_as_completed_confirm.format(call.offense, call.code)}
                  </Text>
                ),
                labels: { confirm: locales.confirm, cancel: locales.cancel },
                groupProps: {
                  spacing: 6,
                },
                confirmProps: { variant: 'light' },
                onConfirm: async () => {
                  const resp = await fetchNui<boolean>('completeCall', call.id);
                  if (!resp) return;
                  queryClient.setQueriesData(['calls'], (oldData: Call[] | undefined) => {
                    if (!oldData) return;

                    return oldData.filter((prevCall) => prevCall.id !== call.id);
                  });
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
