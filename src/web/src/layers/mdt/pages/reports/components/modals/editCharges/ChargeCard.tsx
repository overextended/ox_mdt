import React from 'react';
import { ActionIcon, Badge, createStyles, Group, rem, Stack, Text, Tooltip } from '@mantine/core';
import { IconPlus, IconQuestionMark } from '@tabler/icons-react';
import { useSetSelectedCharges } from '../../../../../../../state';
import { Charge } from '../../../../../../../typings';
import locales from '../../../../../../../locales';
import { formatNumber } from '../../../../../../../helpers';

interface Props {
  charge: Charge;
  addButton?: boolean;
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

const ChargeCard: React.ForwardRefRenderFunction<HTMLDivElement | null, Props> = ({ charge, addButton }, ref) => {
  const { classes } = useStyles();
  const setSelectedCharges = useSetSelectedCharges();

  return (
    <Stack
      ref={ref}
      className={classes.chargeContainer}
      key={`${charge.label}-${charge.description}`}
      justify="space-between"
      spacing="xs"
    >
      <Text lineClamp={1}>{charge.label}</Text>
      <Group position="apart">
        <Badge
          variant="light"
          color={charge.type === 'felony' ? 'red' : charge.type === 'misdemeanor' ? 'yellow' : 'green'}
        >
          {charge.type}
        </Badge>
        <Group spacing="xs">
          <Tooltip
            position="bottom"
            label={
              <Stack>
                <Text weight={500}>{charge.label}</Text>
                <Text size="xs">{charge.description}</Text>
                <Group spacing="xs" noWrap>
                  <Text size="xs">
                    {locales.fine}: {formatNumber(charge.fine || 0)}
                  </Text>
                  <Text size="xs">
                    {locales.time}: {charge.time || 0} {locales.months}
                  </Text>
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
          {addButton && (
            <ActionIcon
              color="blue"
              variant="light"
              onClick={() =>
                setSelectedCharges((prev) => {
                  const prevChargeIndex = prev.findIndex((el) => el.label === charge.label);

                  if (prevChargeIndex === -1) {
                    return [...prev, { label: charge.label, count: 1, time: charge.time, fine: charge.fine }];
                  }

                  return prev.map((el, index) => {
                    if (index === prevChargeIndex) {
                      return { ...el, count: ++el.count };
                    }

                    return el;
                  });
                })
              }
            >
              <IconPlus size={20} />
            </ActionIcon>
          )}
        </Group>
      </Group>
    </Stack>
  );
};

export default React.memo(React.forwardRef(ChargeCard));
