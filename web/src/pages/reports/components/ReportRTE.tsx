import React from 'react';
import Editor from '../../../components/Editor';
import { useReportDescriptionState } from '../../../state';

const ReportRTE: React.FC = () => {
  const [description, setDescription] = useReportDescriptionState();

  return <Editor placeholder="Report contents..." content={description} onSave={(value) => setDescription(value)} />;
};

export default ReportRTE;
