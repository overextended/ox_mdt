import React from 'react';
import { Center, createStyles, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconUserOff, IconUsers } from '@tabler/icons-react';
import ProfilesList from './components/list/ProfilesList';
import Profile from './components/profile/Profile';
import { profilesListAtoms, useIsProfileActive, useSetProfilesDebounce } from '../../../../state';
import ProfileCards from './components/cards/ProfileCards';
import ListContainer from '../../components/ListContainer';
import ListSearch from '../../components/ListSearch';
import NotFound from '../../components/NotFound';
import locales from '../../../../locales';
import { removePages } from '../../../../helpers';

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
    return () => removePages(['profiles']);
  }, []);

  return (
    <SimpleGrid cols={3} h="100%" sx={{ overflow: 'hidden' }} spacing="xs">
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
        <Stack sx={{ overflow: 'auto' }} spacing="xs">
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
