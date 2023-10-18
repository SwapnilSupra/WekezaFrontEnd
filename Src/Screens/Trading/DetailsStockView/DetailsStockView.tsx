
import { ScrollView, Text, Image, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import { DetailsStockViewStyles } from './DetailsStockViewStyle';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAlpacagetRequest, makeAlpacamarketgetRequest, makePostMarket, post_GetAlpacaData, retrieveApiKeydata } from '../../../Utils/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import DetailChart from '../../../ReusableComponents/detailchart';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


let symbol: any
let symbolname: any;
let volume: any;
let openprice: any;
let closeprice: any
let timer: any = null;

interface AuthMessage {
  action: string;
  key: string;
  secret: string;
};

var ws = new WebSocket('wss://stream.data.sandbox.alpaca.markets/v2/iex'); //'wss://stream.data.sandbox.alpaca.markets/v2/iex'

ws.onopen = async () => {

  // const retrievedObject = await retrieveApiKeydata();
  // ws.send('{"action": "auth", "key": ' + retrievedObject.Username + ', "secret": ' + retrievedObject.Password + '}'); //Send Message
  try {
    const retrievedObject = await retrieveApiKeydata();
    // Construct the authentication message
    const authMessage: AuthMessage = {
      action: 'auth',
      key: retrievedObject.Username,
      secret: retrievedObject.Password,
    };
    ws.send(JSON.stringify(authMessage)); // Send Message
  } catch (error) {
    //console.error('Error retrieving API key data:', error);
  }
};

