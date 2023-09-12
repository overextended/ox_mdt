import React from 'react';
import { Divider, Grid, Stack } from '@mantine/core';
import ChargeCardsList from './ChargeCardsList';
import SelectedChargesList from './SelectedChargesList';
import { PrimitiveAtom } from 'jotai';
import { Charge, Criminal } from '../../../../../../../typings';
import {
  chargeSearchAtoms,
  useInfiniteCharges,
  useSetChargeSearchDebounceValue,
} from '../../../../../../../state/charges';
import { queryClient } from '../../../../../../../main';
import ListSearch from '../../../../../components/ListSearch';
import ListContainer from '../../../../../components/ListContainer';

const EditChargesModal: React.FC<{ criminalAtom: PrimitiveAtom<Criminal> }> = ({ criminalAtom }) => {
  const [data] = useInfiniteCharges();
  const setChargeSearchDebounceValue = useSetChargeSearchDebounceValue();

  React.useEffect(() => {
    return () => {
      queryClient.setQueriesData<{ pageParams: number[]; pages: [string, Charge[]][] }>(
        ['charges'],
        (data) =>
          data && {
            pages: data.pages.slice(0, 1),
            pageParams: data.pageParams.slice(0, 1),
          }
      );
    };
  }, []);

  return (
    <Grid grow h="100%" sx={{ overflow: 'hidden' }}>
      <Grid.Col span={7}>
        <Stack h="100%">
          <ListSearch valueAtom={chargeSearchAtoms.currentValueAtom} setDebouncedValue={setChargeSearchDebounceValue} />
          <ListContainer
            debounceAtom={chargeSearchAtoms.isDebouncingAtom}
            ListComponent={ChargeCardsList}
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
