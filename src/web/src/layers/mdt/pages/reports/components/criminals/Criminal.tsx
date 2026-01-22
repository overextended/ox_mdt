import React from 'react';
import { ActionIcon, Badge, Checkbox, Group, Select, Stack, Text, Tooltip } from '@mantine/core';
import { IconCalendar, IconClockDown, IconDeviceFloppy, IconTrash, IconUserShare } from '@tabler/icons-react';
import BadgeButton from '../../../../components/BadgeButton';
import BaseCard from '../BaseCard';
import { PrimitiveAtom, useAtom } from 'jotai';
import {
  useCharacter,
  useReportId,
  useSetCriminals,
  useSetProfile,
  useSetSelectedCharges,
} from '../../../../../../state';
import { modals } from '@mantine/modals';
import EditChargesModal from '../modals/editCharges/EditChargesModal';
import { fetchNui } from '../../../../../../utils/fetchNui';
import type { Criminal, Profile } from '../../../../../../typings';
import locales from '../../../../../../locales';
import dayjs from 'dayjs';
import { useSetLoader } from '../../../../../../state/loader';
import { useNavigate } from 'react-router-dom';
import { formatNumber, hasPermission } from '../../../../../../helpers';
import { DatePickerInput } from '@mantine/dates';

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

    reductions[i] = {
      label: `${percent}% (${time} months / ${formatNumber(fine)})`,
      value: percent.toString(),
    };
  }

  return reductions;
};

const Criminal: React.FC<{ criminalAtom: PrimitiveAtom<Criminal> }> = ({ criminalAtom }) => {
  const [criminal, setCriminal] = useAtom(criminalAtom);
  const id = useReportId();
  const setSelectedCharges = useSetSelectedCharges();
  const setCriminals = useSetCriminals();
  const setLoaderModal = useSetLoader();
  const navigate = useNavigate();
  const setProfile = useSetProfile();
  const character = useCharacter();

  return (
    <BaseCard key={criminal.stateId}>
      <Stack spacing={0}>
        <Group position="apart" noWrap>
          <Text size="xl">
            {criminal.firstName} {criminal.lastName}
          </Text>

          <Group spacing={6}>
            <Tooltip label={locales.remove_criminal}>
              <ActionIcon
                color="red"
                variant="light"
                disabled={!hasPermission(character, 'remove_criminal')}
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
                      const success = await fetchNui(
                        'removeCriminal',
                        { id, criminalId: criminal.stateId },
                        { data: 1 }
                      );

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
            </Tooltip>
            <Tooltip label={locales.go_to_profile}>
              <ActionIcon
                variant="light"
                color="blue"
                onClick={async () => {
                  setLoaderModal(true);
                  const resp = await fetchNui<Profile>('getProfile', criminal.stateId);
                  setProfile(resp);
                  navigate('/profiles');
                  setLoaderModal(false);
                }}
              >
                <IconUserShare size={20} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={locales.save_criminal}>
              <ActionIcon
                color="blue"
                disabled={!hasPermission(character, 'save_criminal')}
                variant="light"
                onClick={() => {
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
            </Tooltip>
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
        <DatePickerInput
          icon={<IconCalendar size={20} />}
          label={locales.warrant_expiration_date}
          placeholder="2023-03-12"
          weekendDays={[]}
          minDate={new Date()}
          value={criminal.warrantExpiry ? new Date(criminal.warrantExpiry) : null}
          onChange={(val) => {
            setCriminal((prev) => ({ ...prev, warrantExpiry: val }));
          }}
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
          <Group>
            <Text size="xs">
              {locales.time}: {calculatePenalty(criminal.penalty.time, criminal.penalty.reduction)} {locales.months}
            </Text>
            <Text size="xs">
              {locales.fine}: {formatNumber(calculatePenalty(criminal.penalty.fine, criminal.penalty.reduction))}
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
