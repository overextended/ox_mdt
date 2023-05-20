import React from 'react';
import { Button, Stack, Text } from '@mantine/core';
import SelectedChargeItem from './SelectedChargeItem';
import { useSelectedCharges } from '../../../../../state/reports/editCharges';
import { IconReceiptOff } from '@tabler/icons-react';

const SelectedChargesList: React.FC = () => {
  const selectedCharges = useSelectedCharges();

  return (
    <Stack justify="space-between" h="100%" sx={{ overflowY: 'scroll' }}>
      <Stack spacing="xs" sx={{ overflowY: 'scroll' }}>
        {selectedCharges.length > 0 ? (
          selectedCharges.map((chargeAtom, index) => <SelectedChargeItem chargeAtom={chargeAtom} index={index} />)
        ) : (
          <Stack justify="center" align="center" c="dark.2" spacing={0}>
            <IconReceiptOff size={36} />
            <Text size="xl">No selected charges</Text>
          </Stack>
        )}
      </Stack>
      <Button color="blue" variant="light">
        Confirm
      </Button>
    </Stack>
  );
};

export default SelectedChargesList;

export class SelectedCharge {}
