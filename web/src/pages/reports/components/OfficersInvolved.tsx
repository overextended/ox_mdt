import React from 'react';
import { ActionIcon, Badge, Group, rem, Text } from '@mantine/core';
import { IconUsers, IconX } from '@tabler/icons-react';
import { useOfficersInvolved, useReportId, useSetOfficersInvolved } from '../../../state';
import BadgeButton from '../../../components/BadgeButton';
import { modals } from '@mantine/modals';
import AddOfficerModal from './modals/addOfficer/AddOfficerModal';
import { fetchNui } from '../../../utils/fetchNui';
import locales from '../../../locales';

const OfficersInvolved: React.FC = () => {
  const id = useReportId();
  const officers = useOfficersInvolved();
  const setOfficersInvolved = useSetOfficersInvolved();

  return (
    <>
      <Group position="apart" noWrap>
        <Text size="xl">{locales.officers_involved}</Text>
        <IconUsers />
      </Group>
      <Group spacing="xs">
        <BadgeButton
          label={locales.add_officer}
          onClick={() => {
            modals.open({
              title: locales.add_officer,
              children: <AddOfficerModal />,
              styles: { body: { height: 400, overflow: 'auto' } },
            });
          }}
        />
        {officers.map((officer) => (
          <Badge
            key={officer.callSign}
            rightSection={
              <ActionIcon
                size="xs"
                radius="xl"
                variant="transparent"
                onClick={() => {
                  modals.openConfirmModal({
                    title: locales.remove_officer,
                    children: (
                      <Text size="sm">
                        {locales.remove_officer_confirm.format(officer.firstName, officer.lastName, officer.callSign)}
                      </Text>
                    ),
                    confirmProps: { color: 'red' },
                    labels: { confirm: locales.confirm, cancel: locales.cancel },
                    onConfirm: async () => {
                      await fetchNui('removeOfficer', { id, stateId: officer.stateId }, { data: 1 });
                      setOfficersInvolved((prev) =>
                        prev.filter((prevOfficer) => prevOfficer.stateId !== officer.stateId)
                      );
                    },
                  });
                }}
              >
                <IconX size={rem(10)} />
              </ActionIcon>
            }
          >
            {officer.firstName} {officer.lastName} ({officer.callSign})
          </Badge>
        ))}
      </Group>
    </>
  );
};

export default OfficersInvolved;
