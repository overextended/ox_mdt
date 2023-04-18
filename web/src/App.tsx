import { Box } from '@mantine/core';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <Box style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box
        display="flex"
        sx={(theme) => ({
          width: 1300,
          height: 750,
          borderRadius: theme.radius.md,
          backgroundColor: theme.colors.durple[7],
          color: theme.colors.dark[0],
        })}
      >
        <Navbar />
        <Box sx={{ alignSelf: 'baseline' }} w="100%" h="100%" p="md">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<>Reports</>} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
