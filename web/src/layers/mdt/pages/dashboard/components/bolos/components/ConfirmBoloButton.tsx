import React from 'react';
import { Box, Button } from '@mantine/core';
import { fetchNui } from '../../../../../../../utils/fetchNui';
import { modals } from '@mantine/modals';
import locales from '../../../../../../../locales';
import { BOLO } from '../../../../../../../typings/bolo';
import { queryClient } from '../../../../../../../main';
import { useCharacter } from '../../../../../../../state';

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
          await fetchNui<number>(
            bolo ? 'editBOLO' : 'createBOLO',
            { contents: value, images: images, id: bolo?.id },
            {
              data: 1,
              delay: 1500,
            }
          );
          await queryClient.invalidateQueries(['bolos']);
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
