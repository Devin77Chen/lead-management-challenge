import React from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import Meteor from 'react-native-meteor';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Home from '@scenes/Home';
import Settings from './settings';
import themes from '@themes';
import store from './src/store';

Meteor.connect(Settings.SERVER_URL);

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: themes.primaryColor
  }
}

const App: () => React$Node = () => {
  return (
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer theme={navigationTheme}>
            <Home />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
};

export default App;
