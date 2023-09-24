import React from 'react';
import { Stack } from '@mantine/core';
import { useBolos } from '../../../../../../../state/dashboard/bolos';
import { useInfiniteScroll } from '../../../../../../../hooks/useInfiniteScroll';
import NotFound from '../../../../../components/NotFound';
import locales from '../../../../../../../locales';
import { IconEyeOff } from '@tabler/icons-react';
import BoloCard from './BoloCard';

const BoloList: React.FC = () => {
  const [bolos, dispatch] = useBolos();
  const { ref } = useInfiniteScroll(() => dispatch({ type: 'fetchNextPage' }));

  const pages = React.useMemo(() => bolos.pages.flatMap((page) => page.bolos), [bolos]);

  return (
    <Stack>
      {pages.length > 0 ? (
        <>
          {pages.map((bolo) => (
            <BoloCard bolo={bolo} key={bolo.id} />
          ))}
        </>
      ) : (
        <NotFound label={locales.no_bolos} icon={IconEyeOff} />
      )}
    </Stack>
  );
};

export default BoloList;
