import React from 'react';
import { useProfilesSearch, useSetProfilesDebounce } from '../../../state';
import { IconSearch } from '@tabler/icons-react';
import { TextInput } from '@mantine/core';

const ProfilesSearch: React.FC = () => {
  const search = useProfilesSearch();
  const setDebouncedSearch = useSetProfilesDebounce();

  return (
    <TextInput
      icon={<IconSearch size={20} />}
      placeholder="Search anything..."
      value={search}
      onChange={(e) => setDebouncedSearch(e.target.value.toLowerCase())}
    />
  );
};

export default ProfilesSearch;
