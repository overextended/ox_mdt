import React from 'react';
import { createStyles, Group, SimpleGrid, Center, Stack, Text } from '@mantine/core';
import { IconUserOff, IconUsers } from '@tabler/icons-react';
import ProfilesList from './components/ProfilesList';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extension-placeholder';
import Profile from './components/Profile';
import { profilesListAtoms, useIsProfileActive, useProfile, useSetProfilesDebounce } from '../../state';
import ProfileCards from './components/ProfileCards';
import ListContainer from '../../components/ListContainer';
import ListSearch from '../../components/ListSearch';
import NotFound from '../../components/NotFound';
import locales from '../../locales';
import { queryClient } from '../../main';
import { ProfileCard, ReportCard } from '../../typings';

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
  const isProfileActive = useIsProfileActive();

  React.useEffect(() => {
    return () => {
      queryClient.setQueriesData<{ pages: ProfileCard[][]; pageParams: number[] }>(['profiles'], (data) => {
        if (!data) return;

        return {
          pages: [data.pages[0]],
          pageParams: [data.pageParams[0]],
        };
      });
    };
  }, []);

  return (
    <SimpleGrid cols={3} h="100%" sx={{ overflow: 'hidden' }}>
      <Stack className={classes.container} p="md">
        <Group position="apart">
          <Text size="xl">{locales.profiles}</Text>
          <IconUsers />
        </Group>
        <ListSearch setDebouncedValue={setProfilesDebounce} valueAtom={profilesListAtoms.currentValueAtom} />
        <ListContainer
          ListComponent={ProfilesList}
          debounceAtom={profilesListAtoms.isDebouncingAtom}
          setDebouncedSearch={setProfilesDebounce}
        />
      </Stack>
      <>
        <Stack className={classes.container} p="md" sx={{ overflow: 'auto' }}>
          {isProfileActive ? (
            <Profile />
          ) : (
            <Center h="100%">
              <NotFound icon={IconUserOff} label={locales.no_profile_selected} />
            </Center>
          )}
        </Stack>
        <Stack sx={{ overflow: 'auto' }}>
          {isProfileActive ? (
            <ProfileCards />
          ) : (
            <Center h="100%" className={classes.container}>
              <NotFound icon={IconUserOff} label={locales.no_profile_selected} />
            </Center>
          )}
        </Stack>
      </>
    </SimpleGrid>
  );
};

export default Profiles;
