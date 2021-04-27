import React from 'react';
import {Provider} from 'react-redux';
import { StyleSheet, StatusBar, View } from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import {store} from './store';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar hidden={false} />
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
