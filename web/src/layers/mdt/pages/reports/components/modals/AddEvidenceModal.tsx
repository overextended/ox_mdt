import React, { useRef } from 'react';
import { Button, NumberInput, Select, Stack, TextInput } from '@mantine/core';
import { useReportId, useSetEvidence } from '../../../../../../state';
import { modals } from '@mantine/modals';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { Evidence } from '../../../../../../typings';
import { useForm } from '@mantine/form';
import locales from '../../../../../../locales';

const AddEvidenceModal: React.FC = () => {
  const [type, setType] = React.useState<'image' | 'item'>('image');
  const setEvidence = useSetEvidence();
  const id = useReportId();

  const form = useForm({
    initialValues: {
      firstInput: '',
      secondInput: '',
    },

    validate: {
      firstInput: (value) =>
        value.length === 0 ? (type === 'image' ? locales.image_label_required : locales.item_name_required) : null,
      secondInput: (value) =>
        value.length === 0 ? (type === 'image' ? locales.image_url_required : locales.item_count_required) : null,
    },
  });

  React.useEffect(() => form.clearErrors(), [type]);

  const handleSubmit = async (values: { firstInput: string; secondInput: string }) => {
    modals.closeAll();

    const firstInput = values.firstInput;
    const secondInput = values.secondInput;

    const evidence: Evidence = { type, label: firstInput, value: secondInput };

    await fetchNui('addEvidence', { id, evidence }, { data: 1 });
    setEvidence((prev) => [...prev, evidence]);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <Select
          data={[
            { label: locales.image, value: 'image' },
            { label: locales.item, value: 'item' },
          ]}
          defaultValue="image"
          label={locales.evidence_type}
          onChange={(value: 'image' | 'item') => value && setType(value)}
        />
        {type === 'image' ? (
          <>
            <TextInput label={locales.image_label} withAsterisk {...form.getInputProps('firstInput')} />
            <TextInput
              label={locales.image_url}
              withAsterisk
              placeholder="https://i.imgur.com/dqopYB9b.jpg"
              {...form.getInputProps('secondInput')}
            />
          </>
        ) : (
          <>
            <TextInput label={locales.item_name} withAsterisk {...form.getInputProps('firstInput')} />
            <NumberInput label={locales.item_count} withAsterisk hideControls {...form.getInputProps('secondInput')} />
          </>
        )}
        <Button color="blue" variant="light" type="submit">
          {locales.add_evidence}
        </Button>
      </Stack>
    </form>
  );
};

export default AddEvidenceModal;
