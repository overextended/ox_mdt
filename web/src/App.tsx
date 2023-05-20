import { AppShell, Box, createStyles, Transition } from '@mantine/core';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Profiles from './pages/profiles/Profiles';
import React from 'react';
import { useVisibilityState } from './state/visibility';
import { useNuiEvent } from './hooks/useNuiEvent';
import { fetchNui } from './utils/fetchNui';
import { Character, useSetCharacter } from './state';
import Reports from './pages/reports/Reports';

const useStyles = createStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    width: 1500,
    height: 800,

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
}));

function App() {
  const { classes } = useStyles();
  const [visible, setVisible] = useVisibilityState();
  const setCharacter = useSetCharacter();

  useNuiEvent('setVisible', () => {
    setVisible(true);
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

  React.useEffect(() => {
    fetchNui<Character>('uiLoaded', null, {
      data: {
        id: 'XYZ123',
        firstName: 'Svetozar',
        lastName: 'Miletić',
        title: 'LSPD Officer',
        grade: 4,
        callSign: 192,
      },
    }).then((data) => {
      setCharacter(data);
    });
  }, []);

  return (
    <Box className={classes.container}>
      <Transition transition="fade" mounted={visible}>
        {(style) => (
          <AppShell
            style={style}
            navbar={<Navbar />}
            fixed={false}
            classNames={{ root: classes.root, body: classes.body }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </AppShell>
        )}
      </Transition>
    </Box>
  );
}

export default App;
