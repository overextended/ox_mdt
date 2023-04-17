import { Group, Stack, UnstyledButton, Text, Box, Avatar } from '@mantine/core';
import { IconGavel, IconLayoutDashboard, IconMap2, IconReceipt, IconUserShield, IconUsers } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavButton: React.FC<{ icon: React.ComponentType; label: string; path: string }> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <UnstyledButton
      onClick={() => navigate(props.path)}
      sx={(theme) => ({
        color: location.pathname === props.path ? theme.colors.blue[4] : theme.colors.dark[2],
        backgroundColor: location.pathname === props.path ? theme.fn.rgba(theme.colors.blue[6], 0.2) : undefined,
        padding: 16,
        borderRadius: theme.radius.md,
        fontWeight: 500,
        '&:hover': location.pathname !== props.path && { backgroundColor: theme.colors.durple[2], color: 'white' },
      })}
    >
      <Group>
        <props.icon />
        <Text>{props.label}</Text>
      </Group>
    </UnstyledButton>
  );
};

const Navbar: React.FC = () => {
  return (
    <Stack
      p="md"
      w="25%"
      h="100%"
      sx={(theme) => ({
        backgroundColor: theme.colors.durple[6],
        borderTopLeftRadius: theme.radius.md,
        borderBottomLeftRadius: theme.radius.md,
      })}
      justify="space-between"
    >
      <Stack spacing={0}>
        <Text size="xs" tt="uppercase" fw="bold" mb="xs" color="dark.2">
          Pages
        </Text>
        <NavButton icon={IconLayoutDashboard} label="Dashboard" path="/" />
        <NavButton icon={IconUsers} label="Profiles" path="/profiles" />
        <NavButton icon={IconReceipt} label="Reports" path="/reports" />
        <NavButton icon={IconMap2} label="Dispatch" path="/dispatch" />
        <NavButton icon={IconGavel} label="Laws" path="/laws" />
        <Text size="xs" tt="uppercase" fw="bold" mb="xs" mt="xs" color="dark.2">
          Management
        </Text>
        <NavButton icon={IconUserShield} label="Officers" path="/officers" />
      </Stack>
      <Box
        sx={(theme) => ({
          width: '100%',
          background: theme.colors.durple[4],
          borderRadius: theme.radius.md,
          padding: 8,
        })}
      >
        <Group noWrap>
          <Avatar color="blue" radius="xl" />
          <Stack spacing={0} sx={{ overflow: 'hidden' }}>
            <Text truncate color="dark.0">
              Svetozar Miletić
            </Text>
            <Text truncate size="xs" color="dark.2">
              LSPD Officer
            </Text>
          </Stack>
        </Group>
      </Box>
    </Stack>
  );
};

export default Navbar;
