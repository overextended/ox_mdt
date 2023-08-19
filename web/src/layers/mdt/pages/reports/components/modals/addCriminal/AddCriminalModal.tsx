import React from 'react';
import { Stack } from '@mantine/core';
import CriminalSearch from './CriminalSearch';
import { useIsCriminalsDebouncing, useSetCriminalDebounce } from '../../../../../../../state';
import CriminalsResults from './CriminalsResults';
import SuspenseLoader from '../../../../../components/SuspenseLoader';

const AddCriminalModal: React.FC = () => {
  const isDebouncing = useIsCriminalsDebouncing();
  const setDebouncedSearch = useSetCriminalDebounce();

  React.useEffect(() => {
    return () => setDebouncedSearch('');
  }, []);

  return (
    <Stack h="100%">
      <CriminalSearch />
      <React.Suspense fallback={<SuspenseLoader />}>
        {isDebouncing ? <SuspenseLoader /> : <CriminalsResults />}
      </React.Suspense>
    </Stack>
  );
};

export default AddCriminalModal;
