import React from 'react';
import { ActionIcon, Badge, Box, Button, Checkbox, createStyles, Group, Select, Stack, Text } from '@mantine/core';
import { IconDeviceFloppy, IconPlus, IconTrash } from '@tabler/icons-react';
import BaseCard from './BaseCard';

const useStyles = createStyles((theme) => ({
  baseCard: {
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
}));

const ReportCriminals: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Box sx={{ overflowY: 'scroll' }}>
      <Stack>
        <Button variant="light" leftIcon={<IconPlus size={20} />}>
          Add criminal
        </Button>
        <BaseCard>
          <Group position="apart" noWrap>
            <Text size="xl">Archie Moss</Text>
            <Group spacing="xs">
              <ActionIcon color="red" variant="light">
                <IconTrash size={20} />
              </ActionIcon>
              <ActionIcon color="blue" variant="light">
                <IconDeviceFloppy size={20} />
              </ActionIcon>
            </Group>
          </Group>
          <Group spacing="xs">
            <Button
              size="xs"
              variant="light"
              radius="xl"
              h="20px"
              uppercase
              sx={{ fontSize: '0.6785rem', lineHeight: 'normal' }}
            >
              Edit charges
            </Button>
            <Badge>3x Evading & Eluding</Badge>
            <Badge>4x Resisting Arrest</Badge>
            <Badge>1x Robbery of a financial institution (Accomplice)</Badge>
          </Group>
          <Checkbox label="Issue warrant" description="Suspect hasn't been processed and charged" />
          <Select label="Reduction" data={['25%', '50%']} clearable placeholder="No reduction" />
          <Group position="apart">
            <Text size="xs">Time: 32 months</Text>
            <Text size="xs">Fine: $3,000</Text>
            <Text size="xs">Points: 2</Text>
          </Group>
          <Checkbox label="Pleaded guilty" />
        </BaseCard>
      </Stack>
    </Box>
  );
};

export default ReportCriminals;
