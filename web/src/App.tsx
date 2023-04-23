import { AppShell, Box, createStyles, Group, Header, Text } from '@mantine/core';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Profiles from './pages/profiles/Profiles';
import NavCharacter from './components/NavCharacter';

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

  return (
    <Box className={classes.container}>
      <AppShell navbar={<Navbar />} fixed={false} classNames={{ root: classes.root, body: classes.body }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/reports" element={<>Reports</>} />
        </Routes>
      </AppShell>
    </Box>
  );
}

export default App;
