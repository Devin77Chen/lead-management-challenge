import React from 'react';
import 'react-native-gesture-handler';
import Meteor from 'react-native-meteor';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Home from '@scenes/Home';
import Settings from './settings';
import themes from '@themes';

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
      <SafeAreaProvider>
        <NavigationContainer theme={navigationTheme}>
          <Home />
        </NavigationContainer>
      </SafeAreaProvider>
    );
};

export default App;
