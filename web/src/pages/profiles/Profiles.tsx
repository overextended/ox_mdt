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
      <Stack className={classes.container} p="md">
        <Profile />
      </Stack>
      <Stack sx={{ overflow: 'auto' }}>
        <ProfileCard title="Licenses" icon={IconCertificate}>
          <Group spacing={8}>
            <Badge>Driver's license (3 points)</Badge>
            <Badge>Weapon's license</Badge>
            <Badge>Hunting license</Badge>
            <Badge>Some license</Badge>
          </Group>
        </ProfileCard>
        <ProfileCard title="Weapons" icon={IconSword}>
          <Group spacing={8}>
            <Badge>Pistol (193249755XZY1322)</Badge>
          </Group>
        </ProfileCard>
        <ProfileCard title="Vehicles" icon={IconCar}>
          <Group spacing={8}>
            <Badge>Dinka Blista (XYZ123)</Badge>
            <Badge>Vapid Dominator (ABC311)</Badge>
            <Badge>Pfister Neon (EQP195)</Badge>
          </Group>
        </ProfileCard>
        <ProfileCard title="Past charges" icon={IconGavel}>
          <Group spacing={8}>
            <Badge>3x Reckless evading</Badge>
            <Badge>1x First degree murder</Badge>
            <Badge>2x Bank Robbery</Badge>
          </Group>
        </ProfileCard>
        <ProfileCard title="Related reports" icon={IconReceipt}>
          {/*Might become an issue when there is too many reports?*/}
          <Stack spacing="sm">
            <ProfileReport title="Some incident" id="192345" author="Someoe Important" date="24/07/2023" />
            <ProfileReport title="Some incident" id="192345" author="Someoe Important" date="24/07/2023" />
            <ProfileReport title="Some incident" id="192345" author="Someoe Important" date="24/07/2023" />
            <ProfileReport title="Some incident" id="192345" author="Someoe Important" date="24/07/2023" />
          </Stack>
        </ProfileCard>
      </Stack>
    </SimpleGrid>
  );
};

export default Profiles;
