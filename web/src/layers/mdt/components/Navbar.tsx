import { createStyles, Stack } from '@mantine/core';
import { IconGavel, IconLayoutDashboard, IconMap2, IconReceipt, IconUsers, IconUserShield } from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';
import NavCharacter from './NavCharacter';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import NavButton from './NavButton';
import locales from '../../../locales';

const useStyles = createStyles((theme) => ({
  navContainer: {
    backgroundColor: theme.colors.durple[6],
    borderTopLeftRadius: theme.radius.md,
    borderBottomLeftRadius: theme.radius.md,
    width: 300,
    height: '100%',
    padding: theme.spacing.xs,
  },
}));

const Navbar: React.FC = () => {
  const matches = useMediaQuery('(max-width: 1599px)');
  const { classes } = useStyles();
  const location = useLocation();
  const NAV_BUTTONS = React.useMemo(
    () => [
      {
        label: locales.dashboard,
        icon: IconLayoutDashboard,
        path: '/',
      },
      {
        label: locales.profiles,
        icon: IconUsers,
        path: '/profiles',
      },
      {
        label: locales.reports,
        icon: IconReceipt,
        path: '/reports',
      },
      {
        label: locales.dispatch,
        icon: IconMap2,
        path: '/dispatch',
      },
      {
        label: locales.charges,
        icon: IconGavel,
        path: '/charges',
      },
      {
        label: locales.roster,
        icon: IconUserShield,
        path: '/roster',
      },
    ],
    []
  );

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
