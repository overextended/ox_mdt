import React from 'react';
import { createStyles, Stack } from '@mantine/core';

interface Props {
  children: React.ReactNode;
  h?: number;
}

const useSyles = createStyles((theme) => ({
  baseCard: {
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
}));

const BaseCard: React.FC<Props> = ({ children, h }) => {
  const { classes } = useSyles();

  return (
    <Stack className={classes.baseCard} p="md" h={h}>
      {children}
    </Stack>
  );
};

export default BaseCard;
