import React from 'react';
import { ActionIcon, Group, Text, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useReportTitle, useSetIsReportActive } from '../../../state';
import { modals } from '@mantine/modals';
import EditTitleModal from './modals/EditTitleModal';

const ReportTitle: React.FC = () => {
  const title = useReportTitle();
  const setIsReportActive = useSetIsReportActive();

  return (
    <Group position="apart" noWrap>
      <Text size="xl" truncate>
        {title}
      </Text>
      <Group spacing="xs" noWrap>
        <Tooltip label="Delete report">
          <ActionIcon
            color="red"
            variant="light"
            onClick={() =>
              modals.openConfirmModal({
                title: 'Delete report?',
                children: (
                  <Text size="sm">
                    Deleting the report will permanently remove all the data associated with it, along with the criminal
                    charges.
                  </Text>
                ),
                labels: { confirm: 'Confirm', cancel: 'Cancel' },
                onConfirm: () => {
                  //   Do stuff when confirm
                  setIsReportActive(false);
                },
                confirmProps: {
                  color: 'red',
                },
              })
            }
          >
            <IconTrash size={20} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Edit title">
          <ActionIcon
            color="blue"
            variant="light"
            onClick={() =>
              modals.open({ title: 'Edit report title', size: 'sm', children: <EditTitleModal title={title} /> })
            }
          >
            <IconEdit size={20} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  );
};

export default ReportTitle;
