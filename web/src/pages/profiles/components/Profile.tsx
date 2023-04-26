import React from 'react';
import { Avatar, Stack, Text } from '@mantine/core';
import ProfileField from './ProfileField';
import { IconCalendar, IconId, IconUser } from '@tabler/icons-react';
import { RichTextEditor } from '@mantine/tiptap';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extension-placeholder';
import { useProfile } from '../../../state/profiles/profile';

const Profile: React.FC = () => {
  const profile = useProfile();
  const editor = useEditor({
    content: profile?.notes,
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Profile notes...' }),
    ],
  });

  if (!profile) return <></>;

  return (
    <>
      <Avatar size={128} color="blue" radius="md" sx={{ alignSelf: 'center' }} />
      <ProfileField icon={IconUser} label="Name" value={`${profile.firstName} ${profile.lastName}`} />
      <ProfileField icon={IconId} label="State ID" value={profile.stateId} />
      <ProfileField icon={IconCalendar} label="DOB" value={profile.dob} />
      <Stack spacing={6}>
        <Text size="xs" c="dark.2">
          Notes:
        </Text>
        <RichTextEditor
          placeholder="Announcement contents..."
          editor={editor}
          styles={(theme) => ({
            content: { maxHeight: 320, overflowY: 'auto' },
          })}
        >
          {editor && (
            <>
              <BubbleMenu editor={editor}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.Highlight />
                </RichTextEditor.ControlsGroup>
              </BubbleMenu>
            </>
          )}
          <RichTextEditor.Content />
        </RichTextEditor>
      </Stack>
    </>
  );
};

export default Profile;
