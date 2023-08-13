import React from 'react';
import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useCriminalSearch, useSetCriminalDebounce } from '../../../../../../../state';
import locales from '../../../../../../../locales';

const CriminalSearch: React.FC = () => {
  const search = useCriminalSearch();
  const setDebouncedSearch = useSetCriminalDebounce();

  return (
    <TextInput
      icon={<IconSearch size={20} />}
      placeholder={locales.search_profiles}
      data-autofocus
      value={search}
      onChange={(e) => setDebouncedSearch(e.target.value)}
    />
  );
};

export default CriminalSearch;
