import React from 'react';
import { Center, Loader, Stack } from '@mantine/core';
import CriminalSearch from './CriminalSearch';
import { useIsCriminalsDebouncing, useSetCriminalDebounce } from '../../../../../state';
import CriminalsResults from './CriminalsResults';

const AddCriminalModal: React.FC = () => {
  const isDebouncing = useIsCriminalsDebouncing();
  const setDebouncedSearch = useSetCriminalDebounce();

  React.useEffect(() => {
    return () => setDebouncedSearch('');
  }, []);

  return (
    <Stack h="100%">
      <CriminalSearch />
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
          <CriminalsResults />
        )}
      </React.Suspense>
    </Stack>
  );
};

export default AddCriminalModal;
