import React from 'react';
import { useIsReportsDebouncing } from '../../../../state/reports/reportsList';
import { useSetCriminalDebounce } from '../../../../state';
import { Center, Loader } from '@mantine/core';
import ReportsList from './ReportsList';

const ReportsListContainer: React.FC = () => {
  const isDebouncing = useIsReportsDebouncing();
  const setDebouncedSearch = useSetCriminalDebounce();

  React.useEffect(() => {
    return () => setDebouncedSearch('');
  }, []);

  return (
    <React.Suspense
      fallback={
        <Center>
          <Loader />
        </Center>
      }
    >
      {isDebouncing ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <ReportsList />
      )}
    </React.Suspense>
  );
};

export default ReportsListContainer;
