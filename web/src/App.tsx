import { AppShell, Box } from '@mantine/core';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Profiles from './pages/profiles/Profiles';

function App() {
  return (
    <Box style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <AppShell
        navbar={<Navbar />}
        fixed={false}
        styles={(theme) => ({
          root: {
            width: 1300,
            height: 750,
          },
          body: {
            width: 'inherit',
            height: 'inherit',
            backgroundColor: theme.colors.durple[7],
            borderRadius: theme.radius.md,
          },
        })}
      >
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
