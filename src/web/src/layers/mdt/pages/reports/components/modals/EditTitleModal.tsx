import React from 'react';
import { Button, Stack, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useReportId, useSetReportTitle } from '../../../../../../state';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { useForm } from '@mantine/form';
import { queryClient } from '../../../../../../main';
import locales from '../../../../../../locales';
import { PartialReportData } from '../../../../../../typings';

interface Props {
  title: string;
}

const EditTitleModal: React.FC<Props> = (props) => {
  const setReportTitle = useSetReportTitle();
  const id = useReportId();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm({
    initialValues: {
      title: props.title,
    },

    validate: {
      title: (value) => (value.length === 0 ? locales.report_title_required : null),
    },
  });

  const submitForm = async (values: { title: string }) => {
    setReportTitle(values.title);
    setIsLoading(true);
    await fetchNui('setReportTitle', { id, title: values.title }, { data: 1 });
    queryClient.setQueriesData<{ pages: { reports: PartialReportData[]; hasMore: boolean }[]; pageParams: number[] }>(
      ['reports'],
      (data) => {
        if (!data) return undefined;
        return {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            reports: page.reports.map((report) => (report.id === id ? { ...report, title: values.title } : report)),
          })),
        };
      }
    );
    setIsLoading(false);
    modals.closeAll();
  };

  return (
    <form onSubmit={form.onSubmit((values) => submitForm(values))}>
      <Stack>
        <TextInput data-autofocus label={locales.report_title} withAsterisk {...form.getInputProps('title')} />
        <Button type="submit" fullWidth variant="light" loading={isLoading}>
          {locales.confirm}
        </Button>
      </Stack>
    </form>
  );
};

export default EditTitleModal;
