import React from 'react';
import { RichTextEditor } from '@mantine/tiptap';
import { ActionIcon, createStyles, Group, Tooltip, Transition } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { BubbleMenu, FloatingMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Report } from '../Reports';

interface Props {
  description?: string;
  setReport: React.Dispatch<React.SetStateAction<Report | null>>;
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

const ReportEditor: React.FC<Props> = (props) => {
  const { classes } = useStyles();
  const [canSave, setCanSave] = React.useState(false);
  const editor = useEditor({
    content: props?.description,
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Report contents...' }),
    ],
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (editor?.getHTML() !== props?.description) setCanSave(true);
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
          <Transition mounted={canSave} transition="slide-down">
            {(style) => (
              <ActionIcon
                style={style}
                className={classes.saveButton}
                color="blue"
                variant="light"
                size={26}
                onClick={() => {
                  props.setReport((prev) => {
                    if (!prev) return null;

                    setCanSave(false);
                    return { ...prev, description: editor?.getHTML() };
                  });
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

export default ReportEditor;
