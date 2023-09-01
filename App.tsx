import React from 'react';
import {AppNavigator} from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {StatusBar, useColorScheme} from 'react-native';

const App = () => {
  const colors = useColorScheme();
  return (
    <Provider store={store}>
      <StatusBar
        barStyle={colors === 'dark' ? 'light-content' : 'dark-content'}
      />
      <AppNavigator />
    </Provider>
  );
};

export default App;
