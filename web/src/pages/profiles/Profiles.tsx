import React from 'react';
import { Avatar, Badge, createStyles, Group, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import {
  IconCalendar,
  IconCar,
  IconCertificate,
  IconGavel,
  IconId,
  IconReceipt,
  IconSearch,
  IconSword,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';
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
import ProfileCard from './components/ProfileCard';
import ProfileReport from './components/ProfileReport';
import { useProfile } from '../../state/profiles/profile';
import ProfileCards from './components/ProfileCards';

const useStyles = createStyles((theme) => ({
  container: {
    overflow: 'hidden',
    height: '100%',
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
}));

const Profiles: React.FC = () => {
  const { classes } = useStyles();
  const profile = useProfile();

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
    <SimpleGrid cols={3} h="100%" sx={{ overflow: 'hidden' }}>
      <Stack className={classes.container} p="md">
        <Group position="apart">
          <Text size="xl">Profiles</Text>
          <IconUsers />
        </Group>
        <TextInput icon={<IconSearch size={20} />} placeholder="Search anything..." />
        <ProfilesList />
      </Stack>
      {profile && (
        <>
          <Stack className={classes.container} p="md" sx={{ overflow: 'auto' }}>
            <Profile />
          </Stack>
          <Stack sx={{ overflow: 'auto' }}>
            <ProfileCards />
          </Stack>
        </>
      )}
    </SimpleGrid>
  );
};

export default Profiles;
