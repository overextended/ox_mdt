import React, { useRef } from 'react';
import { Button, Stack, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useSetReportTitle } from '../../../../state';

interface Props {
  title: string;
}

const EditTitleModal: React.FC<Props> = (props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const setReportTitle = useSetReportTitle();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReportTitle(inputRef.current?.value!);
    modals.closeAll();
    //   fetchNui update title and stuff
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
