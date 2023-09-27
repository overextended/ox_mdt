import React from 'react';
import { ActionIcon, Avatar, Box, createStyles } from '@mantine/core';
import { useCharacter, useProfile } from '../../../../../../state';
import { IconEdit } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import AvatarModal from '../modals/AvatarModal';
import locales from '../../../../../../locales';
import { hasPermission } from '../../../../../../helpers';

const useStyles = createStyles({
  container: {
    width: 128,
    height: 128,
    alignSelf: 'center',
    flexShrink: 0,
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 99,
  },
});

const AvatarWrapper: React.FC = () => {
  const profile = useProfile();
  const [hovering, setHovering] = React.useState(false);
  const { classes } = useStyles();
  const character = useCharacter();

  return (
    <Box className={classes.container} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      {hovering && (
        <ActionIcon
          disabled={!hasPermission(character, 'change_profile_picture')}
          className={classes.iconButton}
          onClick={() =>
            modals.open({
              title: locales.change_picture,
              centered: true,
              size: 'sm',
              children: <AvatarModal image={profile?.image} />,
            })
          }
        >
          <IconEdit />
        </ActionIcon>
      )}
      <Avatar color="blue" radius="md" src={profile?.image} w="100%" h="100%" />
    </Box>
  );
};

export default AvatarWrapper;
