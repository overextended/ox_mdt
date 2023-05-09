import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { MantineProvider } from '@mantine/core';
import { HashRouter } from 'react-router-dom';
import { isEnvBrowser } from './utils/misc';
import { theme } from './theme';
import { ModalsProvider } from '@mantine/modals';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Provider } from 'jotai';
import { DatesProvider } from '@mantine/dates';

dayjs.extend(relativeTime);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Provider>
          <DatesProvider settings={{ locale: 'en' }}>
            <ModalsProvider>
              <App />
            </ModalsProvider>
          </DatesProvider>
        </Provider>
      </MantineProvider>
    </HashRouter>
  </React.StrictMode>
);

if (isEnvBrowser()) {
  const root = document.getElementById('root');

  // https://i.imgur.com/iPTAdYV.png - Night time img
  root!.style.backgroundImage = 'url("https://i.imgur.com/3pzRj9n.png")';
  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
}
