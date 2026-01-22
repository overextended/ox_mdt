import React from 'react';
import { Center, Loader } from '@mantine/core';

const SuspenseLoader: React.FC = () => {
  return (
    <Center>
      <Loader />
    </Center>
  );
};

export default SuspenseLoader;
