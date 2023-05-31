import React from 'react';
import { ActionIcon, Badge, Checkbox, Group, Select, Text } from '@mantine/core';
import { IconCalendar, IconClockDown, IconDeviceFloppy, IconTrash } from '@tabler/icons-react';
import BadgeButton from '../../../components/BadgeButton';
import BaseCard from './BaseCard';
import type { Criminal } from '../../../state';
import { PrimitiveAtom, useAtom } from 'jotai';
import { useReportId, useSetCriminals } from '../../../state';
import { modals } from '@mantine/modals';
import { DatePickerInput } from '@mantine/dates';
import EditChargesModal from './modals/editCharges/EditChargesModal';
import { useSetSelectedCharges } from '../../../state';
import { fetchNui } from '../../../utils/fetchNui';
import WarrantExpiry from './WarrantExpiry';

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
    <BaseCard key={criminal.name}>
      <Group position="apart" noWrap>
        <Text size="xl">{criminal.name}</Text>
        <Group spacing="xs">
          <ActionIcon
            color="red"
            variant="light"
            onClick={() =>
              modals.openConfirmModal({
                title: 'Remove criminal?',
                size: 'sm',
                labels: { confirm: 'Confirm', cancel: 'Cancel' },
                confirmProps: { color: 'red' },
                onConfirm: () => {
                  setCriminals((prev) => prev.filter((crim) => crim.name !== criminal.name));
                  fetchNui('removeCriminal', { id, index }, { data: 1 });
                },
                children: (
                  <Text size="sm">
                    Remove {criminal.name}? Removing them will also remove the charges from their profile.
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
              fetchNui('saveCriminal', { id, criminal }, { data: 1 });
            }}
          >
            <IconDeviceFloppy size={20} />
          </ActionIcon>
        </Group>
      </Group>
      <Group spacing="xs">
        <BadgeButton
          label="Edit Charges"
          onClick={() => {
            setSelectedCharges(criminal.charges);
            modals.open({
              title: 'Edit charges',
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
        label="Issue warrant"
        description="Suspect hasn't been processed and charged"
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
          {criminal.penalty && (
            <>
              <Select
                label="Reduction"
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
                placeholder="No reduction"
              />
              <Group position="apart">
                <Text size="xs">
                  Time: {calculatePenalty(criminal.penalty.time, criminal.penalty.reduction)} months
                </Text>
                <Text size="xs">Fine: ${calculatePenalty(criminal.penalty.fine, criminal.penalty.reduction)}</Text>
                <Text size="xs">Points: {calculatePenalty(criminal.penalty.points, criminal.penalty.reduction)}</Text>
              </Group>
              <Checkbox label="Pleaded guilty" defaultChecked={criminal.pleadedGuilty} />
            </>
          )}
        </>
      )}
    </BaseCard>
  );
};

export default Criminal;
