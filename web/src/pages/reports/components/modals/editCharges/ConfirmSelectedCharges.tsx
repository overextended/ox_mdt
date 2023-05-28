import React from 'react';
import { SelectedCharge, useSelectedCharges } from '../../../../../state';
import { PrimitiveAtom, useSetAtom } from 'jotai';
import { Button } from '@mantine/core';
import { Criminal } from '../../../../../state';
import { modals } from '@mantine/modals';

interface Props {
  criminalAtom: PrimitiveAtom<Criminal>;
}

const calculateCharges = (charges: SelectedCharge[]) => {
  const penalty: Criminal['penalty'] = {
    reduction: null,
    points: 0,
    fine: 0,
    time: 0,
  };

  for (let i = 0; i < charges.length; i++) {
    const charge = charges[i];
    penalty.time += charge.penalty.time * charge.count;
    penalty.fine += charge.penalty.fine * charge.count;
    penalty.points += charge.penalty.points * charge.count;
  }

  return penalty;
};

const ConfirmSelectedCharges: React.FC<Props> = ({ criminalAtom }) => {
  const selectedCharges = useSelectedCharges();
  const setCriminal = useSetAtom(criminalAtom);

  return (
    <Button
      color="blue"
      variant="light"
      onClick={() => {
        modals.closeAll();
        setCriminal((prev) => ({
          ...prev,
          charges: selectedCharges,
          penalty: calculateCharges(selectedCharges),
        }));
      }}
    >
      Confirm
    </Button>
  );
};

export default ConfirmSelectedCharges;
