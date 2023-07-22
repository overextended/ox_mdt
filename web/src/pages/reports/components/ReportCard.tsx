import React from 'react';
import { fetchNui } from '../../../utils/fetchNui';
import { Report, type ReportCard } from '../../../typings';
import { createStyles, Group, Stack, Text } from '@mantine/core';
import { useSetActiveReport, useSetIsReportActive } from '../../../state';
import { useSetLoader } from '../../../state/loader';

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

interface Props {
  report: ReportCard;
}

const ReportCard: React.FC<Props> = ({ report }) => {
  const { classes } = useStyles();
  const setIsReportActive = useSetIsReportActive();
  const setActiveReport = useSetActiveReport();
  const setLoaderModal = useSetLoader();

  return (
    <Stack
      className={classes.reportContainer}
      p="md"
      key={report.id}
      spacing={0}
      onClick={async () => {
        setLoaderModal(true);
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
        setLoaderModal(false);
      }}
    >
      <Text>{report.title}</Text>
      <Group position="apart">
        <Text size="sm" c="dark.2">
          {report.author} - {new Date(report.date).toLocaleDateString()}
        </Text>
        <Text size="sm" c="dark.2">
          #{report.id}
        </Text>
      </Group>
    </Stack>
  );
};

export default React.memo(ReportCard);
