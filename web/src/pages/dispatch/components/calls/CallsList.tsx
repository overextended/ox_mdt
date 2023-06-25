import React from 'react';
import { useCallTypeState, useFilteredCalls } from '../../../../state/dispatch';
import CallCard from './CallCard';

const CallsList: React.FC = () => {
  const calls = useFilteredCalls();

  return (
    <>
      {calls.map((call) => (
        <CallCard key={call.id} call={call} />
      ))}
    </>
  );
};

export default CallsList;
