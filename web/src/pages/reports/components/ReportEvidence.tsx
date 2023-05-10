import React from 'react';
import { ActionIcon, Badge, Button, Group, rem, Text } from '@mantine/core';
import { IconEdit, IconPaperBag, IconX } from '@tabler/icons-react';
import { useActiveReport, useEvidence } from '../../../state';
import BadgeButton from '../../../components/BadgeButton';
import { modals } from '@mantine/modals';
import AddEvidenceModal from './modals/AddEvidenceModal';

const ReportEvidence: React.FC = () => {
  const evidence = useEvidence();

  return (
    <>
      <Group position="apart" noWrap>
        <Text size="xl">Evidence</Text>
        <IconPaperBag />
      </Group>
      <Group spacing="xs">
        <BadgeButton
          label="Add evidence"
          onClick={() => modals.open({ title: 'Add evidence', children: <AddEvidenceModal />, size: 'sm' })}
        />
        {evidence.map((evidence) => (
          <Badge
            key={evidence.type === 'item' ? evidence.item : evidence.url}
            rightSection={
              <ActionIcon size="xs" radius="xl" variant="transparent">
                <IconX size={rem(10)} />
              </ActionIcon>
            }
          >
            {evidence.type === 'image' ? evidence.label : `${evidence.count}x ${evidence.item}`}
          </Badge>
        ))}
      </Group>
    </>
  );
};

export default ReportEvidence;
