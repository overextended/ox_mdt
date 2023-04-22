import React from 'react';
import { Avatar, Badge, createStyles, Group, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { IconCalendar, IconCertificate, IconId, IconSearch, IconUser, IconUsers } from '@tabler/icons-react';
import ProfilesList from './components/ProfilesList';
import { RichTextEditor } from '@mantine/tiptap';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extension-placeholder';
import ProfileField from './components/ProfileField';
import Profile from './components/Profile';

const useStyles = createStyles((theme) => ({
  container: {
    overflow: 'hidden',
    height: '100%',
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
  infoContainer: {
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    padding: 16,
  },
}));

const Profiles: React.FC = () => {
  const { classes } = useStyles();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Profile notes...' }),
    ],
  });

  return (
    <SimpleGrid cols={3} h="100%">
      <Stack className={classes.container} p="md">
        <Group position="apart">
          <Text size="xl">Profiles</Text>
          <IconUsers />
        </Group>
        <TextInput icon={<IconSearch size={20} />} placeholder="Search anything..." />
        <ProfilesList />
      </Stack>
      <Stack className={classes.container} p="md">
        <Profile />
      </Stack>
      <Stack>
        <Stack className={classes.infoContainer}>
          <Group position="apart">
            <Text size="lg">Licenses</Text>
            <IconCertificate />
          </Group>
          <Group spacing={8}>
            <Badge sx={(theme) => ({ backgroundColor: theme.colors.dark[4], color: theme.colors.dark[0] })}>
              Driver's license (3 points)
            </Badge>
            <Badge sx={(theme) => ({ backgroundColor: theme.colors.dark[4], color: theme.colors.dark[0] })}>
              Weapon's license
            </Badge>
            <Badge sx={(theme) => ({ backgroundColor: theme.colors.dark[4], color: theme.colors.dark[0] })}>
              Hunting license
            </Badge>
            <Badge sx={(theme) => ({ backgroundColor: theme.colors.dark[4], color: theme.colors.dark[0] })}>
              Some license
            </Badge>
          </Group>
        </Stack>
      </Stack>
    </SimpleGrid>
  );
};

export default Profiles;
