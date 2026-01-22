import React from 'react';
import { SegmentedControl } from '@mantine/core';
import { useCallTypeState } from '../../../../../../state';
import locales from '../../../../../../locales';

const CallTypeSwitcher: React.FC = () => {
  const [callType, setCallType] = useCallTypeState();

  return (
    <SegmentedControl
      styles={{
        root: { height: 36 },
        label: { height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' },
      }}
      fullWidth
      value={callType}
      onChange={(value: 'active' | 'completed') => setCallType(value)}
      data={[
        { label: locales.active, value: 'active' },
        { label: locales.completed, value: 'completed' },
      ]}
    />
  );
};

export default CallTypeSwitcher;
