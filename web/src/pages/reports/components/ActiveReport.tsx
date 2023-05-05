import React from 'react';
import { Report } from '../Reports';
import { ActionIcon, Group, Text, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import Editor from '../../../components/Editor';

interface Props {
  report: Report;
  setReport: React.Dispatch<React.SetStateAction<Report | null>>;
}

const ActiveReport: React.FC<Props> = ({ report, setReport }) => {
  return (
    <>
      <Group position="apart" noWrap>
        <Text size="xl" truncate>
          {report.title}
        </Text>
        <Group spacing="xs">
          <Tooltip label="Delete report">
            <ActionIcon color="red" variant="light">
              <IconTrash size={20} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Edit title">
            <ActionIcon color="blue" variant="light">
              <IconEdit size={20} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
      <Editor
        placeholder="Report contents..."
        content={report.description}
        onSave={(value) =>
          setReport((prev) => {
            if (!prev) return null;

            return { ...prev, description: value };
          })
        }
      />
    </>
  );
};

export default ActiveReport;
