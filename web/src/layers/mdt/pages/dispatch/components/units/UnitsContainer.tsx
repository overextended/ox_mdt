import React from 'react';
import CardTitle from '../../../../components/CardTitle';
import { IconCar } from '@tabler/icons-react';
import UnitsList from './UnitsList';
import CreateUnitButton from './CreateUnitButton';
import locales from '../../../../../../locales';
import SuspenseLoader from '../../../../components/SuspenseLoader';

const UnitsContainer: React.FC = () => {
  return (
    <>
      <CardTitle title={locales.units} icon={<IconCar />} />
      <CreateUnitButton />
      <React.Suspense fallback={<SuspenseLoader />}>
        <UnitsList />
      </React.Suspense>
    </>
  );
};

export default UnitsContainer;
