import React from 'react';
import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useOfficersSearch, useSetOfficersDebounce } from '../../../../../../../state';
import locales from '../../../../../../../locales';

const OfficerSearch: React.FC = () => {
  const search = useOfficersSearch();
  const setDebouncedSearch = useSetOfficersDebounce();

  return (
    <TextInput
      icon={<IconSearch size={20} />}
      placeholder={locales.search_officers}
      data-autofocus
      value={search}
      onChange={(e) => setDebouncedSearch(e.target.value)}
    />
  );
};

export default OfficerSearch;
