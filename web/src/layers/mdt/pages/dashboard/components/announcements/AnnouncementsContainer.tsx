import React from 'react';
import CardTitle from '../../../../components/CardTitle';
import locales from '../../../../../../locales';
import { IconBrandTelegram, IconMessageCircle2 } from '@tabler/icons-react';
import { Box, Button } from '@mantine/core';
import SuspenseLoader from '../../../../components/SuspenseLoader';
import AnnouncementList from './AnnouncementList';
import { modals } from '@mantine/modals';
import AnnouncementModal from './AnnouncementModal';
import { useCharacter } from '../../../../../../state';
import { hasPermission } from '../../../../../../helpers';

const AnnouncementsContainer = () => {
  const character = useCharacter();

  return (
    <>
      <CardTitle title={locales.announcements} icon={<IconMessageCircle2 />} />
      <Box>
        <Button
          disabled={!hasPermission(character, 'create_announcement')}
          fullWidth
          variant="light"
          leftIcon={<IconBrandTelegram />}
          onClick={() => {
            modals.open({
              title: locales.create_announcement,
              centered: true,
              children: <AnnouncementModal />,
            });
          }}
        >
          {locales.create_announcement}
        </Button>
      </Box>
      <React.Suspense fallback={<SuspenseLoader />}>
        <AnnouncementList />
      </React.Suspense>
    </>
  );
};

export default AnnouncementsContainer;
