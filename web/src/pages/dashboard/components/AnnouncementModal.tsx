import React from 'react';
import { Button, Stack, Textarea } from '@mantine/core';
import { Announcement, useSetAnnouncements } from '../../../state/dashboard';
import { modals } from '@mantine/modals';
import { useCharacter } from '../../../state/character';

const AnnouncementModal: React.FC<{ announcement?: Announcement }> = ({ announcement }) => {
  // Character used only for testing
  const character = useCharacter();
  const setAnnouncements = useSetAnnouncements();
  const [value, setValue] = React.useState(announcement?.contents || '');

  const createAnnouncement = () => {
    modals.closeAll();
    setAnnouncements((prev) => [
      {
        id: prev.length > 0 ? prev[0].id + 1 : 0,
        creator: {
          id: character.id,
          callSign: character.callSign,
          image: character.image,
          lastName: character.lastName,
          firstName: character.firstName,
        },
        createdAt: Date.now(),
        contents: value,
      },
      ...prev,
    ]);
  };

  const editAnnouncement = () => {
    modals.closeAll();
    if (!announcement) return;
    setAnnouncements((prev) => {
      return prev.map((item) => {
        if (item.id !== announcement.id) return item;
        console.log(value);
        return { ...item, contents: value };
      });
    });
  };

  return (
    <Stack>
      <Textarea
        placeholder="Announcement contents..."
        minRows={4}
        maxRows={8}
        autosize
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Button variant="light" fullWidth onClick={() => (announcement ? editAnnouncement() : createAnnouncement())}>
        Confirm
      </Button>
    </Stack>
  );
};

export default AnnouncementModal;
