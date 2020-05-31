import React from 'react';
import './App.scss';

//New store
import Store from './context/Store';
import { AuthProvider } from './context/Auth';

import MainScreen from './screens/MainScreen';

const App = () => {
  return (
    <AuthProvider>
      <Store>
        <MainScreen />
      </Store>
    </AuthProvider>
  );
};

export default App;
