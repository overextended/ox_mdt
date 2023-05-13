import React from 'react';
import { useSelectedOfficers, useSetSelectedOfficers } from '../../../../../state';
import { ActionIcon, Badge, Group, rem, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconX } from '@tabler/icons-react';

const SelectedOfficers: React.FC = () => {
  const selectedOfficers = useSelectedOfficers();
  const setSelectedOfficers = useSetSelectedOfficers();

  return (
    <>
      {selectedOfficers.length > 0 && (
        <Group spacing="xs">
          {selectedOfficers.map((officer, index) => (
            <Badge
              key={officer.callSign}
              rightSection={
                <ActionIcon
                  size="xs"
                  radius="xl"
                  variant="transparent"
                  onClick={() => setSelectedOfficers(selectedOfficers.filter((_, indx) => indx !== index))}
                >
                  <IconX size={rem(10)} />
                </ActionIcon>
              }
            >
              {officer.name} ({officer.callSign})
            </Badge>
          ))}
        </Group>
      )}
    </>
  );
};

export default SelectedOfficers;
