import React from 'react';
import { ActionIcon, Badge, Group, rem, Text, Image, Tooltip } from '@mantine/core';
import { IconPaperBag, IconX } from '@tabler/icons-react';
import { useEvidence, useReportId, useSetEvidence } from '../../../state';
import BadgeButton from '../../../components/BadgeButton';
import { modals } from '@mantine/modals';
import AddEvidenceModal from './modals/AddEvidenceModal';
import { fetchNui } from '../../../utils/fetchNui';
import locales from '../../../locales';

const ReportEvidence: React.FC = () => {
  const evidence = useEvidence();
  const setEvidence = useSetEvidence();
  const id = useReportId();

  return (
    <>
      <Group position="apart" noWrap>
        <Text size="xl">{locales.evidence}</Text>
        <IconPaperBag />
      </Group>
      <Group spacing="xs">
        <BadgeButton
          label={locales.add_evidence}
          onClick={() => modals.open({ title: locales.add_evidence, children: <AddEvidenceModal />, size: 'sm' })}
        />
        {evidence.map((evidence, index) => (
          <Tooltip
            maw={800}
            label={<Image src={(evidence.type === 'image' && evidence.value) || ''} />}
            sx={{ padding: 0 }}
            disabled={evidence.type !== 'image'}
          >
            <Badge
              key={`${evidence.label}-${evidence.value}`}
              rightSection={
                <ActionIcon
                  size="xs"
                  radius="xl"
                  variant="transparent"
                  onClick={() =>
                    modals.openConfirmModal({
                      title: locales.remove_evidence,
                      children: (
                        <Text size="sm">
                          {/* todo: locale placeholders */}
                          Are you sure you want to remove{' '}
                          {evidence.type === 'image' ? evidence.label : `${evidence.value}x ${evidence.label}`} from
                          evidence?
                        </Text>
                      ),
                      labels: { confirm: locales.confirm, cancel: locales.cancel },
                      confirmProps: { color: 'red' },
                      onConfirm: async () => {
                        await fetchNui(
                          'removeEvidence',
                          { id, label: evidence.label, value: evidence.value },
                          { data: 1 }
                        );
                        setEvidence((prev) => prev.filter((_, indx) => indx !== index));
                      },
                    })
                  }
                >
                  <IconX size={rem(10)} />
                </ActionIcon>
              }
            >
              {evidence.type === 'image' ? evidence.label : `${evidence.value}x ${evidence.label}`}
            </Badge>
          </Tooltip>
        ))}
      </Group>
    </>
  );
};

export default ReportEvidence;
