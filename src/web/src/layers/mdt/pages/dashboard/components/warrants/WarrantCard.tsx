import React from 'react';
import { Warrant } from '../../../../../../typings/warrant';
import { Avatar, createStyles, Group, Stack, Text } from '@mantine/core';
import locales from '../../../../../../locales';
import dayjs from 'dayjs';
import { useSetLoader } from '../../../../../../state/loader';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { useNavigate } from 'react-router-dom';
import { useSetActiveReport, useSetIsReportActive } from '../../../../../../state';
import { Report } from '../../../../../../typings';
import { isEnvBrowser } from '../../../../../../utils/misc';

interface Props {
  warrant: Warrant;
}

const useStyles = createStyles((theme) => ({
  warrantContainer: {
    backgroundColor: theme.colors.durple[4],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    '&:hover': {
      backgroundColor: theme.colors.durple[2],
      cursor: 'pointer',
    },
  },
}));

const WarrantCard: React.FC<Props> = ({ warrant }) => {
  const { classes } = useStyles();
  const setLoaderModal = useSetLoader();
  const navigate = useNavigate();
  const setReport = useSetActiveReport();
  const setIsReportActive = useSetIsReportActive();

  return (
    <Stack
      key={`${warrant.firstName} ${warrant.lastName}`}
      className={classes.warrantContainer}
      p="xs"
      onClick={async () => {
        if (isEnvBrowser()) return;
        setLoaderModal(true);
        const resp = await fetchNui<Report>('getReport', warrant.reportId);
        setReport(resp);
        setIsReportActive(true);
        setLoaderModal(false);
        navigate('/reports');
      }}
    >
      <Group>
        <Avatar size="xl" color="blue" radius="md" src={warrant.image} />
        <Stack spacing={0} h="100%">
          <Text>
            {warrant.firstName} {warrant.lastName}
          </Text>
          <Text size="xs" c="dark.2">
            {locales.expires_in}:{' '}
            <Text component="span" c="dark.0">
              {dayjs().to(warrant.expiresAt, true)}
            </Text>
          </Text>
        </Stack>
      </Group>
    </Stack>
  );
};

export default WarrantCard;
