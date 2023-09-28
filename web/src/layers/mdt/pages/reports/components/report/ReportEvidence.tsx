import React from 'react';
import { Button, createStyles, Group, Image, Text, Tooltip } from '@mantine/core';
import { IconPaperBag, IconPlus, IconX } from '@tabler/icons-react';
import { useCharacter, useEvidence, useReportId, useSetEvidence } from '../../../../../../state';
import { modals } from '@mantine/modals';
import AddEvidenceModal from '../modals/AddEvidenceModal';
import locales from '../../../../../../locales';
import { hasPermission } from '../../../../../../helpers';
import EvidenceImage from './EvidenceImage';

const ReportEvidence: React.FC = () => {
  const evidence = useEvidence();
  const id = useReportId();
  const character = useCharacter();

  return (
    <>
      <Group position="apart" noWrap>
        <Text size="xl">{locales.evidence}</Text>
        <IconPaperBag />
      </Group>
      <Group spacing={6}>
        <Button
          disabled={!hasPermission(character, 'add_evidence')}
          onClick={() => modals.open({ title: locales.add_evidence, children: <AddEvidenceModal />, size: 'sm' })}
          variant="light"
          w={105}
          h={105}
        >
          <IconPlus size={36} />
        </Button>
        {evidence.map((evidence) => (
          <EvidenceImage evidence={evidence} key={`${evidence.image}-${evidence.label}`} />
        ))}
      </Group>
    </>
  );
};

export default ReportEvidence;
