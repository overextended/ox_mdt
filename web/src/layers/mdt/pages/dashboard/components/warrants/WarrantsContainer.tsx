import React from 'react';
import CardTitle from '../../../../components/CardTitle';
import locales from '../../../../../../locales';
import { IconPrison } from '@tabler/icons-react';
import Warrants from './Warrants';

const WarrantsContainer: React.FC = () => {
  return (
    <>
      <CardTitle title={locales.active_warrants} icon={<IconPrison />} />
      <Warrants />
    </>
  );
};

export default WarrantsContainer;
