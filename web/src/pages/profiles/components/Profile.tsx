import React from 'react';
import { ActionIcon, Group, Stack, Text, Tooltip } from '@mantine/core';
import ProfileField from './ProfileField';
import { IconCalendar, IconDeviceFloppy, IconId, IconUser } from '@tabler/icons-react';
import { RichTextEditor } from '@mantine/tiptap';
import { BubbleMenu, FloatingMenu } from '@tiptap/react';
import { useProfile } from '../../../state';
import AvatarWrapper from './AvatarWrapper';
import NotesEditor from './NotesEditor';

const Profile: React.FC = () => {
  const profile = useProfile();

  if (!profile) return <></>;

  return (
    <>
      <AvatarWrapper />
      <ProfileField icon={IconUser} label="Name" value={`${profile.firstName} ${profile.lastName}`} />
      <ProfileField icon={IconId} label="State ID" value={profile.stateId} />
      <ProfileField icon={IconCalendar} label="DOB" value={profile.dob} />
      <Stack spacing={6}>
        <Text size="xs" c="dark.2">
          Notes:
        </Text>
        <NotesEditor />
      </Stack>
    </>
  );
};

export default Profile;
