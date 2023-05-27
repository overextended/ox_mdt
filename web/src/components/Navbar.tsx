import { Stack, createStyles } from '@mantine/core';
import { IconGavel, IconLayoutDashboard, IconMap2, IconReceipt, IconUserShield, IconUsers } from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';
import NavCharacter from './NavCharacter';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import NavButton from './NavButton';

const useStyles = createStyles((theme) => ({
  navContainer: {
    backgroundColor: theme.colors.durple[6],
    borderTopLeftRadius: theme.radius.md,
    borderBottomLeftRadius: theme.radius.md,
    width: 300,
    height: '100%',
    padding: theme.spacing.md,
  },
}));

const NAV_BUTTONS = [
  {
    label: 'Dashboard',
    icon: IconLayoutDashboard,
    path: '/',
  },
  {
    label: 'Profiles',
    icon: IconUsers,
    path: '/profiles',
  },
  {
    label: 'Reports',
    icon: IconReceipt,
    path: '/reports',
  },
  {
    label: 'Dispatch',
    icon: IconMap2,
    path: '/dispatch',
  },
  {
    label: 'Charges',
    icon: IconGavel,
    path: '/charges',
  },
  {
    label: 'Officers',
    icon: IconUserShield,
    path: '/Officers',
  },
];

const Navbar: React.FC = () => {
  const matches = useMediaQuery('(max-width: 1599px)');
  const { classes } = useStyles();
  const location = useLocation();

  return (
    <>
      {!matches ? (
        <Stack className={classes.navContainer} justify="space-between">
          <Stack spacing={0}>
            {NAV_BUTTONS.map((button) => (
              <NavButton
                key={button.path}
                icon={button.icon}
                label={button.label}
                path={button.path}
                isActive={location.pathname === button.path}
              />
            ))}
          </Stack>
          <NavCharacter />
        </Stack>
      ) : (
        <Stack w={80} className={classes.navContainer}>
          <Stack spacing={0} justify="center" align="center">
            {NAV_BUTTONS.map((button) => (
              <NavButton
                key={button.path}
                icon={button.icon}
                label={button.label}
                path={button.path}
                isActive={location.pathname === button.path}
                isSmall
              />
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Navbar;
