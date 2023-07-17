import React from 'react';
import Editor from '../../../components/Editor';
import { useReportDescriptionState } from '../../../state';
import locales from '../../../locales';

const ReportRTE: React.FC = () => {
  const [description, setDescription] = useReportDescriptionState();

  return <Editor placeholder={locales.report_placeholder} content={description} onSave={(value) => setDescription(value)} />;
};

export default ReportRTE;
