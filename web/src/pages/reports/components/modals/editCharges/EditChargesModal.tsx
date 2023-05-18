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
  Tooltip,
  Menu,
} from '@mantine/core';
import { IconMinus, IconPlus, IconQuestionMark, IconSearch } from '@tabler/icons-react';

interface Charge {
  label: string;
  type: 'misdemeanour' | 'felony' | 'infraction';
  description: string;
  penalties: {
    time?: number;
    fine?: number;
    points?: number;
  };
}

const CHARGES: Charge[] = [
  {
    label: 'Robbery of a finanical institution',
    description: 'Bank robbery go brrr',
    type: 'felony',
    penalties: {
      time: 30,
      fine: 3000,
      points: 0,
    },
  },
  {
    label: 'Speeding',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, doloribus eveniet facere ipsam, ipsum minus modi molestiae nesciunt odio saepe sapiente sed sint voluptatibus voluptatum!',
    type: 'infraction',
    penalties: {
      time: 0,
      fine: 2500,
      points: 3,
    },
  },
  {
    label: 'Loitering',
    description: 'Standing go brrr',
    type: 'misdemeanour',
    penalties: {
      time: 90,
      fine: 25000,
      points: 0,
    },
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
                <Text>{charge.label}</Text>
                <Group position="apart">
                  <Badge
                    variant="light"
                    color={charge.type === 'felony' ? 'red' : charge.type === 'misdemeanour' ? 'yellow' : 'green'}
                  >
                    {charge.type}
                  </Badge>
                  <Group spacing="xs">
                    <Tooltip
                      label={
                        <Stack>
                          <Text>{charge.description}</Text>
                          <Group spacing="xs" noWrap position="apart">
                            <Text size="xs"> ${charge.penalties.fine || 0}</Text>
                            <Text size="xs"> {charge.penalties.time || 0} months</Text>
                            <Text size="xs">{charge.penalties.points || 0} points</Text>
                          </Group>
                        </Stack>
                      }
                      w={350}
                      multiline
                      withinPortal
                    >
                      <ActionIcon
                        variant="default"
                        sx={(theme) => ({
                          backgroundColor: theme.colors.durple[0],
                          '&:hover': { backgroundColor: theme.colors.durple[0] },
                        })}
                      >
                        <IconQuestionMark size={20} />
                      </ActionIcon>
                    </Tooltip>
                    <Menu position="right-start" withArrow withinPortal>
                      <Menu.Target>
                        <ActionIcon color="blue" variant="light">
                          <IconPlus size={20} />
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Label>Add charge</Menu.Label>
                        <Menu.Item>As actor</Menu.Item>
                        <Menu.Item>As accessory</Menu.Item>
                        <Menu.Item>As accomplice</Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
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
