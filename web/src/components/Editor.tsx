import React, { FormEventHandler } from 'react';
import { BubbleMenu, FloatingMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extension-placeholder';
import { RichTextEditor } from '@mantine/tiptap';
import { ActionIcon, createStyles, Transition } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';

interface Props {
  onSave?: (value: string) => void;
  placeholder?: string;
  content?: string;
  onChange?: (value?: string) => void;
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

const Editor: React.FC<Props> = (props) => {
  const { classes } = useStyles();
  const [canSave, setCanSave] = React.useState(false);
  const editor = useEditor({
    content: props?.content,

    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: props.placeholder }),
    ],
  });

  React.useEffect(() => {
    props.onChange && props.onChange(editor?.getHTML());

    if (!props.onSave) return;
    const timer = setTimeout(() => {
      if (editor?.getHTML() !== props?.content) setCanSave(true);
      else setCanSave(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [editor?.getHTML()]);

  return (
    <RichTextEditor
      placeholder="Report contents..."
      editor={editor}
      styles={{
        root: { height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
        typographyStylesProvider: { height: '100%', flex: '1' },
        content: {
          height: '100%',
          overflowY: 'scroll',
          '> .ProseMirror': { height: '100%' },
        },
      }}
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
            </RichTextEditor.ControlsGroup>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
            </RichTextEditor.ControlsGroup>
          </FloatingMenu>
          <Transition mounted={!!(canSave && props.onSave)} transition="slide-down">
            {(style) => (
              <ActionIcon
                style={style}
                className={classes.saveButton}
                color="blue"
                variant="light"
                size={26}
                onClick={() => {
                  setCanSave(false);
                  props.onSave && props.onSave(editor?.getHTML());
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
