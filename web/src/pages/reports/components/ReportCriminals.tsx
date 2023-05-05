import React from 'react';
import { ActionIcon, Badge, Box, Button, Checkbox, createStyles, Group, Select, Stack, Text } from '@mantine/core';
import { IconDeviceFloppy, IconPlus, IconTrash } from '@tabler/icons-react';
import BaseCard from './BaseCard';
import { useActiveReport } from '../../../state';
import BadgeButton from '../../../components/BadgeButton';

const ReportCriminals: React.FC = () => {
  const report = useActiveReport();

  return (
    <Box sx={{ overflowY: 'scroll' }}>
      <Stack>
        <Button variant="light" leftIcon={<IconPlus size={20} />}>
          Add criminal
        </Button>
        {report?.criminals &&
          report.criminals.map((criminal) => (
            <BaseCard key={criminal.name}>
              <Group position="apart" noWrap>
                <Text size="xl">{criminal.name}</Text>
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
                <BadgeButton label="Edit Charges" />
                {criminal.charges.map((charge) => (
                  <Badge key={charge.label}>
                    {charge.count}x {charge.label}
                  </Badge>
                ))}
              </Group>
              <Checkbox
                label="Issue warrant"
                description="Suspect hasn't been processed and charged"
                defaultChecked={criminal.issueWarrant}
              />
              <Select label="Reduction" data={['25%', '50%']} clearable placeholder="No reduction" />
              <Group position="apart">
                <Text size="xs">Time: {criminal.penalty?.time || 0} months</Text>
                <Text size="xs">Fine: ${criminal.penalty?.fine || 0}</Text>
                <Text size="xs">Points: {criminal.penalty?.points || 0}</Text>
              </Group>
              <Checkbox label="Pleaded guilty" defaultChecked={criminal.pleadedGuilty} />
            </BaseCard>
          ))}
      </Stack>
    </Box>
  );
};

export default ReportCriminals;
