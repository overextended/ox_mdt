import React from 'react';
import { Divider, Grid, Stack, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import ChargeCardsList from './ChargeCardsList';
import SelectedChargesList from './SelectedChargesList';
import { PrimitiveAtom } from 'jotai';
import { Criminal } from '../../../../../state';

const EditChargesModal: React.FC<{ criminalAtom: PrimitiveAtom<Criminal> }> = ({ criminalAtom }) => {
  return (
    <Grid grow h="100%" sx={{ overflow: 'hidden' }}>
      <Grid.Col span={7}>
        <Stack h="100%">
          <TextInput icon={<IconSearch size={20} />} placeholder="Search charges..." />
          <ChargeCardsList />
        </Stack>
      </Grid.Col>
      <Divider orientation="vertical" sx={{ marginBottom: '8px' }} />
      <Grid.Col span={3}>
        <SelectedChargesList criminalAtom={criminalAtom} />
      </Grid.Col>
    </Grid>
  );
};

export default EditChargesModal;
