import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../StyleSheet/CommonStyle';
import ImagesAll from '../StyleSheet/ImagesAll';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAlpacadeleteRequest, makeAlpacamarketgetRequest, makePostMarket, post_DelAlpacaData } from '../Utils/utils';
import { WatchLSearchStyles } from '../Screens/WatchlistScreens/WatchListSearch/WatchListSearchStyle';
import Trash from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { WatchListStyles } from '../Screens/WatchlistScreens/WatchList/WatchListStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface flatlistProp {

    id: any,
    name: any,
    symbol: any,
    navigation: any,
    watchid: any,
    flg: any,
    isActive: any,
}


const WatchFlatlist = (props: flatlistProp) => {

    const [errortext, seterrortext] = useState('');
    const [isModalCreate, setModalCreate] = useState(false);
    const [getSnapshot, setSnapshot] = useState('');
    const [getSnapshot1, setSnapshot1] = useState([]);
    const [timerState, setTimerState] = useState(null);
    const [getDate, setDate] = useState('');
    const [getTime, setTime] = useState('');
    const [isModalerr, setModalerr] = useState(false);
    const [delflg, setdelflg] = useState(false);
    const [isActive, setActive] = useState(props.isActive);
    const [flagdelicon, setflagdelicon] = useState(false);

    let timer: any = null;

    const stockDetail = async (data: any) => {

        AsyncStorage.setItem('tradeSymbol', data.symbol);
        AsyncStorage.setItem('tradeSymbolname', data.name);
        props.navigation.navigate('DetailsStockView')
    };

    const snapShot = async (symbol: any) => {

        try {

            // makeAlpacamarketgetRequest('stocks/' + symbol + '/snapshot')
            //     .then(async (result: any) => {

            //         if (result.data !== null) {
            //             setSnapshot(result.data.minuteBar);
            //             var date = new Date(result.data.minuteBar.t);
            //             setDate(date.toISOString().split("T")[0].split(".")[0]);
            //             setTime(date.toISOString().split("T")[1].split(".")[0]);
            //         }
            //         else { }
            //     })
            //     .catch(function (error) {
            //         setSnapshot('');
            //     });

            var data = {
                url: 'stocks/' + symbol + '/snapshot',
            };
            let tokenidstore = await AsyncStorage.getItem('token');
            makePostMarket('alpaca/getalpacamarketdata', data, tokenidstore)
                .then(async (result: any) => {
                    if (result.data.data !== null) {
                        setSnapshot(result.data.data.minuteBar);
                        var date = new Date(result.data.data.minuteBar.t);
                        setDate(date.toISOString().split("T")[0].split(".")[0]);
                        setTime(date.toISOString().split("T")[1].split(".")[0]);
                    }
                    else { }
                })
                .catch(function (error) {
                    setSnapshot('');
                });
        } catch (e) {
            console.log(e);
        }
    };

    // const web_socket = async (symbol: any) => {
    //     ws.send('{"action": "subscribe", "bars": ["' + symbol + '"],"dailyBars":["AAPL"],"statuses":["*"]}')
    //     ws.onmessage = (e) => {
    //         console.log(e.data);
    //         var data = JSON.parse(e.data);
    //         console.log(data[0].T);
    //         if (data[0].T == 'b') {
    //             setSnapshot1(data[0].o);
    //         }
    //     };
    //     ws.onerror = (e) => {
    //         console.log('error ' + e.message);
    //     };
    //     ws.onclose = (e) => {
    //         console.log('onclose ' + e);
    //     };
    // }

    const toggleModalerr = () => {
        setModalerr(!isModalerr);
    };

    const deleteconfirm = async (keydata: any) => {

        setdelflg(true)
        var errmsg = 'Do you want to delete this stock'
        seterrortext(errmsg)
        setModalerr(true)
        await AsyncStorage.setItem('deletwatchsym', keydata);
    };

    const cancelbtn = async () => {
        AsyncStorage.removeItem('deletwatchsym');
        setModalerr(false)
        setdelflg(false)
    };

    const deleteWachlistsym = async () => {

        setdelflg(false)
        setModalerr(false)

        var wachlistsymbol = await AsyncStorage.getItem('deletwatchsym');
        let savealpcaid: any = await AsyncStorage.getItem('alpaca_id');

        try {
            console.log('in del');
            // makeAlpacadeleteRequest('trading/accounts/' + savealpcaid + '/watchlists/' + props.watchid + '/' + wachlistsymbol + '',
            // ).then(async (result: any) => {
            //     var errmsg = 'stock delete successfully'
            //     seterrortext(errmsg)
            //     setModalerr(true)
            //     AsyncStorage.removeItem('deletwatchsym');
            //     props.navigation.navigate('WatchList')
            //     //   onLoadfun();
            // }).catch(function (error) {
            //     var errmsg = JSON.stringify(error.response.data.message)
            //     seterrortext(errmsg)
            //     setModalerr(true)
            // });

            var body = {
                "url": 'trading/accounts/' + savealpcaid + '/watchlists/' + props.watchid + '/' + wachlistsymbol + '',
            }
            let tokenidstore = await AsyncStorage.getItem('token');
            post_DelAlpacaData('alpaca/deletealpacadata', body, tokenidstore).then(async (result: any) => {
                var errmsg = 'stock delete successfully'
                seterrortext(errmsg)
                setModalerr(true)
                AsyncStorage.removeItem('deletwatchsym');
                props.navigation.navigate('WatchList')
                //   onLoadfun();
            }).catch(function (error) {
                var errmsg = JSON.stringify(error.response.data.message)
                seterrortext(errmsg)
                setModalerr(true)
            });
        } catch (e) {
            console.log(e);
        }
    };

    var symbole_arr: any = [];
    const getSymbol = async (symbol: string) => {

        setActive(!isActive);
        setflagdelicon(!flagdelicon)
        AsyncStorage.setItem('symbolsave', symbol)

    }
    useEffect(() => {

        if (!timerState) {
            snapShot(props.symbol);
        };
        timer = setInterval(() => {
            snapShot(props.symbol);
            setTimerState(timer);
        }, 1000 * 60 * 5);
        return () => clearInterval(timer);
    }, [props.symbol]);

    return (
        <View >
            <TouchableOpacity key={props.id} onPress={() => getSymbol(props.symbol)}>
                <View style={[CommonStyles.StockView, CommonStyles.stockViewDetails, isActive ? CommonStyles.StockViewSelected : null]}>
                    <View style={CommonStyles.cardHead}>
                        <View style={CommonStyles.stLeft}>
                            <View style={CommonStyles.stocklogo}>
                                <Image source={{ uri: 'https://stock-logo.s3.amazonaws.com/logos/' + props.symbol + '.png' }} style={{ height: 50, width: 50 }} />
                            </View>
                            <View style={CommonStyles.stNamOut}>
                                <Text style={CommonStyles.stockName}>{props.name.replace('Common Stock', '')}</Text>
                                <Text style={CommonStyles.StockCode}>{props.symbol}</Text>
                            </View>
                        </View>
                        <View style={CommonStyles.bellOut}>
                            <TouchableOpacity>
                                <FontAwesome name="bell-o" style={CommonStyles.bellIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => stockDetail(props)}>
                                <Text style={CommonStyles.tradeBut}>Trade</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={CommonStyles.cartPriceOpen}>
                        {/* <View><Text>{getSnapshot1}</Text></View> */}
                        <View>
                            {getSnapshot !== null ? (
                                <Text style={CommonStyles.StckPrice}>{getSnapshot.o != null ? Number(getSnapshot.o).toFixed(2) : null}</Text>
                            ) : null}
                            <Text style={CommonStyles.StckPriceTxt}>Open Price</Text>
                        </View>
                        <View>
                            {getSnapshot !== null ? (
                                <Text style={CommonStyles.StckPrice}>{Number(getSnapshot.c).toFixed(2)}</Text>
                            ) : null}
                            <Text style={CommonStyles.StckPriceTxt}>Close Price</Text>
                        </View>
                        <View>
                            {getSnapshot !== null ? (
                                <Text style={CommonStyles.StckPrice}>{Number(getSnapshot.h).toFixed(2)}</Text>)
                                : null}
                            <Text style={CommonStyles.StckPriceTxt}>High Price</Text>
                        </View>
                        <View>
                            {getSnapshot !== null ? (
                                <Text style={CommonStyles.StckPrice}>{Number(getSnapshot.l).toFixed(2)}</Text>
                            ) : null}
                            <Text style={CommonStyles.StckPriceTxt}>Low price</Text>
                        </View>
                    </View>
                    <View style={CommonStyles.dateTme}>
                        {getSnapshot !== null ? (
                            <Text style={CommonStyles.dateInner}>{getDate} <FontAwesome name="clock-o" /> {getTime}</Text>
                        ) : null}
                        <Text style={CommonStyles.TimeInner}>EDT</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Modal isVisible={isModalerr}>
                <View style={WatchListStyles.ModalView}>
                    <TouchableOpacity onPress={toggleModalerr}>
                        <View style={CommonStyles.closeBtnView}>
                            <Ionicons name="close" style={CommonStyles.clodeICon} />
                        </View>
                    </TouchableOpacity>
                    <Text style={WatchListStyles.PopupHeader}>
                        {errortext}
                    </Text>
                    {(delflg) ?
                        <View style={CommonStyles.commonBotSP}>
                            <TouchableOpacity onPress={deleteWachlistsym}>
                                <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                                    <Text style={CommonStyles.btnTxt}>Yes</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={cancelbtn}>
                                <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                                    <Text style={CommonStyles.btnTxt}>No</Text>
                                </View>
                            </TouchableOpacity>
                        </View> :
                        <View style={CommonStyles.commonBotSP}>
                            <TouchableOpacity onPress={toggleModalerr}>
                                <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                                    <Text style={CommonStyles.btnTxt}>Ok</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </Modal>
            {flagdelicon &&
                <View>
                    <TouchableOpacity style={CommonStyles.deleteBtn} onPress={() => deleteconfirm(props.symbol)}>
                        <Trash name='trash-o' style={CommonStyles.deleteBtnIcon} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};
export default WatchFlatlist;
