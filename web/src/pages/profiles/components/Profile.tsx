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

const Profile: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Profile notes...' }),
    ],
  });

  return (
    <>
      <Avatar size={128} color="blue" radius="md" sx={{ alignSelf: 'center' }} />
      <ProfileField icon={IconUser} label="Name" value="John Doe" />
      <ProfileField icon={IconId} label="State ID" value="123456" />
      <ProfileField icon={IconCalendar} label="DOB" value="19/05/1994" />
      <Stack spacing={6}>
        <Text size="xs" c="dark.2">
          Notes:
        </Text>
        <RichTextEditor
          placeholder="Announcement contents..."
          editor={editor}
          styles={(theme) => ({
            content: { maxHeight: 400, overflowY: 'auto' },
          })}
        >
          {editor && (
            <>
              <RichTextEditor.Toolbar sticky>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>
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
