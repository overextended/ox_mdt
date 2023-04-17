import React from 'react';
import { ActionIcon, Box, Button, Group, Stack, Text } from '@mantine/core';
import { IconBrandTelegram, IconClock, IconEdit, IconMessageCircle2, IconReceipt } from '@tabler/icons-react';

const Dashboard: React.FC = () => {
  return (
    <Box h="100%" sx={{ padding: 16 }}>
      <Group h="100%" spacing="md">
        <Box
          sx={(theme) => ({
            width: '50%',
            height: '100%',
            backgroundColor: theme.colors.durple[6],
            borderRadius: theme.radius.md,
            boxShadow: theme.shadows.md,
          })}
        >
          <Stack p="md" justify="center">
            <Group position="apart">
              <Text size="xl">Announcements</Text>
              <IconMessageCircle2 />
            </Group>
            <Stack>
              <Button variant="light" leftIcon={<IconBrandTelegram />}>
                Create announcement
              </Button>
              <Stack
                sx={(theme) => ({
                  backgroundColor: theme.colors.durple[4],
                  borderRadius: theme.radius.md,
                  shadow: theme.shadows.xl,
                })}
                p="md"
              >
                <Group position="apart">
                  <Stack spacing={0}>
                    <Text fw={500}>Svetozar Miletić - 132</Text>
                    <Text size="xs" c="dark.2">
                      17/04/2023
                    </Text>
                  </Stack>
                  <ActionIcon>
                    <IconEdit />
                  </ActionIcon>
                </Group>
                <Text size="sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aut earum eius minima modi molestias
                  possimus quis repellendus sint sunt? Excepturi explicabo in quo, reprehenderit temporibus ullam.
                  Aspernatur doloribus ducimus earum eius eum illum ipsum iure modi neque officia perspiciatis placeat
                  quasi, quos saepe sequi sint tempora totam veniam vitae?
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Stack h="100%" sx={{ flex: 1 }}>
          <Box
            sx={(theme) => ({
              height: '50%',
              backgroundColor: theme.colors.durple[6],
              borderRadius: theme.radius.md,
              boxShadow: theme.shadows.md,
            })}
          >
            <Stack p="md" justify="center">
              <Group position="apart">
                <Text size="xl">Active Warrants</Text>
                <IconReceipt />
              </Group>
              Pog
            </Stack>
          </Box>
          <Box
            sx={(theme) => ({
              height: '50%',
              backgroundColor: theme.colors.durple[6],
              borderRadius: theme.radius.md,
              boxShadow: theme.shadows.md,
            })}
          >
            <Stack p="md" justify="center">
              <Group position="apart">
                <Text size="xl">Latest Reports</Text>
                <IconClock />
              </Group>
              Pog
            </Stack>
          </Box>
        </Stack>
      </Group>
    </Box>
  );
};

export default Dashboard;
