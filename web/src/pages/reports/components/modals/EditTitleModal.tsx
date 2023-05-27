import React, { useRef } from 'react';
import { Button, Stack, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useReportId, useSetReportTitle } from '../../../../state';
import { fetchNui } from '../../../../utils/fetchNui';

interface Props {
  title: string;
}

const EditTitleModal: React.FC<Props> = (props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const setReportTitle = useSetReportTitle();
  const id = useReportId();

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReportTitle(inputRef.current?.value!);
    await fetchNui('setReportTitle', { id, title: inputRef.current?.value });
    modals.closeAll();
  };

  return (
    <form onSubmit={(e) => submitForm(e)}>
      <Stack>
        <TextInput data-autofocus required label="Title" defaultValue={props.title} ref={inputRef} />
        <Button type="submit" fullWidth variant="light">
          Confirm
        </Button>
      </Stack>
    </form>
  );
};

export default EditTitleModal;
