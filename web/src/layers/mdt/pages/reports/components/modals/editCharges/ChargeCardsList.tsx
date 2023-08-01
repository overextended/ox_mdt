import React from 'react';
import { Box, SimpleGrid } from '@mantine/core';
import ChargeCard from './ChargeCard';
import { useCharges } from '../../../../../../../state/charges';

const ChargeCardsList: React.FC = () => {
  const charges = useCharges();

  return (
    <Box sx={{ flex: '1 1 0', overflowY: 'scroll' }}>
      <SimpleGrid cols={3} spacing="xs">
        {charges.map((charge) => (
          <ChargeCard charge={charge} key={`${charge.label}-${charge.description}`} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ChargeCardsList;
