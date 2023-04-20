import React from 'react';
import { ActionIcon, Avatar, Box, createStyles, Group, Menu, ScrollArea, Stack, Text } from '@mantine/core';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useAnnouncements, useAnnouncementsState } from '../../../state/dashboard';
import { modals } from '@mantine/modals';
import AnnouncementModal from './AnnouncementModal';
import { useCharacter } from '../../../state/character';

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    overflowY: 'auto',
  },
  announcementContainer: {
    backgroundColor: theme.colors.durple[4],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
}));

const AnnouncementList: React.FC = () => {
  const character = useCharacter();
  const [announcements, setAnnouncements] = useAnnouncementsState();
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      {announcements.map((announcement) => (
        <Stack key={announcement.id} className={classes.announcementContainer} p="md">
          <Group position="apart">
            <Group>
              <Avatar color="blue" radius="xl" />
              <Stack spacing={0}>
                <Text fw={500}>
                  {`${announcement.creator.firstName} ${announcement.creator.lastName} · ${announcement.creator.callSign}`}
                </Text>
                <Text size="xs" c="dark.2">
                  {dayjs(announcement.createdAt).fromNow()}
                </Text>
              </Stack>
            </Group>
            <Menu position="bottom-end" offset={3} withArrow arrowPosition="center">
              <Menu.Target>
                <ActionIcon disabled={announcement.creator.id !== character.id} size="lg" color="dark.2">
                  <IconDots />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconEdit size={18} />}
                  onClick={() => {
                    modals.open({
                      title: 'Edit announcement',
                      centered: true,
                      children: <AnnouncementModal announcement={announcement} />,
                    });
                  }}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  color="red"
                  icon={<IconTrash size={18} />}
                  onClick={() => {
                    modals.openConfirmModal({
                      title: 'Delete announcement',
                      children: <Text>Are you sure you want to delete this announcement?</Text>,
                      labels: { confirm: 'Confirm', cancel: 'Cancel' },
                      centered: true,
                      confirmProps: {
                        color: 'red',
                      },
                      onConfirm: () => {
                        // TODO: Server callback
                        setAnnouncements((prev) => prev.filter((item) => item.id !== announcement.id));
                      },
                    });
                  }}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Text size="sm">{announcement.contents}</Text>
        </Stack>
      ))}
    </Box>
  );
};

export default AnnouncementList;
