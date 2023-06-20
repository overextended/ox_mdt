import React from 'react';
import { Group, Text } from '@mantine/core';

interface Props {
  title: string;
  icon?: React.ReactNode;
}

const CardTitle: React.FC<Props> = (props) => {
  return (
    <Group w="100%" position="apart">
      <Text size="xl">{props.title}</Text>
      {props.icon}
    </Group>
  );
};

export default CardTitle;
