import React from 'react';
import { Group, Stack, Text } from '@mantine/core';

interface Props {
  icon: React.ComponentType;
  label: string;
  value: string;
}

const ProfileField: React.FC<Props> = (props) => {
  return (
    <Stack spacing={6}>
      <Text size="xs" c="dark.2">
        {props.label}:
      </Text>
      <Group>
        <props.icon />
        <Text sx={{ lineHeight: 'normal' }}>{props.value}</Text>
      </Group>
    </Stack>
  );
};

export default ProfileField;
