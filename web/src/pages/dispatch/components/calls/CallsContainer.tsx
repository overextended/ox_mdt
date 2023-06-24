import React from 'react';
import CardTitle from '../../../../components/CardTitle';
import { IconPhoneCall } from '@tabler/icons-react';
import CallTypeSwitcher from './CallTypeSwitcher';
import CallsList from './CallsList';

const CallsContainer: React.FC = () => {
  return (
    <>
      <CardTitle title="Calls" icon={<IconPhoneCall />} />
      <CallTypeSwitcher />
      <CallsList />
    </>
  );
};

export default CallsContainer;
