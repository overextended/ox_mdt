import React from 'react';
import { Box, Button, Center, createStyles, Group, Loader, Stack, Text, TextInput } from '@mantine/core';
import { IconBrandTelegram, IconMessageCircle2, IconPrison, IconSearch } from '@tabler/icons-react';
import AnnouncementList from './components/AnnouncementList';
import WarrantList from './components/WarrantList';
import { modals } from '@mantine/modals';
import AnnouncementModal from './components/AnnouncementModal';
import { useConfig } from '../../state/config';
import { useCharacter } from '../../state';
import { queryClient } from '../../main';
import { Announcement, ReportCard } from '../../typings';
import locales from '../../locales';

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
}));

const Dashboard: React.FC = () => {
  const { classes } = useStyles();
  const config = useConfig();
  const character = useCharacter();

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
    <Group h="100%" spacing="md">
      <Stack p="md" className={classes.container}>
        <Group position="apart">
          <Text size="xl">Announcements</Text>
          <IconMessageCircle2 />
        </Group>
        <Box>
          <Button
            disabled={character.grade < config.permissions.announcements.create}
            fullWidth
            variant="light"
            leftIcon={<IconBrandTelegram />}
            onClick={() =>
              modals.open({
                title: locales.create_announcement,
                centered: true,
                children: <AnnouncementModal />,
              })
            }
          >
            {locales.create_announcement}
          </Button>
        </Box>
        <React.Suspense
          fallback={
            <Center>
              <Loader />
            </Center>
          }
        >
          <AnnouncementList />
        </React.Suspense>
      </Stack>
      <Stack p="md" className={classes.container}>
        <Group position="apart">
          <Text size="xl">Active Warrants</Text>
          <IconPrison />
        </Group>
        <TextInput placeholder="Search warants..." icon={<IconSearch size={20} />} />
        <WarrantList />
      </Stack>
    </Group>
  );
};

export default Dashboard;
