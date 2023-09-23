import React from 'react';
import { Stack, Image, Box, createStyles } from '@mantine/core';
import AddImagePopover from './AddImagePopover';
import BoloImage from './BoloImage';

const useStyles = createStyles({
  container: {
    height: '100%',
    overflow: 'scroll',
  },
});

const BoloImages: React.FC = () => {
  const [images, setImages] = React.useState<string[]>([]);
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
