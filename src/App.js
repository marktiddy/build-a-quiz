import React from 'react';
import './App.scss';

//New store
import Store from './context/Store';

import MainScreen from './screens/MainScreen';

const App = () => {
  return (
    <Store>
      <MainScreen />
    </Store>
  );
};

export default App;
