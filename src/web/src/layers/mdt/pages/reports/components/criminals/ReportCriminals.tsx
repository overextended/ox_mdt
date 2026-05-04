import React from 'react';
import { Box, Stack } from '@mantine/core';
import { useCriminals } from '../../../../../../state';
import Criminal from './Criminal';
import AddCriminalButton from './AddCriminalButton';

const ReportCriminals: React.FC = () => {
  const criminals = useCriminals();

  return (
    <Box sx={{ overflowY: 'scroll' }}>
      <Stack spacing="xs">
        <AddCriminalButton />
        {criminals.map((criminal) => (
          <Criminal key={criminal.toString()} criminalAtom={criminal} />
        ))}
      </Stack>
    </Box>
  );
};

export default ReportCriminals;
