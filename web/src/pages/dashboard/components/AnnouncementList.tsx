import React from 'react';
import { Box, createStyles } from '@mantine/core';
import { useAnnouncements } from '../../../state';
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
