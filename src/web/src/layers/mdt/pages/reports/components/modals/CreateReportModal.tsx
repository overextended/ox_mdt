import { Button, Stack, TextInput } from '@mantine/core';
import React from 'react';
import { useSetActiveReport, useSetIsReportActive } from '../../../../../../state';
import { modals } from '@mantine/modals';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { useForm } from '@mantine/form';
import { queryClient } from '../../../../../../main';
import locales from '../../../../../../locales';

type FormValues = {
  title: string;
};

const CreateReportModal: React.FC = () => {
  const setReport = useSetActiveReport();
  const setIsReportActive = useSetIsReportActive();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm({
    initialValues: {
      title: '',
    },

    validate: {
      title: (value) => (value.length === 0 ? locales.report_title_required : null),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    modals.closeAll();
    const resp = await fetchNui<number>('createReport', values.title, { data: 1 });
    await queryClient.invalidateQueries(['reports']);
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
        <TextInput label={locales.report_title} data-autofocus withAsterisk {...form.getInputProps('title')} />
        <Button type="submit" fullWidth variant="light" loading={isLoading}>
          Confirm
        </Button>
      </Stack>
    </form>
  );
};

export default CreateReportModal;
