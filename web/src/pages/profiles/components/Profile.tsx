import React from 'react';
import { Stack, Text } from '@mantine/core';
import ProfileField from './ProfileField';
import { IconCalendar, IconId, IconUser } from '@tabler/icons-react';
import { useProfileState } from '../../../state';
import AvatarWrapper from './AvatarWrapper';
import Editor from '../../../components/Editor';
import { fetchNui } from '../../../utils/fetchNui';
import locales from '../../../locales';

const Profile: React.FC = () => {
  const [profile, setProfile] = useProfileState();

  if (!profile) return <></>;

  return (
    <>
      <AvatarWrapper />
      <ProfileField icon={IconUser} label={locales.name} value={`${profile.firstName} ${profile.lastName}`} />
      <ProfileField icon={IconId} label={locales.state_id} value={profile.stateId} />
      <ProfileField
        icon={IconCalendar}
        label={locales.date_of_birth}
        value={new Date(profile.dob).toLocaleDateString()}
      />
      <Stack spacing={6} h="100%">
        <Text size="xs" c="dark.2">
          {locales.notes}:
        </Text>
        <Editor
          placeholder={locales.profile_notes_placeholder}
          content={profile.notes}
          onSave={(value) =>
            setProfile((prev) => {
              if (!prev) return null;

              fetchNui('saveProfileNotes', { stateId: prev.stateId, notes: value });

              return { ...prev, notes: value };
            })
          }
        />
      </Stack>
    </>
  );
};

export default Profile;
