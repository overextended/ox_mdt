import { Button, Stack, TextInput } from '@mantine/core';
import React, { useRef } from 'react';
import { useSetActiveReport, useSetIsReportActive } from '../../../../state';
import { modals } from '@mantine/modals';
import { fetchNui } from '../../../../utils/fetchNui';

const CreateReportModal: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setReport = useSetActiveReport();
  const setIsReportActive = useSetIsReportActive();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reportTitle = inputRef.current?.value;
    if (!reportTitle) return;
    modals.closeAll();
    const resp = await fetchNui<{ id: number }>('createReport', reportTitle, { data: { id: 1 } });
    setReport({
      title: reportTitle,
      id: resp.id,
      criminals: [],
      description: '<p></p>',
      evidence: [],
      officersInvolved: [],
    });
    setIsReportActive(true);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Stack>
        <TextInput label="Report title" data-autofocus required ref={inputRef} />
        <Button type="submit" fullWidth variant="light">
          Confirm
        </Button>
      </Stack>
    </form>
  );
};

export default CreateReportModal;
