import React from 'react';
import { ActionIcon, Badge, createStyles, Group, rem, Stack, Text, Tooltip } from '@mantine/core';
import { IconPlus, IconQuestionMark } from '@tabler/icons-react';
import { Charge } from '../../../../../state/charges';
import { useSelectedChargesAtoms, useSetSelectedCharges } from '../../../../../state';

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
  infoHover: {
    backgroundColor: theme.colors.durple[0],
    width: rem(28),
    height: rem(28),
    borderRadius: theme.radius.sm,
    '&:hover': { backgroundColor: theme.colors.durple[0] },
  },
}));

const ChargeCard: React.FC<Props> = ({ charge }) => {
  const { classes } = useStyles();
  const setSelectedCharges = useSetSelectedCharges();

  return (
    <Stack
      className={classes.chargeContainer}
      key={`${charge.label}-${charge.description}`}
      justify="space-between"
      spacing="xs"
    >
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
                  <Text size="xs"> ${charge.penalty.fine || 0}</Text>
                  <Text size="xs"> {charge.penalty.time || 0} months</Text>
                  <Text size="xs">{charge.penalty.points || 0} points</Text>
                </Group>
              </Stack>
            }
            w={350}
            multiline
            withinPortal
          >
            <Stack justify="center" align="center" className={classes.infoHover}>
              <IconQuestionMark size={20} />
            </Stack>
          </Tooltip>
          <ActionIcon
            color="blue"
            variant="light"
            onClick={() =>
              setSelectedCharges((prev) => [...prev, { label: charge.label, count: 1, penalty: charge.penalty }])
            }
          >
            <IconPlus size={20} />
          </ActionIcon>
        </Group>
      </Group>
    </Stack>
  );
};

export default ChargeCard;
