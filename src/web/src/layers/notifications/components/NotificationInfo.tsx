import React from 'react';
import { Group, Text } from '@mantine/core';
import { TablerIconsProps } from '@tabler/icons-react';

interface Props {
  icon: ((props: TablerIconsProps) => JSX.Element) | string;
  label: string;
}

const NotificationInfo: React.FC<Props> = (props) => {
  return (
    <Group c="dark.2">
      {typeof props.icon !== 'string' ? (
        <props.icon size={20} />
      ) : (
        <i className={`ti ti-${props.icon}`} style={{ fontSize: 20 }} />
      )}
      <Text size="sm">{props.label}</Text>
    </Group>
  );
};

export default NotificationInfo;
