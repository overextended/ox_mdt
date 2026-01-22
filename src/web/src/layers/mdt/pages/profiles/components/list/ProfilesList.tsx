import React from 'react';
import { Stack } from '@mantine/core';
import { useProfilesList } from '../../../../../../state';
import NotFound from '../../../../components/NotFound';
import { IconUserOff } from '@tabler/icons-react';
import locales from '../../../../../../locales';
import { useInfiniteScroll } from '../../../../../../hooks/useInfiniteScroll';
import PartialProfile from './PartialProfile';

const ProfilesList: React.FC = () => {
  const [profiles, dispatch] = useProfilesList();
  const { ref } = useInfiniteScroll(() => dispatch({ type: 'fetchNextPage' }));

  const pages = React.useMemo(() => profiles.pages.flatMap((page) => page.profiles), [profiles]);

  return (
    <Stack sx={{ overflowY: 'auto' }} spacing="sm">
      {pages.length > 0 ? (
        pages.map((profile, i) => (
          <PartialProfile key={profile.stateId} profile={profile} ref={i === pages.length - 2 ? ref : null} />
        ))
      ) : (
        <NotFound icon={IconUserOff} label={locales.no_profiles_found} />
      )}
    </Stack>
  );
};

export default ProfilesList;
