import { Center, Loader } from '@mantine/core';
import React from 'react';
import { useIsProfilesDebouncing, useSetProfilesDebounce } from '../../../state';
import ProfilesList from './ProfilesList';

const ProfilesListContainer: React.FC = () => {
  const isDebouncing = useIsProfilesDebouncing();
  const setDebouncedSearch = useSetProfilesDebounce();

  React.useEffect(() => {
    return () => setDebouncedSearch('');
  }, []);

  return (
    <React.Suspense
      fallback={
        <Center>
          <Loader />
        </Center>
      }
    >
      {isDebouncing ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <ProfilesList />
      )}
    </React.Suspense>
  );
};

export default ProfilesListContainer;
