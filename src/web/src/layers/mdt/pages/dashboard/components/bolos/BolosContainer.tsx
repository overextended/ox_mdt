import React from 'react';
import { Box, Button } from '@mantine/core';
import CardTitle from '../../../../components/CardTitle';
import { IconEye, IconPlus } from '@tabler/icons-react';
import locales from '../../../../../../locales';
import { modals } from '@mantine/modals';
import CreateBoloModal from './modals/CreateBoloModal';
import SuspenseLoader from '../../../../components/SuspenseLoader';
import BoloList from './components/BoloList';
import { useCharacter } from '../../../../../../state';
import { hasPermission } from '../../../../../../helpers';

const BolosContainer: React.FC = () => {
  const character = useCharacter();

  return (
    <>
      <CardTitle title={locales.bolos} icon={<IconEye />} />
      <Box>
        <Button
          variant="light"
          fullWidth
          leftIcon={<IconPlus size={20} />}
          disabled={!hasPermission(character, 'create_bolo')}
          onClick={() => modals.open({ title: locales.create_bolo, children: <CreateBoloModal />, size: 'lg' })}
        >
          {locales.create_bolo}
        </Button>
      </Box>
      <React.Suspense fallback={<SuspenseLoader />}>
        <BoloList />
      </React.Suspense>
    </>
  );
};

export default BolosContainer;
