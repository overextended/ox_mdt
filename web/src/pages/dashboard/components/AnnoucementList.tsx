import React from 'react';
import { ActionIcon, Avatar, Box, Group, Menu, ScrollArea, Stack, Text } from '@mantine/core';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';

interface Announcement {
  firstName: string;
  lastName: string;
  image: string;
  callSign: string;
  createdAt: number;
  content: string;
}

const ANNOUNCEMENTS: Announcement[] = [
  {
    firstName: 'Svetozar',
    lastName: 'Miletić',
    image: '',
    callSign: '132',
    createdAt: Date.now(),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aut earum eius minima modi molestias possimus quis repellendus sint sunt? Excepturi explicabo in quo, reprehenderit temporibus ullam Aspernatur doloribus ducimus earum eius eum illum ipsum iure modi neque officia perspiciatis placeat quasi, quos saepe sequi sint tempora totam veniam vitae?',
  },
  {
    firstName: 'John',
    lastName: 'Smith',
    image: '',
    callSign: '264',
    createdAt: Date.now(),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aut earum eius minima modi molestias possimus quis repellendus sint sunt? Excepturi explicabo in quo, reprehenderit temporibus ullam Aspernatur doloribus ducimus earum eius',
  },
  {
    firstName: 'John',
    lastName: 'Smith',
    image: '',
    callSign: '264',
    createdAt: Date.now(),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aut earum eius minima modi molestias possimus quis repellendus sint sunt? Excepturi explicabo in quo, reprehenderit temporibus ullam Aspernatur doloribus ducimus earum eius',
  },
  {
    firstName: 'John',
    lastName: 'Smith',
    image: '',
    callSign: '264',
    createdAt: Date.now(),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aut earum eius minima modi molestias possimus quis repellendus sint sunt? Excepturi explicabo in quo, reprehenderit temporibus ullam Aspernatur doloribus ducimus earum eius',
  },
];

const AnnouncementList: React.FC = () => {
  const [announcements, setAnnouncements] = React.useState<Announcement[]>(ANNOUNCEMENTS);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
      {announcements.map((announcement) => (
        <Stack
          sx={(theme) => ({
            backgroundColor: theme.colors.durple[4],
            borderRadius: theme.radius.md,
            boxShadow: theme.shadows.md,
          })}
          p="md"
        >
          <Group position="apart">
            <Group>
              <Avatar color="blue" radius="xl" />
              <Stack spacing={0}>
                <Text fw={500}>{`${announcement.firstName} ${announcement.lastName} · ${announcement.callSign}`}</Text>
                <Text size="xs" c="dark.2">
                  {new Date(announcement.createdAt).toLocaleDateString()}
                </Text>
              </Stack>
            </Group>
            <Menu position="bottom-end" offset={3} withArrow arrowPosition="center">
              <Menu.Target>
                <ActionIcon size="lg" color="dark.2">
                  <IconDots />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item icon={<IconEdit size={18} />}>Edit</Menu.Item>
                <Menu.Item color="red" icon={<IconTrash size={18} />}>
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Text size="sm">{announcement.content}</Text>
        </Stack>
      ))}
    </Box>
  );
};

export default AnnouncementList;
