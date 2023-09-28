import React from 'react';
import { Stack } from '@mantine/core';
import { useBolos } from '../../../../../../../state/dashboard/bolos';
import { useInfiniteScroll } from '../../../../../../../hooks/useInfiniteScroll';
import NotFound from '../../../../../components/NotFound';
import locales from '../../../../../../../locales';
import { IconEyeOff } from '@tabler/icons-react';
import BoloCard from './BoloCard';
import { removePages } from '../../../../../../../helpers';

const BoloList: React.FC = () => {
  const [bolos, dispatch] = useBolos();
  const { ref } = useInfiniteScroll(() => dispatch({ type: 'fetchNextPage' }), 0.95);

  const pages = React.useMemo(() => bolos.pages.flatMap((page) => page.bolos), [bolos]);

  React.useEffect(() => {
    return () => removePages(['bolos']);
  }, []);

  return (
    <Stack>
      {pages.length > 0 ? (
        <>
          {pages.map((bolo, index) => (
            <BoloCard bolo={bolo} key={`${bolo.id}-${bolo.contents}`} ref={index === pages.length - 1 ? ref : null} />
          ))}
        </>
      ) : (
        <NotFound label={locales.no_bolos} icon={IconEyeOff} />
      )}
    </Stack>
  );
};

export default BoloList;
