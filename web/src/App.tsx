import React from 'react';
import MDT from './layers/mdt/MDT';
import Dev from './layers/dev/Dev';
import { isEnvBrowser } from './utils/misc';

function App() {
  return (
    <>
      <MDT />
      {isEnvBrowser() && <Dev />}
    </>
  );
}

export default App;
