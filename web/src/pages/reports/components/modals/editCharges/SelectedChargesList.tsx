import React from 'react';
import { Button, Stack, Text } from '@mantine/core';
import SelectedChargeItem from './SelectedChargeItem';
import { useSelectedCharges } from '../../../../../state/reports/editCharges';

const SelectedChargesList: React.FC = () => {
  const selectedCharges = useSelectedCharges();

  return (
    <Stack justify="space-between" h="100%" sx={{ overflowY: 'scroll' }}>
      <Stack spacing="xs" sx={{ overflowY: 'scroll' }}>
        {selectedCharges.map((chargeAtom) => (
          <SelectedChargeItem chargeAtom={chargeAtom} />
        ))}
      </Stack>
      <Button color="blue" variant="light">
        Confirm
      </Button>
    </Stack>
  );
};

export default SelectedChargesList;

export class SelectedCharge {}
