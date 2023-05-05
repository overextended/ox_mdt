import React from 'react';
import { Button, createStyles } from '@mantine/core';

interface Props {
  label: string;
}

const useStyles = createStyles({
  button: {
    fontSize: '0.6785rem',
    lineHeight: 'normal',
  },
});

const BadgeButton: React.FC<Props> = ({ label }) => {
  const { classes } = useStyles();

  return (
    <Button size="xs" variant="light" radius="xl" h="20px" uppercase className={classes.button}>
      {label}
    </Button>
  );
};

export default BadgeButton;
