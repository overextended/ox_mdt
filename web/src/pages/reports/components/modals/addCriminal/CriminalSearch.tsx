import React from 'react';
import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useCriminalSearch, useSetCriminalDebounce } from '../../../../../state/reports/addCriminal';

const CriminalSearch: React.FC = () => {
  const search = useCriminalSearch();
  const setDebouncedSearch = useSetCriminalDebounce();

  return (
    <TextInput
      icon={<IconSearch size={20} />}
      placeholder="Search profiles..."
      data-autofocus
      value={search}
      onChange={(e) => setDebouncedSearch(e.target.value.toLowerCase())}
    />
  );
};

export default CriminalSearch;
