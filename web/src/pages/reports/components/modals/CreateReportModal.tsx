import { Button, Stack, TextInput } from '@mantine/core';
import React, { useRef } from 'react';
import { useSetActiveReport, useSetIsReportActive } from '../../../../state';
import { modals } from '@mantine/modals';
import { fetchNui } from '../../../../utils/fetchNui';
import { useForm } from '@mantine/form';

type FormValues = {
  title: string;
};

const CreateReportModal: React.FC = () => {
  const setReport = useSetActiveReport();
  const setIsReportActive = useSetIsReportActive();

  const form = useForm({
    initialValues: {
      title: '',
    },

    validate: {
      title: (value) => (value.length === 0 ? 'Report title is required' : null),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    modals.closeAll();
    const resp = await fetchNui<number>('createReport', values.title, { data: 1 });
    setReport({
      title: values.title,
      id: resp,
      criminals: [],
      description: '<p></p>',
      evidence: [],
      officersInvolved: [],
    });
    setIsReportActive(true);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <TextInput label="Report title" data-autofocus withAsterisk {...form.getInputProps('title')} />
        <Button type="submit" fullWidth variant="light">
          Confirm
        </Button>
      </Stack>
    </form>
  );
};

export default CreateReportModal;
