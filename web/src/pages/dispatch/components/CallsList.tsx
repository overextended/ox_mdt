import React from 'react';
import { useActiveCalls, useCallTypeState, useCompletedCalls } from '../../../state/dispatch';
import CallCard from './CallCard';

const CallsList: React.FC = () => {
  const [callType] = useCallTypeState();
  const activeCalls = useActiveCalls();
  const completedCalls = useCompletedCalls();

  return (
    <>
      {callType === 'active'
        ? activeCalls.map((call) => <CallCard call={call} />)
        : completedCalls.map((call) => <CallCard call={call} />)}
    </>
  );
};

export default CallsList;
