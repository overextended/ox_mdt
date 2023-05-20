import React from 'react';
import { useSelectedCharges } from '../../../../../state';
import { PrimitiveAtom, useSetAtom } from 'jotai';
import { Button } from '@mantine/core';
import { Criminal } from '../../../../../state';
import { modals } from '@mantine/modals';

interface Props {
  criminalAtom: PrimitiveAtom<Criminal>;
}

const ConfirmSelectedCharges: React.FC<Props> = ({ criminalAtom }) => {
  const selectedCharges = useSelectedCharges();
  const setCriminal = useSetAtom(criminalAtom);

  return (
    <Button
      color="blue"
      variant="light"
      onClick={() => {
        modals.closeAll();
        setCriminal((prev) => ({ ...prev, charges: selectedCharges }));
      }}
    >
      Confirm
    </Button>
  );
};

export default ConfirmSelectedCharges;
