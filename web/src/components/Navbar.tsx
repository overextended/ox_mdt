import { Group, Stack, UnstyledButton, Text, Box, Avatar } from '@mantine/core';
import { IconGavel, IconLayoutDashboard, IconMap2, IconReceipt, IconUserShield, IconUsers } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavCharacter from './NavCharacter';

const NavButton: React.FC<{ icon: React.ComponentType; label: string; path: string }> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <UnstyledButton
      onClick={() => navigate(props.path)}
      sx={(theme) => ({
        color: location.pathname === props.path ? theme.colors.blue[4] : theme.colors.dark[0],
        backgroundColor: location.pathname === props.path ? theme.fn.rgba(theme.colors.blue[6], 0.2) : undefined,
        padding: 16,
        borderRadius: theme.radius.md,
        fontWeight: 500,
        transition: '150ms',
        '&:hover': location.pathname !== props.path && { backgroundColor: theme.colors.durple[2], color: 'white' },
      })}
    >
      <Stack spacing={0} justify="center" align="center">
        <props.icon />
        <Text>{props.label}</Text>
      </Stack>
    </UnstyledButton>
  );
};

const Navbar: React.FC = () => {
  return (
    <Stack
      p="md"
      h="100%"
      sx={(theme) => ({
        backgroundColor: theme.colors.durple[6],
        borderTopLeftRadius: theme.radius.md,
        borderBottomLeftRadius: theme.radius.md,
      })}
      justify="space-between"
    >
      <Stack spacing={0}>
        <NavButton icon={IconLayoutDashboard} label="Dashboard" path="/" />
        <NavButton icon={IconUsers} label="Profiles" path="/profiles" />
        <NavButton icon={IconReceipt} label="Reports" path="/reports" />
        <NavButton icon={IconMap2} label="Dispatch" path="/dispatch" />
        <NavButton icon={IconGavel} label="Charges" path="/charges" />
        <NavButton icon={IconUserShield} label="Officers" path="/officers" />
      </Stack>
    </Stack>
  );
};

export default Navbar;
