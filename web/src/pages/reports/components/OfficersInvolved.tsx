import React from 'react';
import { ActionIcon, Badge, Button, Group, rem, Text } from '@mantine/core';
import { IconEdit, IconUsers, IconX } from '@tabler/icons-react';
import { useActiveReport } from '../../../state';
import BadgeButton from '../../../components/BadgeButton';

const OfficersInvolved: React.FC = () => {
  const report = useActiveReport();

  return (
    <>
      <Group position="apart" noWrap>
        <Text size="xl">Officers involved</Text>
        <IconUsers />
      </Group>
      <Group spacing="xs">
        <BadgeButton label="Add officers" />
        {report?.officersInvolved &&
          report.officersInvolved.map((officer) => (
            <Badge
              key={officer.callSign}
              rightSection={
                <ActionIcon size="xs" radius="xl" variant="transparent">
                  <IconX size={rem(10)} />
                </ActionIcon>
              }
            >
              {officer.name} ({officer.callSign})
            </Badge>
          ))}
      </Group>
    </>
  );
};

export default OfficersInvolved;
