import React from 'react';
import CardTitle from '../../../../components/CardTitle';
import { IconPhoneCall } from '@tabler/icons-react';
import CallTypeSwitcher from './CallTypeSwitcher';
import CallsList from './CallsList';
import locales from '../../../../../../locales';

const CallsContainer: React.FC = () => {
  return (
    <>
      <CardTitle title={locales.calls} icon={<IconPhoneCall />} />
      <CallTypeSwitcher />
      <CallsList />
    </>
  );
};

export default CallsContainer;
