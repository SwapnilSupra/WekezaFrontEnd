import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../StyleSheet/CommonStyle';
import ImagesAll from '../StyleSheet/ImagesAll';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAlpacamarketgetRequest, makeGetRequest, makePostMarket } from '../Utils/utils';
import { TradeStyles } from '../Screens/Trading/Trade/TradeStyle';

interface trendingProp {
  symbol: any,
  navigation: any,
  symbolname: any,
}

var symbole_arr: any = [];
let timer: any = null;

const TrendingStocks = (props: trendingProp) => {

  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [Select, setSelect] = useState(false);
  const [getSnapshot, setSnapshot] = useState({ "c": 0, "h": 0, "l": 0, "o": 0 });
  const [getDate, setDate] = useState('');
  const [getTime, setTime] = useState('');

  const isCancelled = React.useRef(false);


  const getSymbol = async (symbol: string) => {

    let getdata = await AsyncStorage.getItem('symbolarr');
    if (getdata == null) { symbole_arr = []; }
    if (symbole_arr.includes(symbol)) {
      var index = symbole_arr.indexOf(symbol);
      if (index > -1) {
        symbole_arr.splice(index, 1);
      }
    } else {
      symbole_arr.push(symbol);
    }
    AsyncStorage.setItem('symbolarr', JSON.stringify(symbole_arr));
  };

  const stockDetail = async (symbol: any, symbolname: any) => {

    let idalpca: any = await AsyncStorage.getItem('alpaca_id');
    let achidstr: any = await AsyncStorage.getItem('achidval');
    if (idalpca == null) {
      Alert.alert(
        'Success',
        'Create a wekeza trading account',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
    } else if (achidstr == null) {

      Alert.alert(
        'Success',
        'Link Your Bank account',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
    }
    else {
      AsyncStorage.setItem('tradeSymbol', symbol);
      AsyncStorage.setItem('tradeSymbolname', symbolname);
      props.navigation.navigate('TradeStack', { screen: 'DetailsStockView' });
    }
  };

  const snapShot = async (symbol: any) => {

    try {

      // makeAlpacamarketgetRequest('stocks/snapshots?symbols=' + symbol)
      //   .then(async (result: any) => {
      //     if (!isCancelled.current) {

      //       setSnapshot(result.data[symbol].minuteBar);
      //       var date = new Date(result.data[symbol].minuteBar.t);
      //       setDate(date.toISOString().split("T")[0].split(".")[0]);
      //       setTime(date.toISOString().split("T")[1].split(".")[0]);
      //     }
      //   })
      //   .catch(function (error) {
      //     setSnapshot({ "c": 0, "h": 0, "l": 0, "o": 0 });
      //     var errmsg = JSON.stringify(error.response.data.message)
      //     seterrortext(errmsg)
      //     setModalCreate(true)
      //   });

      var data = {
        url: 'stocks/snapshots?symbols=' + symbol,
      };
      let tokenidstore = await AsyncStorage.getItem('token');
      makePostMarket('alpaca/getalpacamarketdata', data, tokenidstore)
        .then(async (result: any) => {
          if (!isCancelled.current) {

            setSnapshot(result.data.data[symbol].minuteBar);
            var date = new Date(result.data.data[symbol].minuteBar.t);
            setDate(date.toISOString().split("T")[0].split(".")[0]);
            setTime(date.toISOString().split("T")[1].split(".")[0]);
          }
        })
        .catch(function (error) {
          setSnapshot({ "c": 0, "h": 0, "l": 0, "o": 0 });
          var errmsg = JSON.stringify(error.response.data.message)
          seterrortext(errmsg)
          setModalCreate(true)
        });

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {

    snapShot(props.symbol);
    return () => {
      isCancelled.current = true; //clearInterval(timer);
    }
  }, [props.symbol]);

  return (

    <View style={CommonStyles.sideSpace} >
      {/* <TouchableOpacity key={'1'} onPress={() => getSymbol(props.symbol)}> */}
      <View
        style={[
          CommonStyles.StockView, CommonStyles.stockViewDetails,
          Select ? TradeStyles.selected : null,
        ]}>
        <View style={CommonStyles.cardHead}>
          <View style={CommonStyles.stLeft}>
            <View style={CommonStyles.stocklogo}>
              <Image source={{ uri: 'https://stock-logo.s3.amazonaws.com/logos/' + props.symbol + '.png' }} style={CommonStyles.stocklogoImg} />
            </View>
            <View style={CommonStyles.stNamOut}>
              <Text style={CommonStyles.stockName}>{props.symbolname.replace('Common Stock', '')}</Text>
              <Text style={CommonStyles.StockCode}>{props.symbol}</Text>
            </View>
          </View>
          <View style={CommonStyles.bellOut}>
            <TouchableOpacity>
              <FontAwesome name="bell-o" style={CommonStyles.bellIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => stockDetail(props.symbol, props.symbolname)}>
              <Text style={CommonStyles.tradeBut}>Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={CommonStyles.cartPriceOpen}>
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
      {/* </TouchableOpacity> */}
    </View>
  );
};

export default TrendingStocks;
