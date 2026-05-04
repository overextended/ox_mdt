import React from 'react';
import { createStyles, Group, Stack, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  infoContainer: {
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    padding: 16,
  },
}));

interface Props {
  title: string;
  icon: React.ComponentType | string;
  children: React.ReactNode;
}

const ProfileCard: React.FC<Props> = (props) => {
  const { classes } = useStyles();

  return (
    <Stack className={classes.infoContainer}>
      <Group position="apart">
        <Text size="lg">{props.title}</Text>
        {typeof props.icon === 'string' ? (
          <i className={`ti ti-${props.icon}`} style={{ fontSize: 24 }} />
        ) : (
          <props.icon />
        )}
      </Group>
      {props.children}
    </Stack>
  );
};

export default ProfileCard;
