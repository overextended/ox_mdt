import React from 'react';
import { Box, SimpleGrid, Stack, Text } from '@mantine/core';
import ChargeCard from './ChargeCard';
import { useCharges } from '../../../../../../../state/chargesAtom';
import locales from '../../../../../../../locales';
import { useInfiniteScroll } from '../../../../../../../hooks/useInfiniteScroll';
import { Charge } from '../../../../../../../typings';

const ChargeCardsList: React.FC = () => {
  const charges = useCharges();
  const categories = React.useMemo(() => Object.keys(charges).sort(), [charges]);
  const [infiniteCharges, setInfiniteCharges] = React.useState<{ [category: string]: Charge[] }>({
    [categories[0]]: charges[categories[0]],
  });
  const [page, setPage] = React.useState(0);
  const { ref } = useInfiniteScroll(() => {
    if (page === categories.length - 1) return;
    const currentPage = page + 1;
    setInfiniteCharges((prev) => ({ ...prev, [categories[currentPage]]: charges[categories[currentPage]] }));
    setPage(currentPage);
  }, 0.5);

  return (
    <Box sx={{ flex: '1 1 0', overflowY: 'scroll' }}>
      <Stack>
        {infiniteCharges &&
          Object.keys(infiniteCharges)
            .sort()
            .map((category) => (
              <>
                {infiniteCharges[category].length > 0 && (
                  <Stack key={category}>
                    <Text weight={500} size="lg">
                      {/* @ts-ignore */}
                      {locales[category]}
                    </Text>
                    <SimpleGrid cols={3} spacing="xs">
                      {infiniteCharges[category].map((charge, index) => (
                        <ChargeCard
                          charge={charge}
                          key={`${charge.label}-${charge.description}`}
                          ref={index === infiniteCharges[category].length - 1 ? ref : null}
                        />
                      ))}
                    </SimpleGrid>
                  </Stack>
                )}
              </>
            ))}
      </Stack>
    </Box>
  );
};

export default ChargeCardsList;
