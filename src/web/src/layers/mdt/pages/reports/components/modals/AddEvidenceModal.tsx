import React from 'react';
import { Button, NumberInput, Select, Stack, TextInput } from '@mantine/core';
import { useReportId, useSetEvidence } from '../../../../../../state';
import { modals } from '@mantine/modals';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { Evidence } from '../../../../../../typings';
import { useForm } from '@mantine/form';
import locales from '../../../../../../locales';

const AddEvidenceModal: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const setEvidence = useSetEvidence();
  const id = useReportId();

  const form = useForm({
    initialValues: {
      label: '',
      image: '',
    },

    validate: {
      label: (value) => (value.length === 0 ? locales.image_label_required : null),
      image: (value) => (value.length === 0 ? locales.image_url_required : null),
    },
  });

  const handleSubmit = async (values: { label: string; image: string }) => {
    setIsLoading(true);
    await fetchNui('addEvidence', { id, evidence: { ...values } }, { data: 1 });
    setEvidence((prev) => [...prev, values]);
    setIsLoading(false);
    modals.closeAll();
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <TextInput label={locales.image_label} withAsterisk {...form.getInputProps('label')} />
        <TextInput
          label={locales.image_url}
          withAsterisk
          placeholder="https://i.imgur.com/dqopYB9b.jpg"
          {...form.getInputProps('image')}
        />
        <Button color="blue" variant="light" type="submit" loading={isLoading}>
          {locales.add_evidence}
        </Button>
      </Stack>
    </form>
  );
};

export default AddEvidenceModal;
