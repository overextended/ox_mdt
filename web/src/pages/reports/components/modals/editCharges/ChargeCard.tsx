import React from 'react';
import { Charge } from './ChargeCardsList';
import { ActionIcon, Badge, createStyles, Group, Menu, Stack, Text, Tooltip } from '@mantine/core';
import { IconPlus, IconQuestionMark } from '@tabler/icons-react';

interface Props {
  charge: Charge;
}

const useStyles = createStyles((theme) => ({
  chargeContainer: {
    backgroundColor: theme.colors.durple[4],
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
}));

const ChargeCard: React.FC<Props> = ({ charge }) => {
  const { classes } = useStyles();

  return (
    <Stack className={classes.chargeContainer} key={`${charge.label}-${charge.description}`} justify="space-between">
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
  );
};

export default ChargeCard;
