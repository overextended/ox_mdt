import React from 'react';
import { Box, createStyles, Image, Stack } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

const useStyles = createStyles({
  container: {
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    overflow: 'visible',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  },
  image: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const BoloImage: React.FC<{ image: string; setImages: React.Dispatch<React.SetStateAction<string[]>> }> = ({
  image,
  setImages,
}) => {
  const { classes } = useStyles();
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <Stack className={classes.container}>
      <Image
        src={image}
        width={105}
        height={105}
        radius="sm"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={classes.image}
        onClick={() => setImages((prev) => prev.filter((img) => img !== image))}
      />
      {isHovering && (
        <Box className={classes.iconButton} c="red.5">
          <IconTrash size={32} />
        </Box>
      )}
    </Stack>
  );
};

export default BoloImage;
