import React from 'react';
import { ActionIcon, Avatar, Box } from '@mantine/core';
import { useProfile } from '../../../state/profiles/profile';
import { IconEdit } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import AvatarModal from './AvatarModal';

const AvatarWrapper: React.FC = () => {
  const profile = useProfile();
  const [hovering, setHovering] = React.useState(false);

  return (
    <Box
      sx={{ width: 128, height: 128, alignSelf: 'center', flexShrink: 0, position: 'relative' }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {hovering && (
        <ActionIcon
          sx={{ position: 'absolute', top: 5, right: 5, zIndex: 99 }}
          onClick={() =>
            modals.open({
              title: 'Change picture',
              centered: true,
              size: 'sm',
              children: <AvatarModal image={profile?.image} />,
            })
          }
        >
          <IconEdit />
        </ActionIcon>
      )}
      <Avatar color="blue" radius="md" src={profile?.image} sx={{ width: '100%', height: '100%' }} />
    </Box>
  );
};

export default AvatarWrapper;
