import React from 'react';
import { PrimitiveAtom, useAtomValue } from 'jotai';
import SuspenseLoader from './SuspenseLoader';

interface Props {
  debounceAtom: PrimitiveAtom<boolean>;
  setDebouncedSearch: (prev: string) => void;
  ListComponent: React.ComponentType;
  ListComponentProps?: any;
}

const ListContainer: React.FC<Props> = ({ debounceAtom, setDebouncedSearch, ListComponent, ListComponentProps }) => {
  const isDebouncing = useAtomValue(debounceAtom);

  React.useEffect(() => {
    return () => setDebouncedSearch('');
  }, []);

  return (
    <React.Suspense fallback={<SuspenseLoader />}>
      {isDebouncing ? <SuspenseLoader /> : <ListComponent {...ListComponentProps} />}
    </React.Suspense>
  );
};

export default ListContainer;
