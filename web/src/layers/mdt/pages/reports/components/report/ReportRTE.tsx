import React from 'react';
import Editor from '../../../../components/Editor';
import { useReportDescriptionState, useReportId } from '../../../../../../state';
import locales from '../../../../../../locales';
import { fetchNui } from '../../../../../../utils/fetchNui';

const ReportRTE: React.FC = () => {
  const [description, setDescription] = useReportDescriptionState();
  const id = useReportId();

  return (
    <Editor
      placeholder={locales.report_placeholder}
      content={description}
      permission="edit_report_contents"
      onSave={(value) => {
        fetchNui('saveReportContents', { reportId: id, contents: value });
        setDescription(value);
      }}
    />
  );
};

export default ReportRTE;
