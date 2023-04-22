import React from 'react';
import { Avatar, createStyles, Group, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { IconCalendar, IconId, IconSearch, IconUser, IconUsers } from '@tabler/icons-react';
import ProfilesList from './ProfilesList';
import { RichTextEditor } from '@mantine/tiptap';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extension-placeholder';
import ProfileField from './components/ProfileField';

const useStyles = createStyles((theme) => ({
  container: {
    overflow: 'hidden',
    height: '100%',
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
}));

const Profiles: React.FC = () => {
  const { classes } = useStyles();
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
    <SimpleGrid cols={3} h="100%">
      <Stack className={classes.container} p="md">
        <Group position="apart">
          <Text size="xl">Profiles</Text>
          <IconUsers />
        </Group>
        <TextInput icon={<IconSearch size={20} />} placeholder="Search anything..." />
        <ProfilesList />
      </Stack>
      <Stack className={classes.container} p="md">
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
      </Stack>
    </SimpleGrid>
  );
};

export default Profiles;
