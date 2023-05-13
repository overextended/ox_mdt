import React from 'react';
import { ActionIcon, Badge, Button, Group, rem, Text } from '@mantine/core';
import { IconEdit, IconUsers, IconX } from '@tabler/icons-react';
import { useActiveReport, useOfficersInvolved, useSetOfficersInvolved, useSetSelectedOfficers } from '../../../state';
import BadgeButton from '../../../components/BadgeButton';
import { modals } from '@mantine/modals';
import AddOfficerModal from './modals/addOfficer/AddOfficerModal';

const OfficersInvolved: React.FC = () => {
  const officers = useOfficersInvolved();
  const setSelectedOfficers = useSetSelectedOfficers();

  return (
    <>
      <Group position="apart" noWrap>
        <Text size="xl">Officers involved</Text>
        <IconUsers />
      </Group>
      <Group spacing="xs">
        <BadgeButton
          label="Edit officers"
          onClick={() => {
            setSelectedOfficers(officers);
            modals.open({
              title: 'Add involved officer',
              children: <AddOfficerModal />,
              styles: { body: { height: 400, overflow: 'auto' } },
            });
          }}
        />
        {officers.map((officer) => (
          <Badge key={officer.callSign}>
            {officer.name} ({officer.callSign})
          </Badge>
        ))}
      </Group>
    </>
  );
};

export default OfficersInvolved;
