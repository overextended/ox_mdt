import React from 'react';
import { RichTextEditor } from '@mantine/tiptap';
import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { BubbleMenu, FloatingMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extension-placeholder';
import { useProfileState } from '../../../state';

const NotesEditor: React.FC = () => {
  const [profile, setProfile] = useProfileState();
  const [canSave, setCanSave] = React.useState(false);
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

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (editor?.getHTML() !== profile?.notes) setCanSave(true);
      else setCanSave(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [editor?.getHTML()]);

  return (
    <RichTextEditor placeholder="Announcement contents..." editor={editor}>
      <RichTextEditor.Toolbar sticky sx={{ display: 'block' }}>
        <Group position="apart" noWrap>
          <Group>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>
          </Group>

          <RichTextEditor.ControlsGroup>
            {canSave && (
              <Tooltip label="Save changes" withArrow sx={{ fontSize: 13 }} position="top" withinPortal>
                <ActionIcon
                  variant="light"
                  color="blue"
                  size={26}
                  onClick={() =>
                    setProfile((prev) => {
                      if (!prev) return null;

                      setCanSave(false);
                      return { ...prev, notes: editor?.getHTML() };
                    })
                  }
                >
                  <IconDeviceFloppy size={20} />
                </ActionIcon>
              </Tooltip>
            )}
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
  );
};

export default NotesEditor;
