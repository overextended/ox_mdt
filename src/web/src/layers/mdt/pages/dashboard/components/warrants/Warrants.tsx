import React from 'react';
import { Stack } from '@mantine/core';
import ListSearch from '../../../../components/ListSearch';
import ListContainer from '../../../../components/ListContainer';
import { useSetWarrantsDebounce, warrantsSearchAtoms } from '../../../../../../state/dashboard/warrants';
import WarrantList from './WarrantList';
import locales from '../../../../../../locales';

const Warrants: React.FC = () => {
  const setWarrantsSearchDebounce = useSetWarrantsDebounce();

  return (
    <Stack>
      <ListSearch
        valueAtom={warrantsSearchAtoms.currentValueAtom}
        setDebouncedValue={setWarrantsSearchDebounce}
        placeholder={locales.search_warrants}
      />
      <ListContainer
        ListComponent={WarrantList}
        setDebouncedSearch={setWarrantsSearchDebounce}
        debounceAtom={warrantsSearchAtoms.isDebouncingAtom}
      />
    </Stack>
  );
};

export default Warrants;
