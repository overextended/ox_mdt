import React from 'react';
import {
  Button,
  Divider,
  Grid,
  Stack,
  TextInput,
  Text,
  Group,
  Box,
  createStyles,
  Badge,
  ActionIcon,
} from '@mantine/core';
import { IconMinus, IconPlus, IconSearch } from '@tabler/icons-react';

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
    '&:hover': {
      backgroundColor: theme.colors.durple[2],
      cursor: 'pointer',
    },
  },
  countButton: {
    backgroundColor: theme.colors.dark[4],
    '&:hover': {
      backgroundColor: theme.colors.durple[2],
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
          <Group>
            {CHARGES.map((charge) => (
              <Stack className={classes.chargeContainer} key={charge.description}>
                <Group>
                  <Text>{charge.label}</Text>
                  <Badge
                    variant="light"
                    color={charge.type === 'felony' ? 'red' : charge.type === 'misdemeanour' ? 'yellow' : 'green'}
                  >
                    {charge.type}
                  </Badge>
                </Group>
                <Text size="xs">{charge.description}</Text>
              </Stack>
            ))}
          </Group>
        </Stack>
      </Grid.Col>
      <Divider orientation="vertical" />
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
            <Text>Robbery of a financial institution</Text>
            <Group noWrap>
              <ActionIcon variant="light" color="blue">
                <IconMinus />
              </ActionIcon>
              1
              <ActionIcon variant="light" color="blue">
                <IconPlus />
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
