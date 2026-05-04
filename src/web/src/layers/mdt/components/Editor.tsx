import React from 'react';
import { BubbleMenu, FloatingMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extension-placeholder';
import { RichTextEditor } from '@mantine/tiptap';
import { ActionIcon, createStyles, Transition } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import locales from '../../../locales';
import { PermissionKey } from '../../../permissions';
import { hasPermission } from '../../../helpers';
import { useCharacter } from '../../../state';

interface Props {
  onSave?: (value: string) => void;
  placeholder?: string;
  content?: string;
  onChange?: (value?: string) => void;
  permission?: PermissionKey;
  fillHeight?: boolean;
}

const useStyles = createStyles({
  floatingMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  saveButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 99,
  },
});

const Editor: React.FC<Props> = ({ content = '<p></p>', onSave, placeholder, onChange, permission, fillHeight }) => {
  const { classes } = useStyles();
  const [canSave, setCanSave] = React.useState(false);
  const character = useCharacter();

  const editor = useEditor({
    content,
    editable: permission ? hasPermission(character, permission) : true,
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
  });

  React.useEffect(() => {
    editor?.commands.setContent(content, true);
  }, [content]);

  React.useEffect(() => {
    onChange && onChange(editor?.getHTML());

    if (!onSave) return;
    const timer = setTimeout(() => {
      if (editor?.getHTML() !== content) setCanSave(true);
      else setCanSave(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [editor?.getHTML()]);

  return (
    <RichTextEditor
      placeholder={locales.report_placeholder}
      editor={editor}
      styles={(theme) => ({
        root: {
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          flex: fillHeight ? 1 : '1 1 0',
          height: fillHeight ? '100%' : undefined,
        },
        typographyStylesProvider: { height: '100%', flex: '1' },
        content: {
          height: '100%',
          overflowY: 'scroll',
          '> .ProseMirror': { height: '100%' },
        },
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
          <FloatingMenu editor={editor} className={classes.floatingMenu}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
            </RichTextEditor.ControlsGroup>
          </FloatingMenu>
          <Transition mounted={!!(canSave && onSave)} transition="slide-down">
            {(style) => (
              <ActionIcon
                style={style}
                className={classes.saveButton}
                color="blue"
                variant="light"
                size={26}
                onClick={() => {
                  setCanSave(false);
                  onSave && onSave(editor?.getHTML());
                }}
              >
                <IconDeviceFloppy size={20} />
              </ActionIcon>
            )}
          </Transition>
        </>
      )}
      <RichTextEditor.Content />
    </RichTextEditor>
  );
};

export default Editor;
