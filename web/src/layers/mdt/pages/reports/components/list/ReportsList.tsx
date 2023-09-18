import React from 'react';
import { Stack } from '@mantine/core';
import { useReportsList } from '../../../../../../state';
import { IconReceiptOff } from '@tabler/icons-react';
import NotFound from '../../../../components/NotFound';
import { useInfiniteScroll } from '../../../../../../hooks/useInfiniteScroll';
import locales from '../../../../../../locales';
import PartialReport from './PartialReport';

const ReportsList: React.FC = () => {
  const [reports, dispatch] = useReportsList();
  const { ref } = useInfiniteScroll(() => dispatch({ type: 'fetchNextPage' }));

  const pages = React.useMemo(() => reports.pages.flatMap((page) => page.reports), [reports]);

  return (
    <Stack sx={{ overflowY: 'auto' }} spacing="sm">
      {pages.length > 0 ? (
        pages.map((report, i) => (
          <PartialReport key={report.id} report={report} ref={i === pages.length - 2 ? ref : null} />
        ))
      ) : (
        <NotFound label={locales.no_reports_found} icon={IconReceiptOff} />
      )}
    </Stack>
  );
};

export default ReportsList;
