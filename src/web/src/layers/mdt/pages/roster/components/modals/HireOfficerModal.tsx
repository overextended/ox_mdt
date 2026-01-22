import React from 'react';
import { Button, Stack, TextInput } from '@mantine/core';
import locales from '../../../../../../locales';
import { useForm } from '@mantine/form';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { modals } from '@mantine/modals';

const HireOfficerModal: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm({
    initialValues: {
      stateId: '',
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        setIsLoading(true);
        const resp = await fetchNui<boolean>('hireOfficer', values.stateId, { data: false, delay: 500 });
        setIsLoading(false);
        if (!resp) return form.setFieldError('stateId', locales.state_id_already_hired);
        modals.closeAll();
      })}
    >
      <Stack>
        <TextInput
          label={locales.state_id}
          description={locales.hire_state_id_description}
          required
          {...form.getInputProps('stateId')}
        />
        <Button variant="light" type="submit" loading={isLoading}>
          {locales.confirm}
        </Button>
      </Stack>
    </form>
  );
};

export default HireOfficerModal;
