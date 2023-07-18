import React from 'react';
import CardTitle from '../../../../components/CardTitle';
import { IconCar, IconPlus } from '@tabler/icons-react';
import UnitsList from './UnitsList';
import CreateUnitButton from './CreateUnitButton';
import locales from '../../../../locales';

const UnitsContainer: React.FC = () => {
  return (
    <>
      <CardTitle title={locales.units} icon={<IconCar />} />
      <CreateUnitButton />
      <UnitsList />
    </>
  );
};

export default UnitsContainer;
