import React from 'react';
import { Stack, TextInput, Button, Divider, Center, Loader } from '@mantine/core';
import { IconCheck, IconSearch } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import OfficerResults from './OfficerResults';
import SelectedOfficers from './SelectedOfficers';
import { useIsOfficersDebouncing, useSetOfficersDebounce } from '../../../../../state';
import OfficerSearch from './OfficerSearch';
import ConfirmSelected from './ConfirmSelected';

const AddOfficerModal: React.FC = () => {
  const setDebouncedSearch = useSetOfficersDebounce();
  const isDebouncing = useIsOfficersDebouncing();

  React.useEffect(() => {
    return () => setDebouncedSearch('');
  }, []);

  return (
    <Stack sx={{ overflowY: 'scroll' }}>
      <OfficerSearch />
      <SelectedOfficers />
      <ConfirmSelected />
      <Divider label="Search results" labelPosition="center" />
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
