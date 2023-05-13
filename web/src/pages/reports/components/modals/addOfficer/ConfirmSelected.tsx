import React from 'react';
import { useSelectedOfficers, useSetOfficersInvolved } from '../../../../../state';
import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

const ConfirmSelected: React.FC = () => {
  const selectedOfficers = useSelectedOfficers();
  const setOfficersInvolved = useSetOfficersInvolved();

  return (
    <Button
      variant="light"
      onClick={() => {
        // fetchNui - Update data server side
        setOfficersInvolved(selectedOfficers);
        modals.closeAll();
      }}
    >
      Confirm
    </Button>
  );
};

export default ConfirmSelected;
