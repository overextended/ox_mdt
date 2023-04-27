import React from 'react';
import { Button, Stack, TextInput } from '@mantine/core';
import { useSetProfile } from '../../../state/profiles/profile';
import { modals } from '@mantine/modals';

interface Props {
  image?: string;
}

const AvatarModal: React.FC<Props> = (props) => {
  const setProfile = useSetProfile();
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleConfirm = () => {
    modals.closeAll();
    setProfile((prev) => {
      if (!prev) return null;

      return { ...prev, image: inputRef.current?.value };
    });
  };

  return (
    <Stack>
      <TextInput
        defaultValue={props.image}
        ref={inputRef}
        label="Image"
        description="Image URL to use as the profile image (128x128)"
        placeholder="https://i.imgur.com/dqopYB9b.jpg"
      />
      <Button variant="light" onClick={handleConfirm}>
        Confirm
      </Button>
    </Stack>
  );
};

export default AvatarModal;
