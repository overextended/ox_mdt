import React from 'react';
import { ActionIcon, Avatar, Box, createStyles, Group, Menu, ScrollArea, Stack, Text } from '@mantine/core';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useAnnouncements, useAnnouncementsState } from '../../../state';
import { modals } from '@mantine/modals';
import AnnouncementModal from './AnnouncementModal';
import { useCharacter } from '../../../state';
import AnnouncementCard from './AnnouncementCard';

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    overflowY: 'auto',
  },
}));

const AnnouncementList: React.FC = () => {
  const character = useCharacter();
  const announcements = useAnnouncements();
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} character={character} />
      ))}
    </Box>
  );
};

export default AnnouncementList;
