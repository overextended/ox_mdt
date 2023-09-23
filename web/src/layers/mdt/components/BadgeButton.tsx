import React from 'react';
import { Button, ButtonProps, createStyles } from '@mantine/core';

interface Props extends ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const useStyles = createStyles({
  button: {
    fontSize: '0.6785rem',
    lineHeight: 'normal',
  },
});

const BadgeButton: React.ForwardRefRenderFunction<HTMLButtonElement, Props> = (props, ref) => {
  const { classes } = useStyles();

  return (
    <Button
      ref={ref}
      size="xs"
      variant="light"
      radius="xl"
      h="20px"
      uppercase
      disabled={props.disabled}
      className={classes.button}
      {...props}
      onClick={props.onClick}
    >
      {props.label}
    </Button>
  );
};

export default React.forwardRef(BadgeButton);
