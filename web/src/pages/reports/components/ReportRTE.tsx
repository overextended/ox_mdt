import React from 'react';
import Editor from '../../../components/Editor';
import { useReportDescriptionState } from '../../../state';

const ReportRTE: React.FC = () => {
  const [description, setDescription] = useReportDescriptionState();

  return (
    <Editor placeholder="Report contents..." content={description} onSave={(value) => setDescription(description)} />
  );
};

export default ReportRTE;
