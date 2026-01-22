import React from 'react';
import { useSelectedCharges } from '../../../../../../../state';
import { PrimitiveAtom, useSetAtom } from 'jotai';
import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { Criminal, SelectedCharge } from '../../../../../../../typings';
import locales from '../../../../../../../locales';
import { fetchNui } from '../../../../../../../utils/fetchNui';

interface Props {
  criminalAtom: PrimitiveAtom<Criminal>;
}

const calculateCharges = (charges: SelectedCharge[]) => {
  const penalty: Criminal['penalty'] = {
    reduction: null,
    fine: 0,
    time: 0,
  };

  for (let i = 0; i < charges.length; i++) {
    const charge = charges[i];
    penalty.time += charge.time * charge.count;
    penalty.fine += charge.fine * charge.count;
  }

  return penalty;
};

const ConfirmSelectedCharges: React.FC<Props> = ({ criminalAtom }) => {
  const selectedCharges = useSelectedCharges();
  const [isLoading, setIsLoading] = React.useState(false);
  const setCriminal = useSetAtom(criminalAtom);

  return (
    <Button
      color="blue"
      variant="light"
      loading={isLoading}
      onClick={async () => {
        setIsLoading(true);
        const resp = await fetchNui('getRecommendedWarrantExpiry', selectedCharges, { data: Date.now() });
        setCriminal((prev) => ({
          ...prev,
          charges: selectedCharges,
          penalty: calculateCharges(selectedCharges),
          warrantExpiry: new Date(resp),
        }));
        setIsLoading(false);
        modals.closeAll();
      }}
    >
      {locales.confirm}
    </Button>
  );
};

export default ConfirmSelectedCharges;
