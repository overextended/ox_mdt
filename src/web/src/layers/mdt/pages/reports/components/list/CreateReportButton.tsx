import React from 'react';
import { Box, Button } from '@mantine/core';
import { IconFileImport } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import locales from '../../../../../../locales';
import CreateReportModal from '../modals/CreateReportModal';
import { useCharacter } from '../../../../../../state';
import { hasPermission } from '../../../../../../helpers';

const CreateReportButton: React.FC = () => {
  const character = useCharacter();

  return (
    <Box>
      <Button
        fullWidth
        disabled={!hasPermission(character, 'create_report')}
        variant="light"
        leftIcon={<IconFileImport size={20} />}
        onClick={() => modals.open({ title: locales.create_report, size: 'sm', children: <CreateReportModal /> })}
      >
        {locales.create_report}
      </Button>
    </Box>
  );
};

export default CreateReportButton;
