import React from 'react';
import { Box, createStyles, Stack } from '@mantine/core';
import BaseCard from './BaseCard';
import ReportContent from './report/ReportContent';
import OfficersInvolved from './report/OfficersInvolved';
import ReportEvidence from './report/ReportEvidence';
import ReportCriminals from './criminals/ReportCriminals';
import { useIsReportActive } from '../../../../../state';
import NotFound from '../../../components/NotFound';
import { IconReceiptOff } from '@tabler/icons-react';
import locales from '../../../../../locales';

const useStyles = createStyles((theme) => ({
  container: {
    overflow: 'hidden',
    height: '100%',
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
}));

const ActiveReport: React.FC = () => {
  const isReportActive = useIsReportActive();
  const { classes } = useStyles();

  return (
    <>
      <>
        <Box sx={{ overflowY: 'scroll' }}>
          {isReportActive ? (
            <Stack spacing="xs">
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
          ) : (
            <Stack className={classes.container} justify="center">
              <NotFound icon={IconReceiptOff} label={locales.no_report_selected} />
            </Stack>
          )}
        </Box>
        {isReportActive ? (
          <ReportCriminals />
        ) : (
          <Stack className={classes.container} justify="center">
            <NotFound icon={IconReceiptOff} label={locales.no_report_selected} />
          </Stack>
        )}
      </>
    </>
  );
};

export default ActiveReport;
