import React from 'react';
import { useCharacter } from '../../../state';
import { Avatar, Box, createStyles, Group, Stack, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  container: {
    background: theme.colors.durple[4],
    borderRadius: theme.radius.md,
    padding: 8,
  },
}));

const NavCharacter: React.FC = () => {
  const character = useCharacter();
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Group noWrap>
        <Avatar color="blue" radius="md" src={character.image} />
        <Stack spacing={0} sx={{ overflow: 'hidden' }}>
          <Text truncate color="dark.0">
            {character.firstName} {character.lastName}
          </Text>
          <Text truncate size="xs" color="dark.2">
            {character.title}
          </Text>
        </Stack>
      </Group>
    </Box>
  );
};

export default NavCharacter;
