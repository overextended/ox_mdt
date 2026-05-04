import React from 'react';
import { ActionIcon, createStyles, Group, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useSetSelectedCharges } from '../../../../../../../state';
import { PrimitiveAtom, useAtom } from 'jotai';
import { SelectedCharge } from '../../../../../../../typings';

interface Props {
  chargeAtom: PrimitiveAtom<SelectedCharge>;
  index: number;
}

const useStyles = createStyles((theme) => ({
  chargeContainer: {
    backgroundColor: theme.colors.durple[4],
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
}));

const SelectedChargeItem: React.FC<Props> = ({ chargeAtom, index }) => {
  const { classes } = useStyles();
  const [charge, setCharge] = useAtom(chargeAtom);
  const setSelectedCharges = useSetSelectedCharges();

  return (
    <Group position="apart" noWrap className={classes.chargeContainer}>
      <Text>{charge.label}</Text>
      <Group noWrap>
        <ActionIcon
          variant="light"
          color="blue"
          onClick={() => {
            if (charge.count === 1) {
              return setSelectedCharges((prev) => prev.filter((_, indx) => indx !== index));
            }
            setCharge((prev) => ({ ...prev, count: --prev.count }));
          }}
        >
          <IconMinus size={20} />
        </ActionIcon>
        {`${charge.count}`}
        <ActionIcon
          variant="light"
          color="blue"
          onClick={() => setCharge((prev) => ({ ...prev, count: ++prev.count }))}
        >
          <IconPlus size={20} />
        </ActionIcon>
      </Group>
    </Group>
  );
};

export default SelectedChargeItem;
