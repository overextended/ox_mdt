import React from 'react';
import { ActionIcon, Group, Text, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useReportTitle } from '../../../state';

const ReportTitle: React.FC = () => {
  const title = useReportTitle();

  return (
    <Group position="apart" noWrap>
      <Text size="xl" truncate>
        {title}
      </Text>
      <Group spacing="xs">
        <Tooltip label="Delete report">
          <ActionIcon color="red" variant="light">
            <IconTrash size={20} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Edit title">
          <ActionIcon color="blue" variant="light">
            <IconEdit size={20} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  );
};

export default ReportTitle;
