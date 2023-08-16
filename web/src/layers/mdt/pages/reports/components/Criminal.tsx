import React from 'react';
import { ActionIcon, Badge, Checkbox, Group, Select, Stack, Text } from '@mantine/core';
import { IconCalendar, IconClockDown, IconDeviceFloppy, IconTrash } from '@tabler/icons-react';
import BadgeButton from '../../../components/BadgeButton';
import BaseCard from './BaseCard';
import { PrimitiveAtom, useAtom } from 'jotai';
import { useReportId, useSetCriminals } from '../../../../../state';
import { modals } from '@mantine/modals';
import EditChargesModal from './modals/editCharges/EditChargesModal';
import { useSetSelectedCharges } from '../../../../../state';
import { fetchNui } from '../../../../../utils/fetchNui';
import WarrantExpiry from './WarrantExpiry';
import type { Criminal } from '../../../../../typings';
import locales from '../../../../../locales';
import dayjs from 'dayjs';

const percentages = [25, 50, 75, 80, 90];

const calculatePenalty = (value: number, percent: number | null) => {
  if (!percent) return value;
  return Math.round(value - (percent / 100) * value);
};

const calculateReductions = (penalties: Criminal['penalty']) => {
  const reductions: Array<{ label: string; value: string }> = [];
  if (!penalties) return [];

  for (let i = 0; i < percentages.length; i++) {
    const percent = percentages[i];
    const time = calculatePenalty(penalties.time, percent);
    const fine = calculatePenalty(penalties.fine, percent);
    const points = calculatePenalty(penalties.points, percent);

    reductions[i] = {
      label: `${percent}% (${time} months / $${fine} / ${points} points)`,
      value: percent.toString(),
    };
  }

  return reductions;
};

const Criminal: React.FC<{ criminalAtom: PrimitiveAtom<Criminal>; index: number }> = ({ criminalAtom, index }) => {
  const [criminal, setCriminal] = useAtom(criminalAtom);
  const id = useReportId();
  const setSelectedCharges = useSetSelectedCharges();
  const setCriminals = useSetCriminals();

  return (
    <BaseCard key={criminal.stateId}>
      <Stack spacing={0}>
        <Group position="apart" noWrap>
          <Text size="xl">
            {criminal.firstName} {criminal.lastName}
          </Text>

          <Group spacing="xs">
            <ActionIcon
              color="red"
              variant="light"
              onClick={() =>
                modals.openConfirmModal({
                  title: locales.remove_criminal,
                  size: 'sm',
                  labels: { confirm: locales.confirm, cancel: locales.cancel },
                  groupProps: {
                    spacing: 6,
                  },
                  confirmProps: { color: 'red' },
                  onConfirm: async () => {
                    const success = await fetchNui('removeCriminal', { id, criminalId: criminal.stateId }, { data: 1 });

                    if (success) setCriminals((prev) => prev.filter((crim) => crim.stateId !== criminal.stateId));
                  },
                  children: (
                    <Text size="sm" c="dark.2">
                      {locales.remove_criminal_confirm.format(criminal.firstName, criminal.lastName)}
                    </Text>
                  ),
                })
              }
            >
              <IconTrash size={20} />
            </ActionIcon>
            <ActionIcon
              color="blue"
              variant="light"
              onClick={() => {
                console.log(criminal);
                fetchNui(
                  'saveCriminal',
                  {
                    id,
                    criminal: {
                      ...criminal,
                      warrantExpiry: criminal.warrantExpiry
                        ? dayjs(criminal.warrantExpiry).format('YYYY-MM-DD HH:mm:ss')
                        : null,
                    },
                  },
                  { data: 1 }
                );
              }}
            >
              <IconDeviceFloppy size={20} />
            </ActionIcon>
          </Group>
        </Group>
        <Text c="dark.2" size="xs">
          {criminal.stateId}
        </Text>
      </Stack>

      <Group spacing="xs">
        <BadgeButton
          label={locales.edit_charges}
          onClick={() => {
            setSelectedCharges(criminal.charges);
            modals.open({
              title: locales.edit_charges,
              children: <EditChargesModal criminalAtom={criminalAtom} />,
              size: 1200,
              styles: { body: { height: 600, overflow: 'hidden' }, content: { width: 900 } },
            });
          }}
        />
        {criminal.charges.map((charge) => (
          <Badge key={charge.label}>
            {charge.count}x {charge.label}
          </Badge>
        ))}
      </Group>
      <Checkbox
        label={locales.issue_warrant}
        description={locales.issue_warrant_description}
        checked={criminal.issueWarrant}
        onChange={() => setCriminal((prev) => ({ ...prev, issueWarrant: !prev.issueWarrant }))}
      />
      {criminal.issueWarrant ? (
        <WarrantExpiry
          charges={criminal.charges}
          reportId={id}
          index={index}
          onChange={(val) => setCriminal((prev) => ({ ...prev, warrantExpiry: val }))}
        />
      ) : (
        <>
          <Select
            label={locales.reduction}
            value={criminal.penalty.reduction ? criminal.penalty.reduction.toString() : null}
            data={calculateReductions(criminal.penalty)}
            icon={<IconClockDown size={20} />}
            onChange={(val) =>
              setCriminal((prev) => ({
                ...prev,
                penalty: prev.penalty
                  ? { ...prev.penalty, reduction: val ? +val : null }
                  : { reduction: val ? +val : null, time: 0, fine: 0, points: 0 },
              }))
            }
            clearable
            placeholder={locales.no_reduction}
          />
          <Group position="apart">
            <Text size="xs">
              {locales.time}: {calculatePenalty(criminal.penalty.time, criminal.penalty.reduction)} {locales.months}
            </Text>
            <Text size="xs">
              {locales.fine}: ${calculatePenalty(criminal.penalty.fine, criminal.penalty.reduction)}
            </Text>
            <Text size="xs">
              {locales.points}: {calculatePenalty(criminal.penalty.points, criminal.penalty.reduction)}
            </Text>
          </Group>
          <Group>
            <Checkbox
              label={locales.pleaded_guilty}
              checked={criminal.pleadedGuilty}
              onChange={() => setCriminal((prev) => ({ ...prev, pleadedGuilty: !prev.pleadedGuilty }))}
            />
            <Checkbox
              label={locales.processed}
              checked={criminal.processed}
              onChange={() => setCriminal((prev) => ({ ...prev, processed: !prev.processed }))}
            />
          </Group>
        </>
      )}
    </BaseCard>
  );
};

export default Criminal;
