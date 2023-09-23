import React from 'react';
import { Box, Button, createStyles, Group, Stack } from '@mantine/core';
import locales from '../../../../../../../locales';
import Editor from '../../../../../components/Editor';
import BoloImages from '../components/BoloImages';

const useStyles = createStyles({
  groupContainer: {
    alignItems: 'start',
    overflow: 'hidden',
  },
});

const CreateBoloModal: React.FC = () => {
  const [value, setValue] = React.useState('');
  const { classes } = useStyles();

  return (
    <Stack h={500} justify="space-between">
      <Group h="100%" className={classes.groupContainer}>
        <Editor placeholder={locales.create_bolo_placeholder} onChange={(val) => setValue(val || '')} fillHeight />
        <BoloImages />
      </Group>
      <Box>
        <Button variant="light" fullWidth onClick={() => {}}>
          {locales.confirm}
        </Button>
      </Box>
    </Stack>
  );
};

export default CreateBoloModal;
