import React from 'react';
import {Provider} from 'react-redux';
import { StyleSheet, StatusBar, View } from 'react-native';
import {Notifications} from "react-native-notifications";

import AppNavigator from './navigation/AppNavigator';
import {store} from './store';



export default function App() {
  Notifications.registerRemoteNotifications();

  Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        completion({ alert: true, sound: true, badge: false });
        console.log(
            `Notification received in foreground: ${notification.title} : ${notification.body}`
        );
      }
  );

  Notifications.events().registerNotificationOpened(
      (notification, completion) => {
        console.log(`Notification opened: ${notification.payload}`);
      }
  );
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
