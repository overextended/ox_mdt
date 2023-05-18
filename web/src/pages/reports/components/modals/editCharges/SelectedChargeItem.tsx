import React from 'react';
import { ActionIcon, createStyles, Group, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { SelectedCharge } from './SelectedChargesList';

interface Props {
  charge: SelectedCharge;
}

const useStyles = createStyles((theme) => ({
  chargeContainer: {
    backgroundColor: theme.colors.durple[4],
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
}));

const SelectedChargeItem: React.FC<Props> = ({ charge }) => {
  const { classes } = useStyles();

  return (
    <Group position="apart" noWrap className={classes.chargeContainer}>
      <Text>{charge.label}</Text>
      <Group noWrap>
        <ActionIcon variant="light" color="blue">
          <IconMinus size={20} />
        </ActionIcon>
        {`${charge.count}`}
        <ActionIcon variant="light" color="blue">
          <IconPlus size={20} />
        </ActionIcon>
      </Group>
    </Group>
  );
};

export default SelectedChargeItem;
