import React from 'react';
import { createStyles, Group, Stack, Text } from '@mantine/core';
import { useSetActiveReport, useSetIsReportActive } from '../../../../../../state';
import { useSetLoader } from '../../../../../../state/loader';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { Report } from '../../../../../../typings';
import { useNavigate } from 'react-router-dom';
import { isEnvBrowser } from '../../../../../../utils/misc';

interface Props {
  author: string;
  date: string;
  id: number;
  title: string;
}

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.durple[4],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    '&:hover': {
      backgroundColor: theme.colors.durple[2],
      cursor: 'pointer',
    },
  },
}));

const ProfileReport: React.FC<Props> = (props) => {
  const { classes } = useStyles();
  const setReport = useSetActiveReport();
  const setIsReportActive = useSetIsReportActive();
  const setLoaderModal = useSetLoader();

  const navigate = useNavigate();

  return (
    <Stack
      className={classes.container}
      p="md"
      spacing={0}
      onClick={async () => {
        if (isEnvBrowser()) return;
        setLoaderModal(true);
        const resp = await fetchNui<Report>('getReport', props.id);
        setReport(resp);
        setIsReportActive(true);
        setLoaderModal(false);
        navigate('/reports');
      }}
    >
      <Text>{props.title}</Text>
      <Group position="apart">
        <Text size="xs" color="dark.2">
          {props.author} - {props.date}
        </Text>
        <Text size="xs" color="dark.2">
          #{props.id}
        </Text>
      </Group>
    </Stack>
  );
};

export default ProfileReport;
