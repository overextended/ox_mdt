import type { Component } from 'solid-js';
import { Route, Routes } from '@solidjs/router';
import Navbar from './components/Navbar';
import Dashboard from './pages/dashboard/Dashboard';
import Modal from './components/Modal';

const App: Component = () => {
  return (
    <div class="flex h-full w-full items-center justify-center">
      <div class="flex h-[750px] w-[1300px] rounded-md bg-durple-500">
        <Navbar />
        <div class="w-full rounded-br-md rounded-tr-md">
          <Routes>
            <Route path="/" component={Dashboard} />
          </Routes>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default App;
