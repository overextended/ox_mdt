import React, { useRef } from 'react';
import { Button, NumberInput, Select, Stack, TextInput } from '@mantine/core';
import { useReportId, useSetEvidence } from '../../../../state';
import { modals } from '@mantine/modals';
import { fetchNui } from '../../../../utils/fetchNui';
import { ImageEvidence, ItemEvidence } from '../../../../typings';
import { useForm } from '@mantine/form';

const AddEvidenceModal: React.FC = () => {
  const [type, setType] = React.useState('image');
  const setEvidence = useSetEvidence();
  const id = useReportId();

  const form = useForm({
    initialValues: {
      firstInput: '',
      secondInput: '',
    },

    validate: {
      firstInput: (value) =>
        value.length === 0 ? (type === 'image' ? 'Image label is required' : 'Item name is required') : null,
      secondInput: (value) =>
        value.length === 0 ? (type === 'image' ? 'Image URL is required' : 'Item count is required') : null,
    },
  });

  React.useEffect(() => form.clearErrors(), [type]);

  const handleSubmit = async (values: { firstInput: string; secondInput: string }) => {
    modals.closeAll();

    const firstInput = values.firstInput;
    const secondInput = values.secondInput;

    const evidence: ImageEvidence | ItemEvidence =
      type === 'image'
        ? { type: 'image', label: firstInput, url: secondInput }
        : { type: 'item', item: firstInput, count: +secondInput };

    await fetchNui('addEvidence', { id, evidence }, { data: 1 });
    setEvidence((prev) => [...prev, evidence]);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <Select
          data={[
            { label: 'Image', value: 'image' },
            { label: 'Item', value: 'item' },
          ]}
          defaultValue="image"
          label="Evidence type"
          onChange={(value) => value && setType(value)}
        />
        {type === 'image' ? (
          <>
            <TextInput label="Image label" withAsterisk {...form.getInputProps('firstInput')} />
            <TextInput
              label="Image URL"
              withAsterisk
              placeholder="https://i.imgur.com/dqopYB9b.jpg"
              {...form.getInputProps('secondInput')}
            />
          </>
        ) : (
          <>
            <TextInput label="Item name" withAsterisk {...form.getInputProps('firstInput')} />
            <NumberInput label="Item count" withAsterisk hideControls {...form.getInputProps('secondInput')} />
          </>
        )}
        <Button color="blue" variant="light" type="submit">
          Add evidence
        </Button>
      </Stack>
    </form>
  );
};

export default AddEvidenceModal;
