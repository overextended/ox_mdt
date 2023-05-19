import React from 'react';
import { SimpleGrid } from '@mantine/core';
import ChargeCard from './ChargeCard';
import { useCharges } from '../../../../../state/charges';

const ChargeCardsList: React.FC = () => {
  const charges = useCharges();

  return (
    <SimpleGrid cols={3} spacing="xs">
      {charges.map((charge) => (
        <ChargeCard charge={charge} />
      ))}
    </SimpleGrid>
  );
};

export default ChargeCardsList;
