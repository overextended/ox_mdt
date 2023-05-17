import React from 'react';
import {
  Button,
  Divider,
  Grid,
  Stack,
  TextInput,
  Text,
  Group,
  createStyles,
  Badge,
  ActionIcon,
  SimpleGrid,
} from '@mantine/core';
import { IconMinus, IconPlus, IconQuestionMark, IconSearch } from '@tabler/icons-react';

interface Charge {
  label: string;
  type: 'misdemeanour' | 'felony' | 'infraction';
  description: string;
}

const CHARGES: Charge[] = [
  {
    label: 'Robbery of a finanical institution',
    description: 'Bank robbery go brrr',
    type: 'felony',
  },
  {
    label: 'Speeding',
    description: 'Speed go brrr',
    type: 'infraction',
  },
  {
    label: 'Loitering',
    description: 'Standing go brrr',
    type: 'misdemeanour',
  },
];

const useStyles = createStyles((theme) => ({
  chargeContainer: {
    backgroundColor: theme.colors.durple[4],
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
  countButton: {
    backgroundColor: theme.colors.dark[4],
    '&:hover': {
      backgroundColor: theme.colors.durple[2],
    },
  },
  infoContainer: {
    backgroundColor: theme.colors.durple[2],
    borderRadius: theme.radius.md,
    padding: 4,
    '&:hover': {
      backgroundColor: theme.colors.durple[0],
    },
  },
}));

const EditChargesModal: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Grid grow h="100%">
      <Grid.Col span={7}>
        <Stack>
          <TextInput icon={<IconSearch size={20} />} placeholder="Search charges..." />
          <SimpleGrid cols={3} spacing="xs">
            {CHARGES.map((charge) => (
              <Stack className={classes.chargeContainer} key={charge.description} justify="space-between">
                <Group noWrap position="apart">
                  <Text>{charge.label}</Text>
                  <Stack sx={{ alignSelf: 'baseline' }} className={classes.infoContainer}>
                    <IconQuestionMark size={20} />
                  </Stack>
                </Group>
                <Group position="right">
                  <Badge
                    variant="light"
                    color={charge.type === 'felony' ? 'red' : charge.type === 'misdemeanour' ? 'yellow' : 'green'}
                  >
                    {charge.type}
                  </Badge>
                </Group>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Grid.Col>
      <Divider orientation="vertical" sx={{ marginBottom: '8px' }} />
      <Grid.Col span={3}>
        <Stack justify="space-between" h="100%">
          <Group
            position="apart"
            noWrap
            sx={(theme) => ({
              backgroundColor: theme.colors.durple[4],
              padding: theme.spacing.md,
              borderRadius: theme.radius.md,
            })}
          >
            <Text>Robbery of a financial institution (Accomplice)</Text>
            <Group noWrap>
              <ActionIcon variant="light" color="blue">
                <IconMinus size={20} />
              </ActionIcon>
              1
              <ActionIcon variant="light" color="blue">
                <IconPlus size={20} />
              </ActionIcon>
            </Group>
          </Group>
          <Button color="blue" variant="light">
            Confirm
          </Button>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default EditChargesModal;
