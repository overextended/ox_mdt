import React from 'react';
import { Button, createStyles } from '@mantine/core';

interface Props {
  label: string;
  onClick?: () => void;
}

const useStyles = createStyles({
  button: {
    fontSize: '0.6785rem',
    lineHeight: 'normal',
  },
});

const BadgeButton: React.FC<Props> = ({ label, onClick }) => {
  const { classes } = useStyles();

  return (
    <Button size="xs" variant="light" radius="xl" h="20px" uppercase className={classes.button} onClick={onClick}>
      {label}
    </Button>
  );
};

export default BadgeButton;
