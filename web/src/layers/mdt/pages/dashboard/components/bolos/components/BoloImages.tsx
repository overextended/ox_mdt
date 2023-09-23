import React from 'react';
import { Stack, Image, Box } from '@mantine/core';
import AddImagePopover from './AddImagePopover';
import BoloImage from './BoloImage';

const BoloImages: React.FC = () => {
  const [images, setImages] = React.useState<string[]>([]);

  return (
    <Box sx={{ height: '100%', overflow: 'scroll' }}>
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
