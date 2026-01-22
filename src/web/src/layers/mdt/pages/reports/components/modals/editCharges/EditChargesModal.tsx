import React from 'react';
import { Divider, Grid, Stack } from '@mantine/core';
import ChargeCardsList from './ChargeCardsList';
import SelectedChargesList from './SelectedChargesList';
import { PrimitiveAtom } from 'jotai';
import { Criminal } from '../../../../../../../typings';
import { chargeSearchAtoms, useInfiniteCharges, useSetChargeSearchDebounceValue } from '../../../../../../../state';
import ListSearch from '../../../../../components/ListSearch';
import ListContainer from '../../../../../components/ListContainer';
import { removePages } from '../../../../../../../helpers';

const EditChargesModal: React.FC<{ criminalAtom: PrimitiveAtom<Criminal> }> = ({ criminalAtom }) => {
  const [data] = useInfiniteCharges();
  const setChargeSearchDebounceValue = useSetChargeSearchDebounceValue();

  React.useEffect(() => {
    return () => removePages(['charges']);
  }, []);

  return (
    <Grid grow h="100%" sx={{ overflow: 'hidden' }}>
      <Grid.Col span={7}>
        <Stack h="100%">
          <ListSearch valueAtom={chargeSearchAtoms.currentValueAtom} setDebouncedValue={setChargeSearchDebounceValue} />
          <ListContainer
            debounceAtom={chargeSearchAtoms.isDebouncingAtom}
            ListComponent={ChargeCardsList}
            ListComponentProps={{ addButton: true }}
            setDebouncedSearch={setChargeSearchDebounceValue}
          />
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
