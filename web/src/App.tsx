import { AppShell, Box, Container, Group } from '@mantine/core';
import { useState } from 'react';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Box style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Group
        spacing={0}
        sx={(theme) => ({
          width: 1300,
          height: 750,
          borderRadius: theme.radius.md,
          backgroundColor: theme.colors.durple[7],
          color: theme.colors.dark[2],
        })}
      >
        <Navbar />
        <Box sx={{ alignSelf: 'baseline' }}>
          <Routes>
            <Route path="/" element={<>Dashboard</>} />
            <Route path="/reports" element={<>Reports</>} />
          </Routes>
        </Box>
      </Group>
    </Box>
  );
}

export default App;
