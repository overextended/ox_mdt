import React from 'react';
import { Box, Stack } from '@mantine/core';
import BaseCard from './BaseCard';
import ReportContent from './ReportContent';
import OfficersInvolved from './OfficersInvolved';
import ReportEvidence from './ReportEvidence';
import ReportCriminals from './ReportCriminals';
import { useIsReportActive } from '../../../state';

const ActiveReport: React.FC = () => {
  const isReportActive = useIsReportActive();

  return (
    <>
      {isReportActive && (
        <>
          <Box sx={{ overflowY: 'scroll' }}>
            <Stack>
              <BaseCard h={500}>
                <ReportContent />
              </BaseCard>
              <BaseCard>
                <OfficersInvolved />
              </BaseCard>
              <BaseCard>
                <ReportEvidence />
              </BaseCard>
            </Stack>
          </Box>
          <ReportCriminals />
        </>
      )}
    </>
  );
};

export default ActiveReport;
