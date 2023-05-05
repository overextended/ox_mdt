import React from 'react';
import { Badge, Button, Group, Text } from '@mantine/core';
import { IconEdit, IconPaperBag } from '@tabler/icons-react';
import { useActiveReport } from '../../../state';

const ReportEvidence: React.FC = () => {
  const report = useActiveReport();

  return (
    <>
      <Group position="apart" noWrap>
        <Text size="xl">Evidence</Text>
        <IconPaperBag />
      </Group>
      <Group spacing="xs">
        {report?.evidence && report.evidence.map((evidence) => <Badge key={evidence.image}>{evidence.label}</Badge>)}
      </Group>
      <Button leftIcon={<IconEdit size={20} />} variant="light">
        Edit evidence
      </Button>
    </>
  );
};

export default ReportEvidence;
