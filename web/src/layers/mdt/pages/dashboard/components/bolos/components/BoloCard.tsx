import React from 'react';
import { BOLO } from '../../../../../../../typings/bolo';
import { createStyles, Group, Stack, Text, Image, ActionIcon, Avatar, Menu } from '@mantine/core';
import ReadOnlyEditor from '../../../../../components/ReadOnlyEditor';
import { modals } from '@mantine/modals';
import dayjs from 'dayjs';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import locales from '../../../../../../../locales';
import { hasPermission } from '../../../../../../../helpers/hasPermission';
import { useCharacter } from '../../../../../../../state';
import { fetchNui } from '../../../../../../../utils/fetchNui';
import CreateBoloModal from '../modals/CreateBoloModal';

interface Props {
  bolo: BOLO;
}

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.durple[4],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    padding: theme.spacing.md,
    minHeight: 120,
    flex: '1 0 auto',
  },
  image: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const BoloCard: React.FC<Props> = ({ bolo }) => {
  const { classes } = useStyles();
  const character = useCharacter();

  return (
    <Stack className={classes.container}>
      <Group position="apart">
        <Group h="100%">
          <Avatar variant="light" color="blue" />
          <Stack spacing={0} align="start">
            <Text c="dark.0" size="md" weight={500}>{`${bolo.firstName} ${bolo.lastName} · ${bolo.callSign}`}</Text>
            <Text c="dark.2" size="xs">
              {dayjs(bolo.createdAt).fromNow()}
            </Text>
          </Stack>
        </Group>
        <Menu position="bottom-end" offset={3} withArrow arrowPosition="center">
          <Menu.Target>
            <ActionIcon variant="light" color="blue" size="lg">
              <IconDots />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              // disabled={bolo.stateId !== character.stateId}
              icon={<IconEdit size={18} />}
              onClick={() =>
                modals.open({ title: locales.edit_bolo, children: <CreateBoloModal bolo={bolo} />, size: 'lg' })
              }
            >
              {locales.edit}
            </Menu.Item>
            <Menu.Item
              color="red"
              disabled={bolo.stateId !== character.stateId && !hasPermission(character, 'delete_bolo')}
              icon={<IconTrash size={18} />}
              onClick={() => {
                modals.openConfirmModal({
                  title: locales.delete_bolo,
                  children: (
                    <Text size="sm" c="dark.2">
                      {locales.delete_bolo_confirm}
                    </Text>
                  ),
                  labels: { confirm: locales.confirm, cancel: locales.cancel },
                  confirmProps: { color: 'red' },
                  groupProps: { spacing: 6 },
                  onConfirm: async () => {
                    await fetchNui('deleteBOLO', bolo.id, { data: true });
                  },
                });
              }}
            >
              {locales.delete}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <ReadOnlyEditor content={bolo.contents} />
      {bolo.images && bolo.images.length > 0 && (
        <Group spacing="xs">
          {bolo.images.map((image) => (
            <Image
              src={image}
              width={105}
              height={105}
              radius="md"
              className={classes.image}
              onClick={() =>
                modals.open({
                  children: <Image src={image} onClick={() => modals.closeAll()} />,
                  withCloseButton: false,
                  padding: 0,
                  size: 'unset',
                  transitionProps: { transition: 'pop' },
                })
              }
            />
          ))}
        </Group>
      )}
    </Stack>
  );
};

export default React.memo(BoloCard);
