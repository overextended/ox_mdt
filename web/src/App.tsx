import React from 'react';
import MDT from './layers/mdt/MDT';
import Dev from './layers/dev/Dev';
import { isEnvBrowser } from './utils/misc';
import Dispatch from './layers/dispatch/Dispatch';

function App() {
  return (
    <>
      <MDT />
      <Dispatch />
      {isEnvBrowser() && <Dev />}
    </>
  );
}

export default App;
