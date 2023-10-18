import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../StyleSheet/CommonStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WatchListStyles } from '../Screens/WatchlistScreens/WatchList/WatchListStyle';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { createStore } from 'state-pool';
import { ScrollView } from 'react-native-gesture-handler';

// import { notificationListener } from '../ReusableComponents/notificationlistener';

let count: any;
let message: any;
var notification_count: number;
let notiStorarr: any = [];

const store = createStore();
store.setState("count", 0);

const Notification_Bell = ({ setChild }: any) => {

    const [get_Count, setCount] = useState(0);
    const [get_Message, setMessage] = useState([]);
    const [isModalCreate, setModalCreate] = useState(false);


    const toggleModal1 = async () => {
        setModalCreate(!isModalCreate);
        message = await AsyncStorage.getItem('notification_Message');
        let chk = JSON.parse(message);
        setMessage([...get_Message, ...chk]);
    };

    const closebtn = async () => {
        await AsyncStorage.removeItem('notification_Message');
        setMessage([]);
        notiStorarr = [];
        setModalCreate(false)
        await AsyncStorage.removeItem('notification_count')
        notification_count = 0
    };

    const getCount = async () => {

        count = await AsyncStorage.getItem('notification_count');
        setCount(count);

    }

    useEffect(() => {

        getCount();
    }, [store.onStoreUpdate]);

    return (

        <View style={CommonStyles.notificationIcon}>
            <TouchableOpacity onPress={toggleModal1}>
                <FontAwesome name="bell-o" style={CommonStyles.bellIconWiite} />
                {/* <Text>{get_Count}</Text> */}
                <Text onPress={(event) => setChild(notification_count)} style={CommonStyles.bubbleCounter}>{notification_count}</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalCreate}>
                <View style={WatchListStyles.ModalView}>
                    <TouchableOpacity onPress={closebtn} >
                        <View style={CommonStyles.closeBtnView}>
                            <Ionicons name="close" style={CommonStyles.clodeICon} />
                        </View>
                    </TouchableOpacity>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        {(get_Message.length > 0) ? (
                            <View>
                                <View style={WatchListStyles.notificationLineOut}>
                                    <Text style={WatchListStyles.PopupHeader}> Notifications </Text>
                                    {get_Message.map((key: any, index: any) => (
                                        <>
                                            <View>
                                                <Octicons name="dot-fill" style={WatchListStyles.bullet} />
                                                <Text style={WatchListStyles.notificationLine}>
                                                    {key.body}
                                                </Text>
                                            </View>
                                        </>
                                    ))}
                                </View>
                            </View>
                        ) : (
                            <View>
                                <Text style={WatchListStyles.noDataPop}>No Notifications</Text>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

export default Notification_Bell;



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
    // if (!fcmToken) {
    try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log(fcmToken)
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }

    } catch (error) {
        console.log(error);
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
        store.setState("count", notification_count);
        AsyncStorage.setItem('notification_count', notification_count.toString());

        notiStorarr.push(remoteMessage.notification)
        AsyncStorage.setItem('notification_Message', JSON.stringify(notiStorarr));

    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {

        console.log('Message handled in the background!', remoteMessage);
        notification_count += 1;
        store.setState("count", notification_count);
        AsyncStorage.setItem('notification_count', notification_count.toString());
        notiStorarr.push(remoteMessage.notification)
        AsyncStorage.setItem('notification_Message', JSON.stringify(notiStorarr));
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
}