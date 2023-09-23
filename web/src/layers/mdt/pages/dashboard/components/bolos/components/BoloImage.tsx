import React from 'react';
import { ActionIcon, createStyles, Image, Stack } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

const useStyles = createStyles({
  container: {
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    overflow: 'visible',
  },
});

const BoloImage: React.FC<{ image: string; setImages: React.Dispatch<React.SetStateAction<string[]>> }> = ({
  image,
  setImages,
}) => {
  const { classes } = useStyles();

  return (
    <Stack className={classes.container}>
      <Image src={image} width={105} height={105} radius="sm" />
      <ActionIcon
        className={classes.iconButton}
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
