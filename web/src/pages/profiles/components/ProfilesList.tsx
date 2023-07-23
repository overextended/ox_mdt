import React from 'react';
import { Stack } from '@mantine/core';
import { useProfilesList } from '../../../state';
import NotFound from '../../../components/NotFound';
import { IconUserOff } from '@tabler/icons-react';
import locales from '../../../locales';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import ProfileListItem from './ProfileListItem';

const ProfilesList: React.FC = () => {
  const [profiles, dispatch] = useProfilesList();
  const { ref } = useInfiniteScroll(() => dispatch({ type: 'fetchNextPage' }));

  const pages = React.useMemo(() => profiles.pages.flatMap((page) => page.profiles), [profiles]);

  return (
    <Stack sx={{ overflowY: 'auto' }} spacing="sm">
      {pages.length > 0 ? (
        pages.map((profile) => <ProfileListItem key={profile.stateId} profile={profile} />)
      ) : (
        <NotFound icon={IconUserOff} label={locales.no_profiles_found} />
      )}
      {/*Cursor element used for infinite scroll*/}
      {profiles.pages.length > 0 && <span ref={ref} />}
    </Stack>
  );
};

export default ProfilesList;
