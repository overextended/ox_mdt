import React from 'react';
import { Stack } from '@mantine/core';
import NotFound from '../../../../components/NotFound';
import { IconFileOff } from '@tabler/icons-react';
import locales from '../../../../../../locales';
import { useWarrants } from '../../../../../../state/dashboard/warrants';
import WarrantCard from './WarrantCard';

const WarrantList: React.FC = () => {
  const warrants = useWarrants();

  return (
    <Stack sx={{ overflow: 'auto' }}>
      {warrants.length > 0 ? (
        warrants.map((warrant) => <WarrantCard key={warrant.reportId} warrant={warrant} />)
      ) : (
        <NotFound icon={IconFileOff} label={locales.no_active_warrants} />
      )}
    </Stack>
  );
};

export default WarrantList;
