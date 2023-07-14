import React from 'react';
import { createStyles, Group, Stack, Text } from '@mantine/core';
import { useReportsList, useSetActiveReport, useSetIsReportActive } from '../../../state';
import { fetchNui } from '../../../utils/fetchNui';
import { IconReceiptOff } from '@tabler/icons-react';
import NotFound from '../../../components/NotFound';
import { Report } from '../../../typings';
import { useSetLoader } from '../../../state/loader';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';

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

const ReportsList: React.FC = () => {
  const { classes } = useStyles();
  const [reports, dispatch] = useReportsList();
  const setIsReportActive = useSetIsReportActive();
  const setActiveReport = useSetActiveReport();
  const setLoaderModal = useSetLoader();
  const { ref } = useInfiniteScroll(() => dispatch({ type: 'fetchNextPage' }));

  const pages = reports.pages.flatMap((page) => page.reports);

  return (
    <Stack sx={{ overflowY: 'auto' }} spacing="sm">
      {pages.length > 0 ? (
        pages.map((report, i) => (
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
        ))
      ) : (
        <NotFound label="No reports found" icon={IconReceiptOff} />
      )}
      {/*Cursor element used for infinite scroll*/}
      {reports.pages.length > 0 && <span ref={ref} />}
    </Stack>
  );
};

export default ReportsList;
