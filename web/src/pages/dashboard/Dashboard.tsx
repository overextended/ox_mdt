import React from 'react';
import { ActionIcon, Avatar, Box, Button, Group, Stack, Text, TextInput } from '@mantine/core';
import {
  IconBrandTelegram,
  IconClock,
  IconEdit,
  IconMessageCircle2,
  IconReceipt,
  IconSearch,
} from '@tabler/icons-react';
import AnnouncementList from './components/AnnoucementList';
import WarrantList from './components/WarrantList';

const Dashboard: React.FC = () => {
  return (
    <Box h="100%" sx={{ padding: 16 }}>
      <Group h="100%" spacing="md">
        <Stack
          p="md"
          sx={(theme) => ({
            flex: 1,
            height: '100%',
            backgroundColor: theme.colors.durple[6],
            borderRadius: theme.radius.md,
            boxShadow: theme.shadows.md,
          })}
        >
          <Group position="apart">
            <Text size="xl">Announcements</Text>
            <IconMessageCircle2 />
          </Group>
          <Box>
            <Button fullWidth variant="light" leftIcon={<IconBrandTelegram />}>
              Create announcement
            </Button>
          </Box>
          <AnnouncementList />
        </Stack>
        <Stack
          p="md"
          sx={(theme) => ({
            flex: 1,
            height: '100%',
            backgroundColor: theme.colors.durple[6],
            borderRadius: theme.radius.md,
            boxShadow: theme.shadows.md,
          })}
        >
          <Group position="apart">
            <Text size="xl">Active Warrants</Text>
            <IconReceipt />
          </Group>
          <TextInput
            placeholder="Search warants..."
            icon={<IconSearch size={20} />}
            styles={(theme) => ({
              input: {
                backgroundColor: theme.colors.durple[4],
                borderColor: 'transparent',
              },
            })}
          />
          <WarrantList />
        </Stack>
      </Group>
    </Box>
  );
};

export default Dashboard;
