import { View, Text, TouchableOpacity, Image, Alert, ImageBackground, FlatList, TouchableWithoutFeedback, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeGetRequest } from '../Utils/utils';
import { DashboardStyles } from '../Screens/Dashboard/dashboardStyle';
import ImagesAll from '../StyleSheet/ImagesAll';
import ColorSheet from '../StyleSheet/ColorSheet';

interface marketProp {

  //   navigation: any,
}

const Market = (props: marketProp) => {


  const isCancelled = React.useRef(false);
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [marketdata, setMarketdata] = useState([]);

  const [dowprice, setdowprice] = useState(0);
  const [dowchange, setdowchange] = useState(0);
  const [dowchangesper, setdowchangesper] = useState(0);

  const [nasprice, setnasprice] = useState(0);
  const [naschange, setnaschange] = useState(0);
  const [naschangesper, setnaschangesper] = useState(0);

  const [spprice, setspprice] = useState(0);
  const [spchange, setspchange] = useState(0);
  const [spchangesper, setspchangesper] = useState(0);
  const [timerState, setTimerState] = useState(null);
  let timer: any = null;

  const getMarketdata = async () => {

    try {

      // makeMarketRequest('quotes/index?apikey=3218ebd5e9c7858b01df0fc7940570d2')
      //   .then(async (result: any) => {
      //     if (!isCancelled.current) {
      //       for (let i = 0; i < result.data.length; i++) {
      //         if (result.data[i].name == 'Dow Jones Industrial Average') {
      //           setdowprice(result.data[i].price)
      //           setdowchange(result.data[i].change)
      //           setdowchangesper(result.data[i].changesPercentage)
      //         }
      //         if (result.data[i].name == 'NASDAQ 100') {
      //           setnasprice(result.data[i].price)
      //           setnaschange(result.data[i].change)
      //           setnaschangesper(result.data[i].changesPercentage)
      //         }
      //         if (result.data[i].name == 'S&P 500') {
      //           setspprice(result.data[i].price)
      //           setspchange(result.data[i].change)
      //           setspchangesper(result.data[i].changesPercentage)
      //         }
      //       }
      //     }
      //   })
      //   .catch(function (error) {
      //     var errmsg = JSON.stringify(error.response.data.message)
      //     seterrortext(errmsg)
      //     setModalCreate(true)
      //   });

      let tokenidstore = await AsyncStorage.getItem('token');
      makeGetRequest('alpaca/getexchangeData', tokenidstore)
        .then(async (result: any) => {
          if (!isCancelled.current) {
            for (let i = 0; i < result.data.data.length; i++) {
              if (result.data.data[i].name == 'Dow Jones Industrial Average') {
                setdowprice(result.data.data[i].price)
                setdowchange(result.data.data[i].change)
                setdowchangesper(result.data.data[i].changesPercentage)
              }
              if (result.data.data[i].name == 'NASDAQ 100') {
                setnasprice(result.data.data[i].price)
                setnaschange(result.data.data[i].change)
                setnaschangesper(result.data.data[i].changesPercentage)
              }
              if (result.data.data[i].name == 'S&P 500') {
                setspprice(result.data.data[i].price)
                setspchange(result.data.data[i].change)
                setspchangesper(result.data.data[i].changesPercentage)
              }
            }
          }
        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error.response.data.message)
          seterrortext(errmsg)
          setModalCreate(true)
        });

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!timerState) {
      getMarketdata();
    };
    timer = setInterval(() => {
      getMarketdata();
      setTimerState(timer);
    }, 60000 * 5);
    return () => clearInterval(timer);
  }, []);

  return (
    <View>
      <View style={DashboardStyles.MarketViewOut}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={DashboardStyles.MarketView}>
            <Image source={ImagesAll.Trade1} />
            <Text style={DashboardStyles.tradeTxt}>DOW</Text>
            {/* <Image source={ImagesAll.TradeDown} /> */}
            {(dowchange > 0) ?
              <Text
                style={[
                  DashboardStyles.plusMinusValue,
                  ,
                ]}>
                {dowchange.toFixed(2)} ({dowchangesper.toFixed(2)}%)
              </Text> :
              <Text
                style={[

                  { color: ColorSheet.$LightRed },
                ]}>
                {dowchange.toFixed(2)} ({dowchangesper.toFixed(2)}%)
              </Text>
            }
            <Text style={DashboardStyles.shareValue}>{dowprice.toFixed(2)}</Text>
          </View>
          <View style={DashboardStyles.MarketView}>
            <Image source={ImagesAll.Trade2} />
            <Text style={DashboardStyles.tradeTxt}>NASDAQ</Text>
            {/* <Image source={ImagesAll.TradeuUp} /> */}
            {(naschange > 0) ?
              <Text style={DashboardStyles.plusMinusValue}>
                {naschange.toFixed(2)} ({dowchangesper.toFixed(2)}%)
              </Text> :
              <Text style={[
                { color: ColorSheet.$LightRed },
              ]}>
                {naschange.toFixed(2)} ({dowchangesper.toFixed(2)}%)
              </Text>}
            <Text style={DashboardStyles.shareValue}>{nasprice.toFixed(2)}</Text>
          </View>
          <View style={DashboardStyles.MarketView}>
            <Image source={ImagesAll.Trade3} />
            <Text style={DashboardStyles.tradeTxt}>S&P500</Text>
            {/* <Image source={ImagesAll.TradeDown} /> */}
            {(spchange > 0) ?
              <Text
                style={[
                  DashboardStyles.plusMinusValue,
                  { color: ColorSheet.$LightRed },
                ]}>
                {spchange.toFixed(2)} ({spchangesper.toFixed(2)}%)
              </Text> :
              <Text
                style={[
                  { color: ColorSheet.$LightRed },
                ]}>
                {spchange.toFixed(2)} ({spchangesper.toFixed(2)}%)
              </Text>
            }
            <Text style={DashboardStyles.shareValue}>{spprice.toFixed(2)}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default React.memo(Market);