import React from 'react';
import { Avatar, createStyles, Group, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { IconSearch, IconUsers } from '@tabler/icons-react';
import ProfilesList from './ProfilesList';

const useStyles = createStyles((theme) => ({
  container: {
    overflow: 'hidden',
    height: '100%',
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
}));

const Profiles: React.FC = () => {
  const { classes } = useStyles();

  return (
    <SimpleGrid cols={3} h="100%">
      <Stack className={classes.container} p="md">
        <Group position="apart">
          <Text size="xl">Profiles</Text>
          <IconUsers />
        </Group>
        <TextInput icon={<IconSearch size={20} />} placeholder="Search anything..." />
        <ProfilesList />
      </Stack>
    </SimpleGrid>
  );
};

export default Profiles;
