import React from 'react';
import { createStyles, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconUsers } from '@tabler/icons-react';
import ProfilesList from './components/ProfilesList';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extension-placeholder';
import Profile from './components/Profile';
import { profilesListAtoms, useProfile, useSetProfilesDebounce } from '../../state';
import ProfileCards from './components/ProfileCards';
import ListContainer from '../../components/ListContainer';
import ListSearch from '../../components/ListSearch';

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
  const setProfilesDebounce = useSetProfilesDebounce();
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
        <ListSearch setDebouncedValue={setProfilesDebounce} valueAtom={profilesListAtoms.currentValueAtom} />
        <ListContainer
          ListComponent={ProfilesList}
          debounceAtom={profilesListAtoms.isDebouncingAtom}
          setDebouncedSearch={setProfilesDebounce}
        />
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
