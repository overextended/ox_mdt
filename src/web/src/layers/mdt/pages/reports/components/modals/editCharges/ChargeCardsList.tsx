import React from 'react';
import { Box, SimpleGrid, Stack, Text } from '@mantine/core';
import ChargeCard from './ChargeCard';
import { useInfiniteCharges } from '../../../../../../../state/charges';
import locales from '../../../../../../../locales';
import { useInfiniteScroll } from '../../../../../../../hooks/useInfiniteScroll';

const ChargeCardsList: React.FC<{ addButton?: boolean }> = ({ addButton }) => {
  const [data, dispatch] = useInfiniteCharges();
  const { ref } = useInfiniteScroll(() => dispatch({ type: 'fetchNextPage' }), 0.95);

  return (
    <Box sx={{ flex: '1 1 0', overflowY: 'scroll' }}>
      <Stack>
        {data.pages.map((page) => {
          if (!page) return null;

          return (
            <React.Fragment key={page[0]}>
              {page && page[1].length > 0 && (
                <Stack>
                  <Text weight={500} size="lg">
                    {/* @ts-ignore */}
                    {locales[page[0]]}
                  </Text>
                  <SimpleGrid cols={3} spacing="xs">
                    {page[1].map((charge, index) => (
                      <ChargeCard
                        addButton={addButton}
                        charge={charge}
                        key={`${charge.label}-${charge.description}`}
                        ref={index === page[1].length - 1 ? ref : null}
                      />
                    ))}
                  </SimpleGrid>
                </Stack>
              )}
            </React.Fragment>
          );
        })}
      </Stack>
    </Box>
  );
};

export default ChargeCardsList;
