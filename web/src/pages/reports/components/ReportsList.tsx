import React from 'react';
import { createStyles, Group, Stack, Text } from '@mantine/core';
import { useReportsList, useSetActiveReport, useSetIsReportActive } from '../../../state';
import { fetchNui } from '../../../utils/fetchNui';
import { IconReceiptOff } from '@tabler/icons-react';
import NotFound from '../../../components/NotFound';
import { Report } from '../../../typings';
import { modals } from '@mantine/modals';
import { useIntersection } from '@mantine/hooks';

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
  const lastPostRef = React.useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  // TODO: hasMore to prevent fetching new pages
  React.useEffect(() => {
    if (entry && entry.isIntersecting) {
      dispatch({ type: 'fetchNextPage' });
    }
  }, [entry]);

  return (
    <Stack sx={{ overflowY: 'auto' }} spacing="sm">
      {reports.pages.length > 0 ? (
        reports.pages.map(
          (page) =>
            page &&
            page.map((report, i) => (
              <Stack
                className={classes.reportContainer}
                p="md"
                key={report.id}
                spacing={0}
                onClick={async () => {
                  modals.openContextModal({
                    modal: 'loader',
                    innerProps: {},
                    withCloseButton: false,
                    closeOnClickOutside: false,
                    size: 'fit-content',
                  });
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
                  modals.closeAll();
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
        )
      ) : (
        <NotFound label="No reports found" icon={IconReceiptOff} />
      )}
      {/*Cursor element used for infinite scroll*/}
      {reports.pages.length > 0 && <span ref={ref} />}
    </Stack>
  );
};

export default ReportsList;
