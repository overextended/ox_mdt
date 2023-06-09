import React from 'react';
import { Stack, Text } from '@mantine/core';
import { TablerIconsProps } from '@tabler/icons-react';

interface Props {
  icon: (props: TablerIconsProps) => JSX.Element;
  label: string;
}

const NotFound: React.FC<Props> = (props) => {
  return (
    <Stack spacing={0} c="dark.2" justify="center" align="center">
      <props.icon size={36} />
      <Text size="xl">{props.label}</Text>
    </Stack>
  );
};

export default NotFound;
