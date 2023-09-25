import React from 'react';
import { Box, Button, createStyles, Group, Stack } from '@mantine/core';
import locales from '../../../../../../../locales';
import Editor from '../../../../../components/Editor';
import BoloImages from '../components/BoloImages';
import { BOLO } from '../../../../../../../typings/bolo';
import { fetchNui } from '../../../../../../../utils/fetchNui';
import { modals } from '@mantine/modals';

interface Props {
  bolo?: BOLO;
}

const useStyles = createStyles({
  groupContainer: {
    alignItems: 'start',
    overflow: 'hidden',
  },
});

const CreateBoloModal: React.FC<Props> = ({ bolo }) => {
  const [value, setValue] = React.useState('');
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Stack h={500} justify="space-between">
      <Group h="100%" className={classes.groupContainer}>
        <Editor
          content={bolo?.contents}
          placeholder={locales.create_bolo_placeholder}
          onChange={(val) => setValue(val || '')}
          fillHeight
        />
        <BoloImages images={bolo?.images} />
      </Group>
      <Box>
        <Button
          variant="light"
          fullWidth
          loading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            await fetchNui(
              bolo ? 'editBOLO' : 'createBOLO',
              { contents: value, images: null, id: bolo?.id },
              {
                data: true,
                delay: 1500,
              }
            );
            setIsLoading(false);
            modals.closeAll();
          }}
        >
          {locales.confirm}
        </Button>
      </Box>
    </Stack>
  );
};

export default CreateBoloModal;
