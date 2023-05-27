import React from 'react';
import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useReportsSearch, useSetReportsDebounce } from '../../../../state';

const ReportsSearch: React.FC = () => {
  const search = useReportsSearch();
  const setDebouncedSearch = useSetReportsDebounce();

  return (
    <TextInput
      icon={<IconSearch size={20} />}
      placeholder="Search anything..."
      value={search}
      onChange={(e) => setDebouncedSearch(e.target.value.toLowerCase())}
    />
  );
};

export default ReportsSearch;
