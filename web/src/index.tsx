/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, hashIntegration } from '@solidjs/router';
import './index.css';
import App from './App';
import { isEnvBrowser } from './utils/misc';

const root = document.getElementById('root');

if (isEnvBrowser()) {
  const root = document.getElementById('root');

  // https://i.imgur.com/iPTAdYV.png - Night time img
  root!.style.backgroundImage = 'url("https://i.imgur.com/iPTAdYV.png")';
  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
}

render(
  () => (
    <Router source={hashIntegration()}>
      <App />
    </Router>
  ),
  root!
);
