import React from 'react';
import { useActiveReportState } from '../../../state';
import ReportTitle from './ReportTitle';
import ReportRTE from './ReportRTE';

const ActiveReport: React.FC = () => {
  return (
    <>
      <ReportTitle />
      <ReportRTE />
    </>
  );
};

export default ActiveReport;