const DetailsStockView = ({ navigation }: any) => {

  const [getCommand, setCommand] = useState(false);
  const [getSymbolname, setSymbolname] = useState();
  const [getSymbol, setSymbol] = useState();
  const [getQuote, setQuote] = useState({});
  const [getTrade, setTrade] = useState({});
  const [getBar, setBar] = useState({});
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [timerState, setTimerState] = useState(null);
  const [get_Clock, set_Clock] = useState();
  const [getMinbar, setMinbar] = useState();
  const [getMintime, setMintime] = useState();
  const [getDate, setDate] = useState('');
  const [getTime, setTime] = useState('');
  const [datetime, setDatetime] = useState(new Date());
  const [clockflg, setclockflg] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const stockBuy = async () => {

    AsyncStorage.setItem('tradeType', 'buy');
    AsyncStorage.setItem('volume', JSON.stringify(getBar.v));
    AsyncStorage.setItem('openprice', JSON.stringify(getBar.o));
    AsyncStorage.setItem('bid', JSON.stringify(getQuote.bp));
    AsyncStorage.setItem('ask', JSON.stringify(getQuote.ap));

    navigation.navigate('ConfirmOrder');
  }

  const stockSell = async () => {

    AsyncStorage.setItem('tradeType', 'sell');
    AsyncStorage.setItem('volume', JSON.stringify(getBar.v));
    AsyncStorage.setItem('openprice', JSON.stringify(getBar.o));
    AsyncStorage.setItem('bid', JSON.stringify(getQuote.bp));
    AsyncStorage.setItem('ask', JSON.stringify(getQuote.ap));

    navigation.navigate('ConfirmOrder')
  }

  const onLoadfun = async () => {

    try {

      symbol = await AsyncStorage.getItem('tradeSymbol');
      symbolname = await AsyncStorage.getItem('tradeSymbolname');
      setSymbolname(symbolname);
      setSymbol(symbol);
    } catch (e) {
      console.log(e);
    }
  }

  const snapShot = async () => {

    try {

      symbol = await AsyncStorage.getItem('tradeSymbol');

      // makeAlpacamarketgetRequest('stocks/' + symbol + '/snapshot')
      //   .then(async (result: any) => {
      //     if (result.data != null) {
      //       setBar(result.data.dailyBar);
      //       setTrade(result.data.latestTrade);
      //       setQuote(result.data.latestQuote);
      //       var date = new Date(result.data.minuteBar.t);
      //       setDate(date.toISOString().split("T")[0].split(".")[0]);
      //       setTime(date.toISOString().split("T")[1].split(".")[0]);
      //     }
      //     else { }
      //   })
      //   .catch(function (error) {
      //     var errmsg = JSON.stringify(error.response.data.message)
      //     seterrortext(errmsg)
      //     setModalCreate(true)
      //   });

      var data = {
        url: 'stocks/' + symbol + '/snapshot',
      };
      let tokenidstore = await AsyncStorage.getItem('token');
      makePostMarket('alpaca/getalpacamarketdata', data, tokenidstore)
        .then(async (result: any) => {
          if (result.data.data != null) {
            setBar(result.data.data.dailyBar);
            setTrade(result.data.data.latestTrade);
            setQuote(result.data.data.latestQuote);
            var date = new Date(result.data.data.minuteBar.t);
            setDate(date.toISOString().split("T")[0].split(".")[0]);
            setTime(date.toISOString().split("T")[1].split(".")[0]);
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
  }

  // const latestTrade = async () => {

  //   try {
  //     symbol = await AsyncStorage.getItem('tradeSymbol');
  //     makeAlpacamarketgetRequest('stocks/' + symbol + '/trades/latest')
  //       .then(async (result: any) => {
  //         if (result.data.trade != null) { setTrade(result.data.trade); }
  //         else { setTrade([]); }
  //       })
  //       .catch(function (error) {
  //         var errmsg = JSON.stringify(error.response.data.message)
  //         seterrortext(errmsg)
  //         setModalCreate(true)
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // const latestQuote = async () => {

  //   try {
  //     symbol = await AsyncStorage.getItem('tradeSymbol');
  //     makeAlpacamarketgetRequest('stocks/' + symbol + '/quotes/latest')
  //       .then(async (result: any) => {
  //         if (result.data.quote != null) { setQuote(result.data.quote); }
  //         else { setQuote([]) }
  //       })
  //       .catch(function (error) {
  //         var errmsg = JSON.stringify(error.response.data.message)
  //         seterrortext(errmsg)
  //         setModalCreate(true)
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // const getoneday = async () => {
  //   var startdate: any;
  //   if (clockflg == false) {
  //     var d = new Date();
  //     // console.log('Today is: ' + d.toISOString());
  //     d.setDate(d.getDate() - 2);
  //     // console.log('1 days ago was: ' + d.toISOString());
  //     startdate = d.toISOString()
  //     setStartDate(startdate)
  //     console.log('1 days ago was: ' + startdate);
  //   } else {
  //     var d = new Date();
  //     d.setDate(d.getDate() - 1);
  //     startdate = d.toISOString()
  //     setStartDate(startdate)
  //   }
  // }

  // const getfiveday = async () => {
  //   var startdate: any;
  //   if (clockflg == false) {
  //     var d = new Date();
  //     d.setDate(d.getDate() - 6);
  //     startdate = d.toISOString()
  //     setStartDate(startdate)
  //     console.log('5 days ago was: ' + startdate);
  //   } else {
  //     var d = new Date();
  //     d.setDate(d.getDate() - 5);
  //     startdate = d.toISOString()
  //     setStartDate(startdate)
  //   }
  // }

  // const minutebar = async () => {

  //   try {
  //     // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  //     // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  //     // var CurrentDateTime = date + ' ' + time;
  //     // var newdate:any = datetime.getFullYear() + '-' + (datetime.getMonth() + 1).toString().padStart(2, "0") + '-' + datetime.getDate().toString().padStart(2, "0")
  //     var currentDateTime;
  //     if (clockflg == false) {
  //       var d = new Date();        
  //       d.setDate(d.getDate() - 1);
  //       currentDateTime = d.toISOString()
  //     } else {
  //       var d = new Date();
  //       currentDateTime = d.toISOString()
  //     }
  //     symbol = await AsyncStorage.getItem('tradeSymbol');
  //     makeAlpacamarketgetRequest(`stocks/` + symbol + '/bars?start=' + startDate + '&end=' + currentDateTime + '&timeframe=1Min')
  //       .then(async (result: any) => {
  //         if (result.data.bars == null) {
  //           setBar([]);
  //         } else { setBar(result.data.bars[result.data.bars.length - 1]); }
  //       })
  //       .catch(function (error) {
  //         var errmsg = JSON.stringify(error)
  //         seterrortext(errmsg)
  //         setModalCreate(true)
  //       });
  //     // } else {
  //     //   var errmsg = "Please select day option"
  //     //     seterrortext(errmsg)
  //     //     setModalCreate(true)
  //     // }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  const getClock = async () => {

    try {

      // makeAlpacagetRequest('clock')
      //   .then(async (result: any) => {
      //     var saveclock = result.data.is_open;
      //     setclockflg(saveclock)
      //     if (result.data != null) {
      //       set_Clock(result.data.is_open);
      //     }
      //   })
      //   .catch(function (error) {
      //     var errmsg = JSON.stringify(error.response.data.message);
      //   });

      var uridata = {
        url: 'clock',
      };
      let tokenidstore = await AsyncStorage.getItem('token');
      post_GetAlpacaData('alpaca/getalpacadata', uridata, tokenidstore)
        .then(async (result: any) => {
          var saveclock = result.data.data.is_open;
          setclockflg(saveclock)
          if (result.data.data != null) {
            set_Clock(result.data.data.is_open);
          }
        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error.response.data.message);
          console.log(errmsg);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  const web_socket = async () => {

    //if (getCommand == false) {
      console.log('in ws')
      ws.send('{"action": "subscribe", "bars": [' + symbol + '],"dailyBars":[' + symbol + '],"statuses":["*"]}')
      setSymbol(symbol);
      setCommand(true);
    //}

    ws.onmessage = async (e) => {
      console.log(e.data);
      var data = JSON.parse(e.data);
      console.log(data[0].T);
      if (data[0].T == 'd') {
        setMinbar(data[0].c);
        setMintime(data[0].t);
      }
    };
    ws.onerror = (e) => {
      console.log('error ' + e.message);
    };
    ws.onclose = (e) => {
      console.log('onclose ' + e);
    };

  };

  useEffect(() => {
  
    getClock();

    if (get_Clock != undefined) {
      if (get_Clock == false) {
        if (!timerState) {
          onLoadfun();
          snapShot();
        };
        timer = setInterval(() => {
          snapShot();
          setTimerState(timer);
        }, 1000 * 10 * 2);
        return () => clearInterval(timer);
      } else {
        clearInterval(timer);
        onLoadfun();
        snapShot();
        web_socket();
      }
    } else { snapShot(); }

    return () => { console.log('return'); ws.close(); }

    //}
  }, [get_Clock, ws.onmessage]);

  return (

    <ScrollView>
      <View style={CommonStyles.ContainerPink}>
        <View style={[CommonStyles.stdetailsLogo, CommonStyles.sideSpace]}>
          <View style={CommonStyles.stocklogo}>
            <Image source={{ uri: 'https://stock-logo.s3.amazonaws.com/logos/' + getSymbol + '.png' }} style={CommonStyles.stocklogoImg} />
          </View>
          <View style={[DetailsStockViewStyles.stockNameOut]}>
            <Text style={DetailsStockViewStyles.StockName}>{getSymbolname}</Text>
            <Text style={DetailsStockViewStyles.StockSub}>{getSymbol}</Text>
          </View>
        </View>
        <View
          style={[DetailsStockViewStyles.stockData, CommonStyles.sideSpace]}>
          <View style={DetailsStockViewStyles.topOut}>
            <View style={DetailsStockViewStyles.topInner}>
              <Text style={DetailsStockViewStyles.PriceTxt}>Current Price </Text>
              <Text style={DetailsStockViewStyles.currentPrice}>{getBar.c}</Text>
            </View>
            <View style={DetailsStockViewStyles.topInner}>
              <Text style={DetailsStockViewStyles.PriceTxt}>Volume </Text>
              <Text style={DetailsStockViewStyles.currentPrice}>{getBar.v}</Text>
            </View>
          </View>
          <View>
            <Text style={CommonStyles.dateInner}>{getDate} <FontAwesome name="clock-o" /> {getTime} EDT</Text>
          </View>
          <View style={CommonStyles.divider} />
          <View style={DetailsStockViewStyles.DetailsView}>
            <Text style={DetailsStockViewStyles.PriceTxt}>Open Price</Text>
            <Text style={DetailsStockViewStyles.DetailsPrice}>{getBar.o}</Text>
          </View>
          <View style={DetailsStockViewStyles.DetailsView}>
            <Text style={DetailsStockViewStyles.PriceTxt}>Close Price</Text>
            <Text style={DetailsStockViewStyles.DetailsPrice}>{getBar.c}</Text>
          </View>
          <View style={DetailsStockViewStyles.DetailsView}>
            <Text style={DetailsStockViewStyles.PriceTxt}>High price</Text>
            <Text style={DetailsStockViewStyles.DetailsPrice}>{getBar.h}</Text>
          </View>
          <View style={DetailsStockViewStyles.DetailsView}>
            <Text style={DetailsStockViewStyles.PriceTxt}>Low price</Text>
            <Text style={DetailsStockViewStyles.DetailsPrice}>{getBar.l}</Text>
          </View>
          <View style={DetailsStockViewStyles.DetailsView}>
            <Text style={DetailsStockViewStyles.PriceTxt}>Trade Size</Text>
            <Text style={DetailsStockViewStyles.DetailsPrice}>{getTrade.s}</Text>
          </View>
          <View style={DetailsStockViewStyles.DetailsView}>
            <Text style={DetailsStockViewStyles.PriceTxt}>Trade Price</Text>
            <Text style={DetailsStockViewStyles.DetailsPrice}>{getTrade.p}</Text>
          </View>
          <View style={DetailsStockViewStyles.DetailsView}>
            <Text style={DetailsStockViewStyles.PriceTxt}>Bid Price</Text>
            <Text style={DetailsStockViewStyles.DetailsPrice}>{getQuote.bp}</Text>
          </View>
          <View style={DetailsStockViewStyles.DetailsView}>
            <Text style={DetailsStockViewStyles.PriceTxt}>Bid Size</Text>
            <Text style={DetailsStockViewStyles.DetailsPrice}>{getQuote.bs}</Text>
          </View>
          <View style={DetailsStockViewStyles.DetailsView}>
            <Text style={DetailsStockViewStyles.PriceTxt}>Ask Size</Text>
            <Text style={DetailsStockViewStyles.DetailsPrice}>{getQuote.as}</Text>
          </View>
          <View style={DetailsStockViewStyles.DetailsView}>
            <Text style={DetailsStockViewStyles.PriceTxt}>Ask Price</Text>
            <Text style={DetailsStockViewStyles.DetailsPrice}>{getQuote.ap}</Text>
          </View>
        </View>

        {get_Clock === true ? (<DetailChart symbol={'AAPL'} closeprice={getMinbar} time={getMintime} clock_flag={get_Clock} />) : null}
        {get_Clock === false ? (<DetailChart symbol={'AAPL'} closeprice={getBar.c} time={getBar.t} clock_flag={get_Clock} />) : null}

        <View style={[CommonStyles.sideSpace, CommonStyles.commonBotSPDetails]}>
          <View style={CommonStyles.buySellBut}>
            <TouchableOpacity onPress={() => stockBuy()} style={[CommonStyles.buySellButCotainer]}>
              <View>
                <Text style={CommonStyles.btnTxt}>Buy</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => stockSell()} style={[CommonStyles.buySellButCotainer]} >
              <View>
                <Text style={CommonStyles.btnTxt}>Sell</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal isVisible={isModalCreate}>
        <View style={WatchListStyles.ModalView}>
          <TouchableOpacity onPress={toggleModal1}>
            <View style={CommonStyles.closeBtnView}>
              <Ionicons name="close" style={CommonStyles.clodeICon} />
            </View>
          </TouchableOpacity>
          <Text style={WatchListStyles.PopupHeader}>
            {errortext}
          </Text>
          <View style={CommonStyles.commonBotSP}>
            <TouchableOpacity onPress={toggleModal1}>
              <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                <Text style={CommonStyles.btnTxt}>Ok</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default DetailsStockView;
