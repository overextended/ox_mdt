import React from 'react';
import { ActionIcon, createStyles, Group, Popover, TextInput } from '@mantine/core';
import { IconCheck, IconPlus } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  popoverDropdown: {
    backgroundColor: theme.colors.durple[6],
  },
  input: {
    flex: 1,
  },
}));

const AddImagePopover: React.FC<{ setImages: React.Dispatch<React.SetStateAction<string[]>> }> = ({ setImages }) => {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { classes } = useStyles();

  return (
    <Popover
      withinPortal
      withArrow
      position="bottom"
      classNames={{
        dropdown: classes.popoverDropdown,
      }}
      width={400}
      opened={open}
      onClose={() => setOpen(false)}
    >
      <Popover.Target>
        <ActionIcon variant="light" color="blue" w={105} h={105} onClick={() => setOpen(true)}>
          <IconPlus size={32} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Group align="center" spacing="xs">
          <TextInput placeholder="https://i.imgur.com/dqopYB9b.jpg" className={classes.input} ref={inputRef} />
          <ActionIcon
            variant="light"
            color="blue"
            h={36}
            w={36}
            onClick={() => {
              const image = inputRef.current?.value;
              if (!image) return;
              setImages((prev) => [...prev, image]);
              setOpen(false);
            }}
          >
            <IconCheck size={20} />
          </ActionIcon>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};

export default AddImagePopover;
