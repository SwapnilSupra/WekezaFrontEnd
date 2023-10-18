import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { CommonStyles } from '../StyleSheet/CommonStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { WatchLSearchStyles } from '../Screens/WatchlistScreens/WatchListSearch/WatchListSearchStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAlpacapostRequest, post_PostAlpacaData } from '../Utils/utils';

interface cardProp {
    id: any,
    name: any,
    symbol: any,
    otherParam: any,
    watchitemId: any,
    isActive: any,
    navigation: any
}

var symbole_arr: any = [];

const FlatlistCard = (props: cardProp) => {

    const [isActive, setActive] = useState(props.isActive);

    const getSymbol = async (symbol: string) => {

        let getdata = await AsyncStorage.getItem('symbolarr');
        if (getdata == null) { symbole_arr = []; }
        setActive(!isActive);
        if (symbole_arr.includes(symbol)) {
            var index = symbole_arr.indexOf(symbol);
            if (index > -1) {
                symbole_arr.splice(index, 1);
            }
        } else {
            symbole_arr.push(symbol);
        }
        AsyncStorage.setItem('symbolarr', JSON.stringify(symbole_arr));
    }

    const addStocks = async (itm: any) => {

        let savealpcaid: any = await AsyncStorage.getItem('alpaca_id');
        var symbol_edit = itm.symbol;
        var wid = itm.watchitemId;
        try {

            // var body = {
            //     "symbol": symbol_edit
            // }

            // makeAlpacapostRequest('trading/accounts/' + savealpcaid + '/watchlists/' + wid, body)
            //     .then(async (result: any) => {
            //         Alert.alert(
            //             'Success',
            //             `Added ${symbol_edit} successfully`,
            //             [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            //             { cancelable: false },
            //         );
            //         props.navigation.navigate('WatchList');
            //     })
            //     .catch(function (error) {
            //         Alert.alert(
            //             'Error',
            //             JSON.stringify(error.response.data.message),
            //             [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            //             { cancelable: false },
            //         );

            //     });

            var body = {
                "url": 'trading/accounts/' + savealpcaid + '/watchlists/' + wid,
                "symbol": symbol_edit
            }
            let tokenidstore = await AsyncStorage.getItem('token');
            post_PostAlpacaData('alpaca/postalpacadata', body, tokenidstore)
                .then(async (result: any) => {
                    Alert.alert(
                        'Success',
                        `Added ${symbol_edit} successfully`,
                        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                        { cancelable: false },
                    );
                    props.navigation.navigate('WatchList');
                })
                .catch(function (error) {
                    Alert.alert(
                        'Error',
                        JSON.stringify(error.response.data.message),
                        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                        { cancelable: false },
                    );
                });

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <TouchableOpacity key={props.id} onPress={() => getSymbol(props.symbol)}>
            <View style={[CommonStyles.StockView, CommonStyles.stockViewDetails,
            isActive ? WatchLSearchStyles.selected : null
            ]}>
                <View style={CommonStyles.cardHead}>
                    <View style={CommonStyles.stLeftSm}>
                        <View style={CommonStyles.stocklogo}>
                            <Image source={{ uri: 'https://stock-logo.s3.amazonaws.com/logos/' + props.symbol + '.png' }} style={{ height: 50, width: 50 }} />
                        </View>
                        <View style={CommonStyles.stNamOut}>
                            <Text style={CommonStyles.stockName}>{props.name.replace('Common Stock', '')}</Text>
                            <Text style={CommonStyles.StockCode}>{props.symbol}</Text>
                        </View>
                    </View>
                    <View style={CommonStyles.bellOutSm}>
                        <TouchableOpacity>
                            <FontAwesome name="bell-o" style={CommonStyles.bellIconSm} />
                        </TouchableOpacity>
                        {(props.otherParam && props.watchitemId) &&
                            <TouchableOpacity onPress={() => addStocks(props)}>
                                <View style={CommonStyles.addBut}>
                                    <Entypo
                                        name="plus"
                                        style={CommonStyles.addIcon}
                                    />
                                </View>
                            </TouchableOpacity>}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default FlatlistCard;
