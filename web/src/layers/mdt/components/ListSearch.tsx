import React from 'react';
import { IconSearch } from '@tabler/icons-react';
import { Atom, PrimitiveAtom, useAtomValue } from 'jotai';
import { TextInput } from '@mantine/core';
import locales from '../../../locales';

interface Props {
  valueAtom: Atom<string>;
  setDebouncedValue: (prev: string) => void;
  placeholder?: string;
}

const ListSearch: React.FC<Props> = ({ valueAtom, setDebouncedValue, placeholder }) => {
  const search = useAtomValue(valueAtom);

  return (
    <TextInput
      icon={<IconSearch size={20} />}
      placeholder={placeholder || locales.search}
      value={search}
      onChange={(e) => setDebouncedValue(e.target.value)}
    />
  );
};

export default ListSearch;
