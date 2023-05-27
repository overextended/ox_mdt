import React from 'react';
import { ActionIcon, Badge, Group, rem, Text, Image, Tooltip } from '@mantine/core';
import { IconPaperBag, IconX } from '@tabler/icons-react';
import { useEvidence, useSetEvidence } from '../../../state';
import BadgeButton from '../../../components/BadgeButton';
import { modals } from '@mantine/modals';
import AddEvidenceModal from './modals/AddEvidenceModal';

const ReportEvidence: React.FC = () => {
  const evidence = useEvidence();
  const setEvidence = useSetEvidence();

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
        {evidence.map((evidence, index) => (
          <Tooltip
            maw={800}
            label={<Image src={(evidence.type === 'image' && evidence.url) || ''} />}
            sx={{ padding: 0 }}
            disabled={evidence.type !== 'image'}
          >
            <Badge
              key={evidence.type === 'item' ? evidence.item : evidence.url}
              rightSection={
                <ActionIcon
                  size="xs"
                  radius="xl"
                  variant="transparent"
                  onClick={() =>
                    modals.openConfirmModal({
                      title: 'Remove evidence',
                      children: (
                        <Text size="sm">
                          Are you sure you want to remove{' '}
                          {evidence.type === 'image' ? evidence.label : `${evidence.count}x ${evidence.item}`} from
                          evidence?
                        </Text>
                      ),
                      labels: { confirm: 'Confirm', cancel: 'Cancel' },
                      confirmProps: { color: 'red' },
                      onConfirm: () => {
                        setEvidence((prev) => prev.filter((_, indx) => indx !== index));
                      },
                    })
                  }
                >
                  <IconX size={rem(10)} />
                </ActionIcon>
              }
            >
              {evidence.type === 'image' ? evidence.label : `${evidence.count}x ${evidence.item}`}
            </Badge>
          </Tooltip>
        ))}
      </Group>
    </>
  );
};

export default ReportEvidence;
