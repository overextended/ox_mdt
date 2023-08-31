import React from 'react';
import { Box, SimpleGrid, Stack, Text } from '@mantine/core';
import ChargeCard from './ChargeCard';
import { useCharges, useInfiniteCharges } from '../../../../../../../state/charges';
import locales from '../../../../../../../locales';
import { useInfiniteScroll } from '../../../../../../../hooks/useInfiniteScroll';
import { Charge } from '../../../../../../../typings';
import { queryClient } from '../../../../../../../main';

const ChargeCardsList: React.FC = () => {
  const [data, dispatch] = useInfiniteCharges();
  const { ref } = useInfiniteScroll(() => dispatch({ type: 'fetchNextPage' }), 0.95);

  return (
    <Box sx={{ flex: '1 1 0', overflowY: 'scroll' }}>
      <Stack>
        {data.pages.map((page) => (
          <>
            {page && page[1].length > 0 && (
              <Stack key={page[0]}>
                <Text weight={500} size="lg">
                  {/* @ts-ignore */}
                  {locales[page[0]]}
                </Text>
                <SimpleGrid cols={3} spacing="xs">
                  {page[1].map((charge, index) => (
                    <ChargeCard
                      charge={charge}
                      key={`${charge.label}-${charge.description}`}
                      ref={index === page[1].length - 1 ? ref : null}
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
