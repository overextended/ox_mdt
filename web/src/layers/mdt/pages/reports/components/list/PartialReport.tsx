import React from 'react';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { type PartialReportData, Report } from '../../../../../../typings';
import { createStyles, Group, Stack, Text } from '@mantine/core';
import { useSetActiveReport, useSetIsReportActive } from '../../../../../../state';
import { useSetLoader } from '../../../../../../state/loader';
import dayjs from 'dayjs';

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
  report: PartialReportData;
}

const PartialReport: React.ForwardRefRenderFunction<HTMLDivElement | null, Props> = ({ report }, ref) => {
  const { classes } = useStyles();
  const setIsReportActive = useSetIsReportActive();
  const setActiveReport = useSetActiveReport();
  const setLoaderModal = useSetLoader();

  return (
    <Stack
      className={classes.reportContainer}
      p="md"
      ref={ref}
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
        <Text size="xs" c="dark.2">
          {report.author} - {dayjs(report.date).format('YYYY/MM/DD')}
        </Text>
        <Text size="xs" c="dark.2">
          #{report.id}
        </Text>
      </Group>
    </Stack>
  );
};

export default React.memo(React.forwardRef(PartialReport));
