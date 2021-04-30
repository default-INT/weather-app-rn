import React, { Component } from 'react';
import {Notifications} from 'react-native-notifications';

class CustomNotification extends Component {
    constructor(props) {
        super(props);
        Notifications.registerRemoteNotifications();

        Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
            console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
            completion({alert: false, sound: false, badge: false});
        });

        Notifications.events().registerNotificationOpened((notification, completion) => {
            console.log(`Notification opened: ${notification.payload}`);
            completion();
        });
    }
}

export default CustomNotification;