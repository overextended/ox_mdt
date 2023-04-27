import React from 'react';
import { ActionIcon, Avatar, Box, Group, Stack, Text, Tooltip } from '@mantine/core';
import ProfileField from './ProfileField';
import { IconCalendar, IconDeviceFloppy, IconId, IconUser } from '@tabler/icons-react';
import { RichTextEditor } from '@mantine/tiptap';
import { BubbleMenu, FloatingMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extension-placeholder';
import { useProfile } from '../../../state/profiles/profile';
import AvatarWrapper from './AvatarWrapper';

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
      <AvatarWrapper />
      <ProfileField icon={IconUser} label="Name" value={`${profile.firstName} ${profile.lastName}`} />
      <ProfileField icon={IconId} label="State ID" value={profile.stateId} />
      <ProfileField icon={IconCalendar} label="DOB" value={profile.dob} />
      <Stack spacing={6}>
        <Text size="xs" c="dark.2">
          Notes:
        </Text>
        <RichTextEditor placeholder="Announcement contents..." editor={editor}>
          <RichTextEditor.Toolbar sticky sx={{ display: 'block' }} stickyOffset={60}>
            <Group position="apart" noWrap>
              <Group>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignJustify />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>
              </Group>

              <RichTextEditor.ControlsGroup>
                <Tooltip label="Save changes" withArrow sx={{ fontSize: 13 }} position="top" withinPortal>
                  <ActionIcon variant="light" color="blue" size={26}>
                    <IconDeviceFloppy size={20} />
                  </ActionIcon>
                </Tooltip>
              </RichTextEditor.ControlsGroup>
            </Group>
          </RichTextEditor.Toolbar>
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
              <FloatingMenu editor={editor}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>
              </FloatingMenu>
            </>
          )}
          <RichTextEditor.Content />
        </RichTextEditor>
      </Stack>
    </>
  );
};

export default Profile;
