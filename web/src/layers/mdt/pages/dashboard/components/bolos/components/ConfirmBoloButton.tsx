import React from 'react';
import { Box, Button } from '@mantine/core';
import { fetchNui } from '../../../../../../../utils/fetchNui';
import { modals } from '@mantine/modals';
import locales from '../../../../../../../locales';
import { BOLO } from '../../../../../../../typings/bolo';

interface Props {
  bolo?: BOLO;
  value: string;
  images: string[];
}

const ConfirmBoloButton: React.FC<Props> = ({ bolo, value, images }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Box>
      <Button
        variant="light"
        fullWidth
        loading={isLoading}
        onClick={async () => {
          setIsLoading(true);
          await fetchNui(
            bolo ? 'editBOLO' : 'createBOLO',
            { contents: value, images: images, id: bolo?.id },
            {
              data: true,
              delay: 1500,
            }
          );
          // TODO: update bolos query
          setIsLoading(false);
          modals.closeAll();
        }}
      >
        {locales.confirm}
      </Button>
    </Box>
  );
};

export default ConfirmBoloButton;
