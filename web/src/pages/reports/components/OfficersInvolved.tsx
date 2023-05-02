import React from 'react';
import { ActionIcon, Badge, Button, Group, Text } from '@mantine/core';
import { IconEdit, IconUsers } from '@tabler/icons-react';

const OfficersInvolved: React.FC = () => {
  return (
    <>
      <Group position="apart" noWrap>
        <Text size="xl">Officers involved</Text>
        <IconUsers />
      </Group>
      <Group spacing="xs">
        <Badge>Callum Graham (188)</Badge>
        <Badge>Jacob Gray (273)</Badge>
        <Badge>Edward Atkinson (125)</Badge>
      </Group>
      <Button leftIcon={<IconEdit />} variant="light">
        Edit involved
      </Button>
    </>
  );
};

export default OfficersInvolved;
