import React from 'react';
import { Divider, Grid, Stack, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import ChargeCardsList from './ChargeCardsList';
import SelectedChargesList from './SelectedChargesList';
import { PrimitiveAtom } from 'jotai';
import { Charge, Criminal } from '../../../../../../../typings';
import locales from '../../../../../../../locales';
import { useInfiniteCharges } from '../../../../../../../state/charges';
import { queryClient } from '../../../../../../../main';

const EditChargesModal: React.FC<{ criminalAtom: PrimitiveAtom<Criminal> }> = ({ criminalAtom }) => {
  const [data] = useInfiniteCharges();

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
          <TextInput icon={<IconSearch size={20} />} placeholder={locales.search_charges} />
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
