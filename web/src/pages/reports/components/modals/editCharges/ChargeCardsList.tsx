import React from 'react';
import { ActionIcon, Badge, createStyles, Group, Menu, SimpleGrid, Stack, Text, Tooltip } from '@mantine/core';
import { IconPlus, IconQuestionMark } from '@tabler/icons-react';
import ChargeCard from './ChargeCard';

export interface Charge {
  label: string;
  type: 'misdemeanour' | 'felony' | 'infraction';
  description: string;
  penalties: {
    time?: number;
    fine?: number;
    points?: number;
  };
}

const CHARGES: Charge[] = [
  {
    label: 'Robbery of a finanical institution',
    description: 'Bank robbery go brrr',
    type: 'felony',
    penalties: {
      time: 30,
      fine: 3000,
      points: 0,
    },
  },
  {
    label: 'Speeding',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, doloribus eveniet facere ipsam, ipsum minus modi molestiae nesciunt odio saepe sapiente sed sint voluptatibus voluptatum!',
    type: 'infraction',
    penalties: {
      time: 0,
      fine: 2500,
      points: 3,
    },
  },
  {
    label: 'Loitering',
    description: 'Standing go brrr',
    type: 'misdemeanour',
    penalties: {
      time: 90,
      fine: 25000,
      points: 0,
    },
  },
];

const ChargeCardsList: React.FC = () => {
  return (
    <SimpleGrid cols={3} spacing="xs">
      {CHARGES.map((charge) => (
        <ChargeCard charge={charge} />
      ))}
    </SimpleGrid>
  );
};

export default ChargeCardsList;
