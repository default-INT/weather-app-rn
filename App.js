import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {StyleSheet, StatusBar, TouchableWithoutFeedback, View, Text, Button} from 'react-native';
import {Notifications} from "react-native-notifications";

import AppNavigator from './navigation/AppNavigator';
import {store} from './store';
import UserInactivity from "react-native-user-inactivity";
import Config from "react-native-config";
import {DefaultText} from "./components/UI";



export default function App() {
    Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationReceivedForeground(
        (notification, completion) => {
            completion({alert: true, sound: true, badge: false});
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
    const [offScreen, setOffScreen] = useState(false);
    const SessionDieScreen = () => {
        return (
            <View style={styles.container}>
                <DefaultText style={styles.text}>Session die</DefaultText>
                <Button title='Create new session' onPress={() => setOffScreen(false)} color={Config.PRIMARY_COLOR}/>
            </View>
        )
    }
    return (

        <Provider store={store}>
            {offScreen ? <SessionDieScreen /> : <UserInactivity
                timeForInactivity={60000}
                onAction={isActive => {
                    setOffScreen(!isActive);
                }}
            >
                <AppNavigator/>
            </UserInactivity>}

            <StatusBar hidden={false}/>
        </Provider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Config.MAIN_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
    text: {
        fontSize: 24,
        fontFamily: 'Roboto-Bold',
        marginVertical: 10
    }
});
