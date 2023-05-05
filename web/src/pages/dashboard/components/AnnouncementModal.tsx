import React from 'react';
import { Button, Stack, Textarea } from '@mantine/core';
import { Announcement, useSetAnnouncements } from '../../../state';
import { modals } from '@mantine/modals';
import { useCharacter } from '../../../state';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor, BubbleMenu } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extension-placeholder';

const AnnouncementModal: React.FC<{ announcement?: Announcement }> = ({ announcement }) => {
  // Character used only for testing
  const character = useCharacter();
  const setAnnouncements = useSetAnnouncements();

  const editor = useEditor({
    content: announcement?.contents,
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Announcement contents...' }),
    ],
  });

  const createAnnouncement = () => {
    modals.closeAll();
    console.log(editor?.getHTML());
    setAnnouncements((prev) => [
      {
        id: prev.length > 0 ? prev[0].id + 1 : 0,
        creator: {
          id: character.id,
          callSign: character.callSign,
          image: character.image,
          lastName: character.lastName,
          firstName: character.firstName,
        },
        createdAt: Date.now(),
        contents: editor?.getHTML() || '',
      },
      ...prev,
    ]);
  };

  const editAnnouncement = () => {
    modals.closeAll();
    if (!announcement) return;
    setAnnouncements((prev) => {
      return prev.map((item) => {
        if (item.id !== announcement.id) return item;
        return { ...item, contents: editor?.getHTML() || '' };
      });
    });
  };

  return (
    <Stack>
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
      <Button variant="light" fullWidth onClick={() => (announcement ? editAnnouncement() : createAnnouncement())}>
        Confirm
      </Button>
    </Stack>
  );
};

export default AnnouncementModal;
