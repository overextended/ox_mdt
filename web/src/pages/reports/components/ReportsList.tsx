import React from 'react';
import { createStyles, Group, Stack, Text } from '@mantine/core';
import { useReportsList, useSetActiveReport, useSetIsReportActive } from '../../../state';
import { fetchNui } from '../../../utils/fetchNui';
import { IconReceiptOff } from '@tabler/icons-react';
import NotFound from '../../../components/NotFound';
import { Report } from '../../../typings';
import { useSetLoader } from '../../../state/loader';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import locales from '../../../locales';
import ReportCard from './ReportCard';

const ReportsList: React.FC = () => {
  const [reports, dispatch] = useReportsList();
  const { ref } = useInfiniteScroll(() => dispatch({ type: 'fetchNextPage' }));

  const pages = React.useMemo(() => reports.pages.flatMap((page) => page.reports), [reports]);

  return (
    <Stack sx={{ overflowY: 'auto' }} spacing="sm">
      {pages.length > 0 ? (
        pages.map((report) => <ReportCard report={report} />)
      ) : (
        <NotFound label={locales.no_reports_found} icon={IconReceiptOff} />
      )}
      {/*Cursor element used for infinite scroll*/}
      {reports.pages.length > 0 && <span ref={ref} />}
    </Stack>
  );
};

export default ReportsList;
