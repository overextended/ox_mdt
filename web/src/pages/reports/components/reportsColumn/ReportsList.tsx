import React, { useState } from 'react';
import { createStyles, Group, Stack, Text } from '@mantine/core';
import { Report, useSetActiveReport, useSetIsReportActive } from '../../../../state';
import { fetchNui } from '../../../../utils/fetchNui';

interface ReportCard {
  title: string;
  author: string;
  date: string;
  id: number;
}

const useStyles = createStyles((theme) => ({
  reportContainer: {
    backgroundColor: theme.colors.durple[4],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    '&:hover': {
      backgroundColor: theme.colors.durple[2],
      cursor: 'pointer',
    },
  },
}));

let REPORTS: ReportCard[] = [];

for (let i = 0; i < 25; i++) {
  REPORTS[i] = {
    title: `Report ${i + 1}`,
    id: i,
    author: 'Some One',
    date: new Date().toLocaleDateString(),
  };
}

const ReportsList: React.FC = () => {
  const { classes } = useStyles();
  const [reports, setReports] = useState<ReportCard[]>(REPORTS);
  const setIsReportActive = useSetIsReportActive();
  const setActiveReport = useSetActiveReport();

  return (
    <Stack sx={{ overflowY: 'auto' }} spacing="sm">
      {reports.map((report) => (
        <Stack
          className={classes.reportContainer}
          p="md"
          key={report.id}
          spacing={0}
          onClick={async () => {
            const resp = await fetchNui<Report>('getReport', report.id, {
              data: {
                id: 1,
                officersInvolved: [],
                evidence: [],
                title: report.title,
                description: '<p></p>',
                criminals: [],
              },
            });
            setActiveReport(resp);
            setIsReportActive(true);
          }}
        >
          <Text>{report.title}</Text>
          <Group position="apart">
            <Text size="sm" c="dark.2">
              {report.author} - {report.date}
            </Text>
            <Text size="sm" c="dark.2">
              #{report.id}
            </Text>
          </Group>
        </Stack>
      ))}
    </Stack>
  );
};

export default ReportsList;
