import { Button, Stack, TextInput } from '@mantine/core';
import React, { useRef } from 'react';
import { useSetActiveReport } from '../../../../state';
import { modals } from '@mantine/modals';

const CreateReportModal: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setReport = useSetActiveReport();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reportTitle = inputRef.current?.value;
    if (!reportTitle) return;
    modals.closeAll();
    // fetchNUI and update server side
    setReport({
      title: reportTitle,
      id: 1,
      criminals: [],
      description: '<p></p>',
      evidence: [],
      officersInvolved: [],
    });
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
