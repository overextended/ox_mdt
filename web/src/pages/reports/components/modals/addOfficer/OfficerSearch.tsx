import React from 'react';
import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useOfficersSearch, useSetOfficersDebounce } from '../../../../../state';

const OfficerSearch: React.FC = () => {
  const search = useOfficersSearch();
  const setDebouncedSearch = useSetOfficersDebounce();

  return (
    <TextInput
      icon={<IconSearch size={20} />}
      placeholder="Search officers..."
      data-autofocus
      value={search}
      onChange={(e) => setDebouncedSearch(e.target.value.toLowerCase())}
    />
  );
};

export default OfficerSearch;
