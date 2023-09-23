import React from 'react';
import { Box, Button, Group, Stack } from '@mantine/core';
import locales from '../../../../../../../locales';
import Editor from '../../../../../components/Editor';
import BoloImages from '../components/BoloImages';

const CreateBoloModal: React.FC = () => {
  const [value, setValue] = React.useState('');

  return (
    <Stack h={500} justify="space-between">
      <Group h="100%" sx={{ alignItems: 'start', overflow: 'hidden' }}>
        <Editor placeholder={locales.create_bolo_placeholder} onChange={(val) => setValue(val || '')} fillHeight />
        <BoloImages />
      </Group>
      <Box>
        <Button variant="light" fullWidth>
          {locales.confirm}
        </Button>
      </Box>
    </Stack>
  );
};

export default CreateBoloModal;
