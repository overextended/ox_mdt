import React from 'react';
import { ActionIcon, Image, Stack } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

const BoloImage: React.FC<{ image: string; setImages: React.Dispatch<React.SetStateAction<string[]>> }> = ({
  image,
  setImages,
}) => {
  return (
    <Stack sx={{ position: 'relative', overflow: 'visible' }}>
      <Image src={image} width={105} height={105} radius="sm" />
      <ActionIcon
        sx={{ position: 'absolute', top: 0, right: 0, overflow: 'visible' }}
        variant="filled"
        color="red"
        radius="sm"
        size="xs"
        onClick={() => setImages((prev) => prev.filter((img) => img !== image))}
      >
        <IconX />
      </ActionIcon>
    </Stack>
  );
};

export default BoloImage;
