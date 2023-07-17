import React from 'react';
import { Button, Stack, TextInput } from '@mantine/core';
import { useSetProfile } from '../../../state';
import { modals } from '@mantine/modals';
import { fetchNui } from '../../../utils/fetchNui';
import locales from '../../../locales';

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

      const image = inputRef.current?.value;

      fetchNui('saveProfileImage', { id: prev.stateId, image });
      return { ...prev, image };
    });
  };

  return (
    <Stack>
      <TextInput
        defaultValue={props.image}
        ref={inputRef}
        label={locales.image}
        description={locales.avatar_description}
        placeholder="https://i.imgur.com/dqopYB9b.jpg"
      />
      <Button variant="light" onClick={handleConfirm}>
        Confirm
      </Button>
    </Stack>
  );
};

export default AvatarModal;
