import React from 'react';
import Routes from './src/Routes';
import {FirebaseProvider} from './src/contexts/FirebaseContext';

function App(): JSX.Element {
  return (
    <FirebaseProvider>
      <Routes />
    </FirebaseProvider>
  );
}

export default App;
