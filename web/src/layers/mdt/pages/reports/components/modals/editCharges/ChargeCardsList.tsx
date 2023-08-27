import React from 'react';
import { Box, SimpleGrid, Stack, Text } from '@mantine/core';
import ChargeCard from './ChargeCard';
import { useCategoryCharges, useCharges } from '../../../../../../../state/charges';
import locales from '../../../../../../../locales';

const ChargeCardsList: React.FC = () => {
  const charges = useCategoryCharges();

  return (
    <Box sx={{ flex: '1 1 0', overflowY: 'scroll' }}>
      <Stack>
        {Object.keys(charges)
          .sort()
          .map((category) => (
            <>
              {charges[category].length > 0 && (
                <Stack>
                  <Text weight={500} size="lg">
                    {/* @ts-ignore */}
                    {locales[category]}
                  </Text>
                  <SimpleGrid cols={3} spacing="xs">
                    {charges[category].map((charge) => (
                      <ChargeCard charge={charge} key={`${charge.label}-${charge.description}`} />
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
