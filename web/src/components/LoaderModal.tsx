import React from 'react';
import { Center, Loader } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';

const LoaderModal = ({ context, id, innerProps }: ContextModalProps) => {
  return (
    <Center p="md">
      <Loader />
    </Center>
  );
};

export default LoaderModal;
