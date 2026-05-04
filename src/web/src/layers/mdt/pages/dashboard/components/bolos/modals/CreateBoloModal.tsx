import React from 'react';
import { createStyles, Group, Stack } from '@mantine/core';
import locales from '../../../../../../../locales';
import Editor from '../../../../../components/Editor';
import BoloImages from '../components/BoloImages';
import { BOLO } from '../../../../../../../typings/bolo';
import ConfirmBoloButton from '../components/ConfirmBoloButton';

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
  const [value, setValue] = React.useState(bolo?.contents || '');
  const [images, setImages] = React.useState<string[]>(bolo?.images || []);
  const { classes } = useStyles();

  return (
    <Stack h={500} justify="space-between">
      <Group h="100%" className={classes.groupContainer}>
        <Editor
          content={bolo?.contents}
          placeholder={locales.create_bolo_placeholder}
          onChange={(val) => setValue(val || '')}
          fillHeight
        />
        <BoloImages images={images} setImages={setImages} />
      </Group>
      <ConfirmBoloButton bolo={bolo} value={value} images={images} />
    </Stack>
  );
};

export default CreateBoloModal;
