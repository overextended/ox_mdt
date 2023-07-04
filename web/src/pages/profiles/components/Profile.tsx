import React from 'react';
import { Stack, Text } from '@mantine/core';
import ProfileField from './ProfileField';
import { IconCalendar, IconId, IconUser } from '@tabler/icons-react';
import { useProfileState } from '../../../state';
import AvatarWrapper from './AvatarWrapper';
import Editor from '../../../components/Editor';
import { fetchNui } from '../../../utils/fetchNui';

const Profile: React.FC = () => {
  const [profile, setProfile] = useProfileState();

  if (!profile) return <></>;

  return (
    <>
      <AvatarWrapper />
      <ProfileField icon={IconUser} label="Name" value={`${profile.firstName} ${profile.lastName}`} />
      <ProfileField icon={IconId} label="State ID" value={profile.stateId} />
      <ProfileField icon={IconCalendar} label="DOB" value={new Date(profile.dob).toLocaleDateString()} />
      <Stack spacing={6} h="100%">
        <Text size="xs" c="dark.2">
          Notes:
        </Text>
        <Editor
          placeholder="Profile notes contents..."
          content={profile.notes}
          onSave={(value) =>
            setProfile((prev) => {
              if (!prev) return null;

              fetchNui('saveProfileNotes', { id: prev.stateId, notes: value });

              return { ...prev, notes: value };
            })
          }
        />
      </Stack>
    </>
  );
};

export default Profile;
