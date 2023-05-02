import React from 'react';
import { Report } from '../Reports';
import { ActionIcon, Group, Stack, Text } from '@mantine/core';
import { IconDots, IconEdit, IconReceipt, IconSettings } from '@tabler/icons-react';
import ReportEditor from './ReportEditor';

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
        <ActionIcon color="blue" variant="light">
          <IconDots />
        </ActionIcon>
      </Group>
      <ReportEditor description={report.description} setReport={setReport} />
    </>
  );
};

export default ActiveReport;
