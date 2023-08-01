import React from 'react';
import { ActionIcon, Button, Drawer, Stack, Tooltip } from '@mantine/core';
import { IconTools } from '@tabler/icons-react';
import { useSetVisibility } from '../../state/visibility';

const Dev: React.FC = () => {
  const [opened, setOpened] = React.useState(false);
  const setVisible = useSetVisibility();

  return (
    <>
      <Tooltip label="Developer drawer" position="bottom">
        <ActionIcon
          onClick={() => setOpened(true)}
          radius="xl"
          variant="filled"
          color="orange"
          sx={{ position: 'absolute', bottom: 0, right: 0, width: 50, height: 50 }}
          size="xl"
          mr={50}
          mb={50}
        >
          <IconTools />
        </ActionIcon>
      </Tooltip>

      <Drawer
        position="left"
        onClose={() => setOpened(false)}
        opened={opened}
        title="Developer drawer"
        padding="xl"
        size="xs"
      >
        <Stack>
          <Button onClick={() => setVisible((prev) => !prev)}>Toggle MDT</Button>
        </Stack>
      </Drawer>
    </>
  );
};

export default Dev;
