import React from 'react';
import { Box, createStyles, Stack } from '@mantine/core';
import AddImagePopover from './AddImagePopover';
import BoloImage from './BoloImage';
import { BOLO } from '../../../../../../../typings/bolo';

interface Props {
  images?: BOLO['images'];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const useStyles = createStyles({
  container: {
    height: '100%',
    overflow: 'scroll',
  },
});

const BoloImages: React.FC<Props> = (props) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Stack>
        <AddImagePopover setImages={props.setImages} />
        {props.images &&
          props.images.map((image, index) => (
            <BoloImage image={image} key={`${image}-${index}`} setImages={props.setImages} />
          ))}
      </Stack>
    </Box>
  );
};

export default BoloImages;
