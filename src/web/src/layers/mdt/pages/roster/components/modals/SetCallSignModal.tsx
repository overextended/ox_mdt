import React from 'react';
import { RosterOfficer } from '../../../../../../typings';
import { Button, Stack, TextInput } from '@mantine/core';
import locales from '../../../../../../locales';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useSetRosterRecords } from '../../../../../../state/roster';

interface Props {
  officer: RosterOfficer;
}

const SetCallSignModal: React.FC<Props> = ({ officer }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const setRecords = useSetRosterRecords();

  const form = useForm({
    initialValues: {
      callSign: officer.callSign,
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        setIsLoading(true);
        const resp = await fetchNui<boolean>(
          'setOfficerCallSign',
          { stateId: officer.stateId, callSign: values.callSign },
          { data: true, delay: 500 }
        );
        setIsLoading(false);
        if (!resp) return form.setFieldError('callSign', locales.call_sign_in_use);
        setRecords((prev) =>
          prev.map((record) =>
            record.stateId === officer.stateId ? { ...officer, callSign: values.callSign } : record
          )
        );
        modals.closeAll();
      })}
    >
      <Stack>
        <TextInput label={locales.call_sign} {...form.getInputProps('callSign')} />
        <Button type="submit" loading={isLoading} variant="light">
          {locales.confirm}
        </Button>
      </Stack>
    </form>
  );
};

export default SetCallSignModal;
