import React from 'react';
import { createStyles, Group, Stack, Text } from '@mantine/core';

interface Props {
  author: string;
  date: string;
  id: string;
  title: string;
}

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.durple[4],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    '&:hover': {
      backgroundColor: theme.colors.durple[2],
      cursor: 'pointer',
    },
  },
}));

const ProfileReport: React.FC<Props> = (props) => {
  const { classes } = useStyles();

  return (
    <Stack className={classes.container} p="md" spacing={0}>
      <Text>{props.title}</Text>
      <Group position="apart">
        <Text size="xs" color="dark.2">
          {props.author} - {props.date}
        </Text>
        <Text size="xs" color="dark.2">
          #{props.id}
        </Text>
      </Group>
    </Stack>
  );
};

export default ProfileReport;
