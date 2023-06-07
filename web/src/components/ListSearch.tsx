import React from 'react';
import { IconSearch } from '@tabler/icons-react';
import { Atom, PrimitiveAtom, useAtomValue } from 'jotai';
import { TextInput } from '@mantine/core';

interface Props {
  valueAtom: Atom<string>;
  setDebouncedValue: (prev: string) => void;
}

const ListSearch: React.FC<Props> = ({ valueAtom, setDebouncedValue }) => {
  const search = useAtomValue(valueAtom);

  return (
    <TextInput
      icon={<IconSearch size={20} />}
      placeholder="Search anything..."
      value={search}
      onChange={(e) => setDebouncedValue(e.target.value.toLowerCase())}
    />
  );
};

export default ListSearch;
