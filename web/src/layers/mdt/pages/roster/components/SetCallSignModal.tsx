import React from 'react';
import { RosterOfficer } from '../../../../../typings';
import { Button, Stack, TextInput } from '@mantine/core';
import locales from '../../../../../locales';
import { fetchNui } from '../../../../../utils/fetchNui';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';

interface Props {
  officer: RosterOfficer;
}

const SetCallSignModal: React.FC<Props> = ({ officer }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm({
    initialValues: {
      callSign: officer.callSign,
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        console.log('pog');
        setIsLoading(true);
        const resp = await fetchNui<boolean>('setOfficerCallSign', values.callSign, { data: true, delay: 500 });
        setIsLoading(false);
        if (!resp) return form.setFieldError('callSign', 'Call sign already in use');
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
