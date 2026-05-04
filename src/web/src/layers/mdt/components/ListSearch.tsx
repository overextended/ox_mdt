import React from 'react';
import { IconSearch } from '@tabler/icons-react';
import { Atom, useAtomValue } from 'jotai';
import { TextInput } from '@mantine/core';
import locales from '../../../locales';

interface Props {
  valueAtom: Atom<string>;
  setDebouncedValue: (prev: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

const ListSearch: React.FC<Props> = ({ valueAtom, setDebouncedValue, placeholder, style }) => {
  const search = useAtomValue(valueAtom);

  return (
    <TextInput
      icon={<IconSearch size={20} />}
      placeholder={placeholder || locales.search}
      value={search}
      style={style}
      onChange={(e) => setDebouncedValue(e.target.value)}
    />
  );
};

export default ListSearch;
