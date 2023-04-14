/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, hashIntegration } from '@solidjs/router';
import './index.css';
import App from './App';

const root = document.getElementById('root');

render(
  () => (
    <Router source={hashIntegration()}>
      <App />
    </Router>
  ),
  root!
);
