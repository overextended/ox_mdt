import React from 'react';
import { createStyles, SimpleGrid, Stack } from '@mantine/core';
import { queryClient } from '../../../../main';
import { Announcement } from '../../../../typings';
import AnnouncementsContainer from './components/announcements/AnnouncementsContainer';
import WarrantsContainer from './components/warrants/WarrantsContainer';
import CardTitle from '../../components/CardTitle';
import { IconEye } from '@tabler/icons-react';
import BolosContainer from './components/bolos/BolosContainer';

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
    return () => {
      queryClient.setQueriesData<{ pages: Announcement[][]; pageParams: number[] }>(['announcements'], (data) => {
        if (!data) return;

        return {
          pages: [data.pages[0]],
          pageParams: [data.pageParams[0]],
        };
      });
    };
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
