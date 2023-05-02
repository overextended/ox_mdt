import React from 'react';
import { Badge, Button, Group, Text } from '@mantine/core';
import { IconEdit, IconPaperBag } from '@tabler/icons-react';

const ReportEvidence: React.FC = () => {
  return (
    <>
      <Group position="apart" noWrap>
        <Text size="xl">Evidence</Text>
        <IconPaperBag />
      </Group>
      <Group spacing="xs">
        <Badge>Image 1</Badge>
        <Badge>Image 2</Badge>
        <Badge>Image 3</Badge>
        <Badge>Image 4</Badge>
      </Group>
      <Button leftIcon={<IconEdit />} variant="light">
        Edit evidence
      </Button>
    </>
  );
};

export default ReportEvidence;
