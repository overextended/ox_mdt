import React from 'react';
import { ActionIcon, Badge, Checkbox, Group, Select, Text } from '@mantine/core';
import { IconDeviceFloppy, IconTrash } from '@tabler/icons-react';
import BadgeButton from '../../../components/BadgeButton';
import BaseCard from './BaseCard';
import type { Criminal } from '../../../state';
import { PrimitiveAtom, useAtom } from 'jotai';
import { useSetCriminals } from '../../../state';
import { modals } from '@mantine/modals';
import { DatePickerInput } from '@mantine/dates';
import EditChargesModal from './modals/editCharges/EditChargesModal';
import { useSetSelectedCharges } from '../../../state/reports/editCharges';

const Criminal: React.FC<{ criminalAtom: PrimitiveAtom<Criminal> }> = ({ criminalAtom }) => {
  const [criminal, setCriminal] = useAtom(criminalAtom);
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
                  //   fetchNui and remove from server db
                },
                children: (
                  <Text size="sm">
                    Remove {criminal.name}? Removing them will also remove the charges fromt their profile.
                  </Text>
                ),
              })
            }
          >
            <IconTrash size={20} />
          </ActionIcon>
          <ActionIcon color="blue" variant="light">
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
        <>
          <DatePickerInput label="Warrant expiration date" placeholder="12/03/2023" />
        </>
      ) : (
        <>
          <Select label="Reduction" data={['25%', '50%']} clearable placeholder="No reduction" />
          <Group position="apart">
            <Text size="xs">Time: {criminal.penalty?.time || 0} months</Text>
            <Text size="xs">Fine: ${criminal.penalty?.fine || 0}</Text>
            <Text size="xs">Points: {criminal.penalty?.points || 0}</Text>
          </Group>
          <Checkbox label="Pleaded guilty" defaultChecked={criminal.pleadedGuilty} />
        </>
      )}
    </BaseCard>
  );
};

export default Criminal;
