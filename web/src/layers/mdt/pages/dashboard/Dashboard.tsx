import React from 'react';
import { createStyles, SimpleGrid, Stack } from '@mantine/core';
import AnnouncementsContainer from './components/announcements/AnnouncementsContainer';
import WarrantsContainer from './components/warrants/WarrantsContainer';
import BolosContainer from './components/bolos/BolosContainer';
import { removePages } from '../../../../helpers';

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    overflow: 'scroll',
  },
}));

const Dashboard: React.FC = () => {
  const { classes } = useStyles();

  React.useEffect(() => {
    return () => removePages(['announcements']);
  }, []);

  return (
    <SimpleGrid cols={3} h="100%" spacing="xs">
      <Stack p="md" className={classes.container}>
        <AnnouncementsContainer />
      </Stack>
      <Stack p="md" className={classes.container}>
        <WarrantsContainer />
      </Stack>
      <Stack p="md" className={classes.container}>
        <BolosContainer />
      </Stack>
    </SimpleGrid>
  );
};

export default Dashboard;
