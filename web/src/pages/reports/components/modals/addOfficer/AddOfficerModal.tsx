import React from 'react';
import { Stack, Center, Loader } from '@mantine/core';
import OfficerResults from './OfficerResults';
import { useIsOfficersDebouncing, useSetOfficersDebounce } from '../../../../../state';
import OfficerSearch from './OfficerSearch';

const AddOfficerModal: React.FC = () => {
  const setDebouncedSearch = useSetOfficersDebounce();
  const isDebouncing = useIsOfficersDebouncing();

  React.useEffect(() => {
    return () => setDebouncedSearch('');
  }, []);

  return (
    <Stack sx={{ overflowY: 'scroll' }}>
      <OfficerSearch />
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
          <OfficerResults />
        )}
      </React.Suspense>
    </Stack>
  );
};

export default AddOfficerModal;
