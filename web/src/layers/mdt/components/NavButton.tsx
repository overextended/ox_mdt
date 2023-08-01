import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createStyles, Group, Stack, Text, Tooltip, UnstyledButton } from '@mantine/core';

const useStyles = createStyles((theme, params: { isSmall?: boolean; isActive?: boolean }) => {
  const colors = theme.fn.variant({ color: 'blue', variant: 'light' });

  return {
    button: {
      color: params.isActive ? colors.color : theme.colors.dark[0],
      backgroundColor: params.isActive ? colors.background : undefined,
      padding: !params.isSmall ? theme.spacing.md : 8,
      borderRadius: theme.radius.md,
      fontWeight: 500,
      transition: '150ms',
      width: params.isSmall ? 50 : undefined,
      '&:hover': !params.isActive && { backgroundColor: theme.colors.durple[2], color: 'white' },
    },
  };
});

const NavButton: React.FC<{
  icon: React.ComponentType;
  label: string;
  path: string;
  isActive: boolean;
  isSmall?: boolean;
}> = (props) => {
  const navigate = useNavigate();
  const { classes } = useStyles({ isSmall: props.isSmall, isActive: props.isActive });

  return (
    <UnstyledButton onClick={() => navigate(props.path)} className={classes.button}>
      {!props.isSmall ? (
        <Group>
          <props.icon />
          <Text>{props.label}</Text>
        </Group>
      ) : (
        <Tooltip label={props.label} position="right">
          <Stack align="center">
            <props.icon />
          </Stack>
        </Tooltip>
      )}
    </UnstyledButton>
  );
};

export default React.memo(NavButton);
