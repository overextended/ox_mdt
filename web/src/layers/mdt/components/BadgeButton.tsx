import React from 'react';
import { Button, ButtonProps, createStyles } from '@mantine/core';

interface Props extends ButtonProps {
  label: string;
  onClick?: () => void;
}

const useStyles = createStyles({
  button: {
    fontSize: '0.6785rem',
    lineHeight: 'normal',
  },
});

const BadgeButton: React.FC<Props> = (props) => {
  const { classes } = useStyles();

  return (
    <Button
      size="xs"
      variant="light"
      radius="xl"
      h="20px"
      uppercase
      className={classes.button}
      {...props}
      onClick={props.onClick}
    >
      {props.label}
    </Button>
  );
};

export default BadgeButton;
