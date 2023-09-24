import React from 'react';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extension-placeholder';
import { createStyles } from '@mantine/core';

interface Props {
  content: string;
  placeholder?: string;
}

const useStyles = createStyles({
  root: {
    borderColor: 'transparent',
  },
  content: {
    '.ProseMirror': {
      padding: 0,
    },
  },
  typographyStylesProvider: {
    fontSize: 14,
  },
});

const ReadOnlyEditor: React.FC<Props> = (props) => {
  const { classes } = useStyles();

  const editor = useEditor({
    content: props.content,
    editable: false,
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: props.placeholder }),
    ],
  });

  return (
    <RichTextEditor editor={editor} classNames={{ ...classes }}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
};

export default React.memo(ReadOnlyEditor);
