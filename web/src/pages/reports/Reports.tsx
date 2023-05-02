import React from 'react';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Checkbox,
  createStyles,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import {
  IconDeviceFloppy,
  IconDots,
  IconGavel,
  IconPaperBag,
  IconPlus,
  IconReceipt,
  IconSearch,
  IconTrash,
  IconUsers,
} from '@tabler/icons-react';
import ReportsList from './components/ReportsList';
import ActiveReport from './components/ActiveReport';
import OfficersInvolved from './components/OfficersInvolved';
import ReportEvidence from './components/ReportEvidence';

export interface Report {
  id: number;
  title: string;
  description?: string;
  evidence?: string[];
  criminals?: {
    id: string;
    name: string;
    charges: {
      label: string;
      count: number;
    }[];
  }[];
}

const useStyles = createStyles((theme) => ({
  container: {
    overflow: 'hidden',
    height: '100%',
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
  reportCard: {
    height: 500,
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
  baseCard: {
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
}));

const Reports: React.FC = () => {
  const { classes } = useStyles();
  const [activeReport, setActiveReport] = React.useState<Report | null>({
    id: 0,
    title: 'Report title',
  });

  return (
    <SimpleGrid h="100%" cols={3} sx={{ overflow: 'hidden' }}>
      <Stack className={classes.container} p="md">
        <Group position="apart">
          <Text size="xl">Reports</Text>
          <IconReceipt />
        </Group>
        <TextInput icon={<IconSearch size={20} />} placeholder="Search anything..." />
        <ReportsList />
      </Stack>
      {activeReport && (
        <>
          <Box sx={{ overflowY: 'scroll' }}>
            <Stack>
              <Stack className={classes.reportCard} p="md">
                <ActiveReport report={activeReport} setReport={setActiveReport} />
              </Stack>
              <Stack className={classes.baseCard} p="md">
                <OfficersInvolved />
              </Stack>
              <Stack className={classes.baseCard} p="md">
                <ReportEvidence />
              </Stack>
            </Stack>
          </Box>
          <Box sx={{ overflowY: 'scroll' }}>
            <Stack>
              <Button variant="light" leftIcon={<IconPlus />}>
                Add criminal
              </Button>
              <Stack className={classes.baseCard} p="md">
                <Group position="apart" noWrap>
                  <Text size="xl">Archie Moss</Text>
                  <Group spacing="xs">
                    <ActionIcon color="red" variant="light">
                      <IconTrash size={20} />
                    </ActionIcon>
                    <ActionIcon color="blue" variant="light">
                      <IconDeviceFloppy size={20} />
                    </ActionIcon>
                  </Group>
                </Group>
                <Group spacing="xs">
                  <Button
                    size="xs"
                    variant="light"
                    radius="xl"
                    h="20px"
                    uppercase
                    sx={{ fontSize: '0.6785rem', lineHeight: 'normal' }}
                  >
                    Edit charges
                  </Button>
                  <Badge>3x Evading & Eluding</Badge>
                  <Badge>4x Resisting Arrest</Badge>
                  <Badge>1x Robbery of a financial institution (Accomplice)</Badge>
                </Group>
                <Checkbox label="Issue warrant" description="Suspect hasn't been processed and charged" />
                <Select label="Reduction" data={['25%', '50%']} clearable placeholder="No reduction" />
                <Group position="apart">
                  <Text size="xs">Time: 32 months</Text>
                  <Text size="xs">Fine: $3,000</Text>
                  <Text size="xs">Points: 2</Text>
                </Group>
                <Checkbox label="Pleaded guilty" />
              </Stack>
            </Stack>
          </Box>
        </>
      )}
    </SimpleGrid>
  );
};

export default Reports;
