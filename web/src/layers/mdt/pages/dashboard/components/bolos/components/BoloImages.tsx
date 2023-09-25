import React from 'react';
import { Stack, Image, Box, createStyles } from '@mantine/core';
import AddImagePopover from './AddImagePopover';
import BoloImage from './BoloImage';
import { BOLO } from '../../../../../../../typings/bolo';

interface Props {
  images?: BOLO['images'];
}

const useStyles = createStyles({
  container: {
    height: '100%',
    overflow: 'scroll',
  },
});

const BoloImages: React.FC<Props> = (props) => {
  const [images, setImages] = React.useState<string[]>(props.images || []);
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Stack>
        <AddImagePopover setImages={setImages} />
        {images.map((image, index) => (
          <BoloImage image={image} key={`${image}-${index}`} setImages={setImages} />
        ))}
      </Stack>
    </Box>
  );
};

export default BoloImages;
