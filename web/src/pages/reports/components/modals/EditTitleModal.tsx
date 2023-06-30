import React, { useRef } from 'react';
import { Button, Stack, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useReportId, useSetReportTitle } from '../../../../state';
import { fetchNui } from '../../../../utils/fetchNui';
import { useForm } from '@mantine/form';

interface Props {
  title: string;
}

const EditTitleModal: React.FC<Props> = (props) => {
  const setReportTitle = useSetReportTitle();
  const id = useReportId();

  const form = useForm({
    initialValues: {
      title: props.title,
    },

    validate: {
      title: (value) => (value.length === 0 ? 'Report title is required' : null),
    },
  });

  const submitForm = async (values: { title: string }) => {
    setReportTitle(values.title);
    await fetchNui('setReportTitle', { id, title: values.title }, { data: 1 });
    modals.closeAll();
  };

  return (
    <form onSubmit={form.onSubmit((values) => submitForm(values))}>
      <Stack>
        <TextInput data-autofocus label="Title" withAsterisk {...form.getInputProps('title')} />
        <Button type="submit" fullWidth variant="light">
          Confirm
        </Button>
      </Stack>
    </form>
  );
};

export default EditTitleModal;
