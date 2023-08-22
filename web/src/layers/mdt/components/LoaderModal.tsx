import React from 'react';
import { Center, Loader, Modal } from '@mantine/core';
import { useLoaderState } from '../../../state/loader';

const LoaderModal: React.FC = () => {
  const [loading, setLoading] = useLoaderState();

  return (
    <Modal
      opened={loading}
      onClose={() => setLoading(false)}
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={true}
      size="fit-content"
      target=".modal-container"
    >
      <Center p="md">
        <Loader />
      </Center>
    </Modal>
  );
};

export default LoaderModal;
