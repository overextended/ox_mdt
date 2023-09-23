import React from 'react';
import { Button, Stack } from '@mantine/core';
import CardTitle from '../../../../components/CardTitle';
import { IconEye, IconPlus } from '@tabler/icons-react';
import locales from '../../../../../../locales';
import { modals } from '@mantine/modals';
import CreateBoloModal from './modals/CreateBoloModal';

const BolosContainer: React.FC = () => {
  return (
    <Stack>
      <CardTitle title={locales.bolos} icon={<IconEye />} />
      <Button
        variant="light"
        leftIcon={<IconPlus size={20} />}
        onClick={() => modals.open({ title: locales.create_bolo, children: <CreateBoloModal />, size: 'lg' })}
      >
        {locales.create_bolo}
      </Button>
    </Stack>
  );
};

export default BolosContainer;
