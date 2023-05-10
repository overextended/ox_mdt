import React, { useRef } from 'react';
import { Button, NumberInput, Select, Stack, TextInput } from '@mantine/core';
import { useSetEvidence } from '../../../../state';
import { modals } from '@mantine/modals';

const AddEvidenceModal: React.FC = () => {
  const [type, setType] = React.useState('image');
  const setEvidence = useSetEvidence();
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const secondInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    modals.closeAll();

    const firstInput = firstInputRef.current?.value;
    const secondInput = secondInputRef.current?.value;

    if (!firstInput || !secondInput) return;

    setEvidence((prev) => [
      ...prev,
      type === 'image'
        ? { type: 'image', label: firstInput, url: secondInput }
        : { type: 'item', item: firstInput, count: +secondInput },
    ]);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
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
            <TextInput label="Image label" required ref={firstInputRef} />
            <TextInput label="Image URL" required placeholder="https://i.imgur.com/dqopYB9b.jpg" ref={secondInputRef} />
          </>
        ) : (
          <>
            <TextInput label="Item name" required ref={firstInputRef} />
            <NumberInput label="Item count" required hideControls ref={secondInputRef} />
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
