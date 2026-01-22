import React from 'react';
import { Button, Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import Editor from '../../../../components/Editor';
import { Announcement } from '../../../../../../typings';
import { queryClient } from '../../../../../../main';
import { fetchNui } from '../../../../../../utils/fetchNui';
import locales from '../../../../../../locales';

const AnnouncementModal: React.FC<{ announcement?: Announcement }> = ({ announcement }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState('');

  const createAnnouncement = async () => {
    setIsLoading(true);
    const resp = await fetchNui('createAnnouncement', value, { data: true, delay: 1500 });
    if (!resp) return;
    await queryClient.invalidateQueries(['announcements']);
    setIsLoading(false);
    modals.closeAll();
  };

  const editAnnouncement = async () => {
    if (!announcement) return;
    setIsLoading(true);
    const resp = await fetchNui('editAnnouncement', { announcement, value }, { data: true, delay: 1500 });
    if (!resp) return;
    await queryClient.invalidateQueries(['announcements']);
    setIsLoading(false);
    modals.closeAll();
  };

  return (
    <Stack h={400}>
      <Editor
        placeholder={locales.announcement_placeholder}
        content={announcement?.contents}
        onChange={(value) => setValue(value || '')}
      />
      <Button
        variant="light"
        fullWidth
        onClick={() => (announcement ? editAnnouncement() : createAnnouncement())}
        loading={isLoading}
      >
        {locales.confirm}
      </Button>
    </Stack>
  );
};

export default AnnouncementModal;
