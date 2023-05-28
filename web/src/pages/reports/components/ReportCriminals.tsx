import React from 'react';
import { Box, Button, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useCriminals } from '../../../state';
import Criminal from './Criminal';
import { modals } from '@mantine/modals';
import AddCriminalModal from './modals/addCriminal/AddCriminalModal';

const ReportCriminals: React.FC = () => {
  const criminals = useCriminals();

  return (
    <Box sx={{ overflowY: 'scroll' }}>
      <Stack>
        <Button
          variant="light"
          leftIcon={<IconPlus size={20} />}
          onClick={() =>
            modals.open({
              title: 'Add criminal',
              children: <AddCriminalModal />,
              styles: { body: { height: 400, overflow: 'hidden' } },
            })
          }
        >
          Add criminal
        </Button>
        {criminals.map((criminal, index) => (
          <Criminal key={criminal.toString()} criminalAtom={criminal} index={index} />
        ))}
      </Stack>
    </Box>
  );
};

export default ReportCriminals;
