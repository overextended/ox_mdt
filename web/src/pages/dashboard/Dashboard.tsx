import React from 'react';
import { Box, Button, createStyles, Group, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { IconBrandTelegram, IconMessageCircle2, IconPrison, IconSearch } from '@tabler/icons-react';
import AnnouncementList from './components/AnnoucementList';
import WarrantList from './components/WarrantList';
import { modals } from '@mantine/modals';
import AnnouncementModal from './components/AnnouncementModal';

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

  return (
    <Group h="100%" spacing="md">
      <Stack p="md" className={classes.container}>
        <Group position="apart">
          <Text size="xl">Announcements</Text>
          <IconMessageCircle2 />
        </Group>
        <Box>
          <Button
            fullWidth
            variant="light"
            leftIcon={<IconBrandTelegram />}
            onClick={() =>
              modals.open({
                title: 'Create announcement',
                centered: true,
                // TODO: RTE support
                children: <AnnouncementModal />,
              })
            }
          >
            Create announcement
          </Button>
        </Box>
        <AnnouncementList />
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
