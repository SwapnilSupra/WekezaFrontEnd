
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

let count: any;
let message: any;
export let notification_count: number;

export async function requestUserPermission() {

    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        getFcmToken();
    }
};

const getFcmToken = async () => {

    // let fcmToken = await AsyncStorage.getItem('fcmToken');

    // console.log(fcmToken, 'this is old');

    // if (!fcmToken) {

    try {
        const fcmToken = await messaging().getToken();
        console.log('in func', fcmToken);
        if (fcmToken) {
            console.log(fcmToken + ' this is new');
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }

    } catch (error) {
        console.log('error raised in fcm token' + error);
    }
    //}
};

const showNotification = (notification: any) => {

    console.log("notification >> " + notification);

    PushNotification.createChannel(
        {
            channelId: "Wekezatradingapp_1", // (required)
            channelName: "Wekeza Trading", // (required)
            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            playSound: true, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );

    PushNotification.localNotification({
        title: notification.title,
        message: notification.body!,
        channelId: "Wekezatradingapp_1",
    });
};

export const notificationListener = async () => {

    // AsyncStorage.setItem('notification_count', '0');
    let count = await AsyncStorage.getItem('notification_count');
    if (count == null || count == '') { notification_count = 0; }
    else { notification_count = Number(count); }
    // messaging().onNotificationOpenedApp(remoteMessage => {
    //     console.log(
    //         'Notification caused app to open from background state:', remoteMessage.notification,
    //     );
    // })
    messaging().onMessage(async remoteMessage => {
        console.log(
            'receive message foreground', remoteMessage.notification,
        );
        showNotification(remoteMessage.notification);
        notification_count += 1;
        AsyncStorage.setItem('notification_count', notification_count.toString());
        AsyncStorage.setItem('notification_Message', JSON.stringify(remoteMessage.notification));
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        
        console.log('Message handled in the background!', remoteMessage);
        notification_count += 1;
        AsyncStorage.setItem('notification_count', notification_count.toString());
        AsyncStorage.setItem('notification_Message', JSON.stringify(remoteMessage.notification));
    });

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:', remoteMessage.notification,
                );
            }
        });
};