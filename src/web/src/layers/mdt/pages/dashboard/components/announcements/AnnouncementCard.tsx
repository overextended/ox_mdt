import React from 'react';
import { ActionIcon, Avatar, createStyles, Group, Menu, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import AnnouncementModal from './AnnouncementModal';
import { Announcement, Character } from '../../../../../../typings';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { queryClient } from '../../../../../../main';
import locales from '../../../../../../locales';
import { hasPermission } from '../../../../../../helpers';
import ReadOnlyEditor from '../../../../components/ReadOnlyEditor';

const useStyles = createStyles((theme) => ({
  announcementContainer: {
    backgroundColor: theme.colors.durple[4],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    minHeight: 120,
    flex: '1 0 auto',
  },
}));

interface Props {
  announcement: Announcement;
  character: Character;
}

const AnnouncementCard: React.ForwardRefRenderFunction<HTMLDivElement | null, Props> = (
  { announcement, character },
  ref
) => {
  const { classes } = useStyles();

  return (
    <Stack className={classes.announcementContainer} p="md" ref={ref}>
      <Group position="apart">
        <Group>
          <Avatar color="blue" src={announcement.image} />
          <Stack spacing={0}>
            <Text fw={500}>{`${announcement.firstName} ${announcement.lastName} ${
              announcement.callSign ? `· ${announcement.callSign}` : ''
            }`}</Text>
            <Text size="xs" c="dark.2">
              {dayjs(announcement.createdAt).fromNow()}
            </Text>
          </Stack>
        </Group>
        <Menu position="bottom-end" offset={3} withArrow arrowPosition="center">
          <Menu.Target>
            <ActionIcon
              disabled={announcement.stateId !== character.stateId && !hasPermission(character, 'delete_announcement')}
              size="lg"
              variant="light"
              color="blue"
            >
              <IconDots />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              disabled={announcement.stateId !== character.stateId}
              icon={<IconEdit size={18} />}
              onClick={() => {
                modals.open({
                  title: locales.edit_announcement,
                  centered: true,
                  children: <AnnouncementModal announcement={announcement} />,
                });
              }}
            >
              {locales.edit}
            </Menu.Item>
            <Menu.Item
              color="red"
              icon={<IconTrash size={18} />}
              onClick={() => {
                modals.openConfirmModal({
                  title: locales.delete_announcement,
                  children: (
                    <Text size="sm" c="dark.2">
                      {locales.delete_announcement_confirm}
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
                    const resp = await fetchNui('deleteAnnouncement', announcement.id);
                    if (!resp) return;
                    await queryClient.invalidateQueries(['announcements']);
                  },
                });
              }}
            >
              {locales.delete}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <ReadOnlyEditor content={announcement.contents} />
    </Stack>
  );
};

export default React.memo(React.forwardRef(AnnouncementCard));
