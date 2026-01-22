import React from 'react';
import { Stack } from '@mantine/core';
import OfficerResults from './OfficerResults';
import { useIsOfficersDebouncing, useSetOfficersDebounce } from '../../../../../../../state';
import OfficerSearch from './OfficerSearch';
import SuspenseLoader from '../../../../../components/SuspenseLoader';

const AddOfficerModal: React.FC = () => {
  const setDebouncedSearch = useSetOfficersDebounce();
  const isDebouncing = useIsOfficersDebouncing();

  React.useEffect(() => {
    return () => setDebouncedSearch('');
  }, []);

  return (
    <Stack sx={{ overflowY: 'scroll' }}>
      <OfficerSearch />
      <React.Suspense fallback={<SuspenseLoader />}>
        {isDebouncing ? <SuspenseLoader /> : <OfficerResults />}
      </React.Suspense>
    </Stack>
  );
};

export default AddOfficerModal;
