import React from 'react';
import { ActionIcon, Badge, Box, Button, Checkbox, createStyles, Group, Select, Stack, Text } from '@mantine/core';
import { IconDeviceFloppy, IconPlus, IconTrash } from '@tabler/icons-react';
import BaseCard from './BaseCard';
import { useActiveReport, useCriminals } from '../../../state';
import BadgeButton from '../../../components/BadgeButton';
import Criminal from './Criminal';

const ReportCriminals: React.FC = () => {
  const criminals = useCriminals();

  return (
    <Box sx={{ overflowY: 'scroll' }}>
      <Stack>
        <Button variant="light" leftIcon={<IconPlus size={20} />}>
          Add criminal
        </Button>
        {criminals.map((criminal, index) => (
          <Criminal key={criminal.toString()} criminalAtom={criminal} />
        ))}
      </Stack>
    </Box>
  );
};

export default ReportCriminals;
