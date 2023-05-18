import React from 'react';
import { Button, Stack, Text } from '@mantine/core';
import SelectedChargeItem from './SelectedChargeItem';

export interface SelectedCharge {
  label: string;
  count: number;
  involvement: 'actor' | 'accessory' | 'accomplice';
}

const SELECTED_CHARGES: SelectedCharge[] = [
  { label: 'Robbery of a financial institution', count: 1, involvement: 'actor' },
];

const SelectedChargesList: React.FC = () => {
  return (
    <Stack justify="space-between" h="100%">
      {SELECTED_CHARGES.map((charge) => (
        <SelectedChargeItem charge={charge} />
      ))}
      <Button color="blue" variant="light">
        Confirm
      </Button>
    </Stack>
  );
};

export default SelectedChargesList;
