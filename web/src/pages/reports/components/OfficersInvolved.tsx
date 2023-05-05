import React from 'react';
import { ActionIcon, Badge, Button, Group, Text } from '@mantine/core';
import { IconEdit, IconUsers } from '@tabler/icons-react';
import { useActiveReport } from '../../../state';

const OfficersInvolved: React.FC = () => {
  const report = useActiveReport();

  return (
    <>
      <Group position="apart" noWrap>
        <Text size="xl">Officers involved</Text>
        <IconUsers />
      </Group>
      <Group spacing="xs">
        {report?.officersInvolved &&
          report.officersInvolved.map((officer) => (
            <Badge key={officer.callSign}>
              {officer.name} ({officer.callSign})
            </Badge>
          ))}
      </Group>
      <Button leftIcon={<IconEdit size={20} />} variant="light">
        Edit officers
      </Button>
    </>
  );
};

export default OfficersInvolved;
