import React from 'react';
import {View,Platform} from 'react-native';

import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

function NotificationPermissions() {
    async function GetPermissionsAndToken() {
        let token;
        // isItDevice ?
        if(Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                // Here To Fetch is not accept permissions
                // alert('Failed to get push token for push notification!');
                return "none"
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;

            if(Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                  });
            }
            return token;
        }
    }

     return {
         GetPermissionsAndToken
     }
}

export default NotificationPermissions()