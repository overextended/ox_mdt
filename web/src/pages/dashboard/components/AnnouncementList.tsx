import React from 'react';
import { Box, createStyles } from '@mantine/core';
import { useAnnouncements } from '../../../state';
import { useCharacter } from '../../../state';
import AnnouncementCard from './AnnouncementCard';
import NotFound from '../../../components/NotFound';
import { IconBellOff } from '@tabler/icons-react';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { useIntersection } from '@mantine/hooks';

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
  const [announcements, dispatch] = useAnnouncements();
  const { classes } = useStyles();
  const { ref } = useInfiniteScroll(() => dispatch({ type: 'fetchNextPage' }));

  // TODO: Fix issue where announcements don't refresh on announcement edit
  const pages = announcements.pages.flatMap((page) => page.announcements);

  return (
    <Box className={classes.container}>
      {pages.length > 0 ? (
        <>
          {pages.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} character={character} />
          ))}
        </>
      ) : (
        <NotFound icon={IconBellOff} label="No announcements" />
      )}
      {pages.length > 0 && <span ref={ref} />}
    </Box>
  );
};

export default AnnouncementList;
