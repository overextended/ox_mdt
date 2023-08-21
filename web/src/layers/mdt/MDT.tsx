import React from 'react';
import { useVisibilityState } from '../../state/visibility';
import { useSetCharacter } from '../../state';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { default as locales, setLocale } from '../../locales';
import { Character } from '../../typings';
import { fetchNui } from '../../utils/fetchNui';
import { AppShell, Box, createStyles, Transition } from '@mantine/core';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Profiles from './pages/profiles/Profiles';
import Reports from './pages/reports/Reports';
import Dispatch from './pages/dispatch/Dispatch';
import LoaderModal from './components/LoaderModal';

const useStyles = createStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    width: 1650,
    height: 825,
    zIndex: 1,
    ['@media (max-width: 1599px)']: {
      width: 1200,
      height: 700,
    },

    ['@media (max-width: 1279px)']: {
      width: 1000,
      height: 600,
    },
  },
  body: {
    width: 'inherit',
    height: 'inherit',
    backgroundColor: theme.colors.durple[7],
    borderRadius: theme.radius.md,
  },
  main: {
    padding: theme.spacing.xs,
  },
}));

const MDT: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useVisibilityState();
  const setCharacter = useSetCharacter();

  useNuiEvent('setLocales', (data: typeof locales) => {
    setLocale(data);
  });

  useNuiEvent('setVisible', (data?: Character) => {
    setVisible(true);
    data && setCharacter(data);
  });

  const handleESC = (e: KeyboardEvent) => {
    if (visible && e.key === 'Escape') {
      setVisible(false);
      fetchNui('hideMDT');
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleESC);

    return () => window.removeEventListener('keydown', handleESC);
  }, [visible]);

  return (
    <>
      <Box className={classes.container}>
        <Transition transition="slide-up" mounted={visible}>
          {(style) => (
            <AppShell
              style={style}
              navbar={<Navbar />}
              fixed={false}
              classNames={{ root: classes.root, body: classes.body, main: classes.main }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profiles" element={<Profiles />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/dispatch" element={<Dispatch />} />
              </Routes>
            </AppShell>
          )}
        </Transition>
      </Box>
      <LoaderModal />
    </>
  );
};

export default MDT;
