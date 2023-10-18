import { ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAlpacagetRequest, post_GetAlpacaData } from '../../../Utils/utils';
import { useIsFocused } from "@react-navigation/native";
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import { RadioButton } from 'react-native-paper';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import { WatchListDetailsStyles } from '../../WatchlistScreens/WatchlistDetails/WatchListDetailsStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PortfolioChart from '../../../ReusableComponents/portfoliochart';
import RBSheet from "react-native-raw-bottom-sheet";

let timer: any = null;

let total_invesment: number = 0;
let day_pl: number = 0;
let total_pl: number = 0;


const Portfolio = ({ navigation }: any) => {

  const refRBSheet = useRef();
  const [getPosition, setPosition] = useState([]);
  const [isModalSort, setModalSort] = useState(false);
  const [value, setValue] = React.useState('first');
  const [getAscending, setAscending] = useState(false);
  const [getDecending, setDecending] = useState(false);
  const [getDatesort, setDatesort] = useState(false);
  const isFocused = useIsFocused();
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [modalflg, setmodalflg] = useState(false);
  const [charteq, setcharteq] = useState([]);
  const [timestamp, setTimestamp] = useState([]);
  const [isModalChart, setModalChart] = useState(false);

  const [get_Clock, set_Clock] = useState();
  const [timerState, setTimerState] = useState(null);


  const toggleModal = () => {
    setModalSort(!isModalSort);
  };

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  const toggleModalchart = () => {
    setModalChart(!isModalChart);
    getchartdata();
  };

  const Modalchartclose = () => {
    setModalChart(false);
  }

  function sortFunction(a: any, b: any) {
    var dateA = new Date(a.created_at).getDate();
    var dateB = new Date(b.created_at).getDate();
    return dateA > dateB ? 1 : -1;
  }

  function sortbydecname(a: any, b: any) {
    if (a.symbol > b.symbol) {
      return -1;
    }
    if (a.symbol < b.symbol) {
      return 1;
    }
    return 0;
  }

  function sortbyascename(a: any, b: any) {
    if (a.symbol < b.symbol) {
      return -1;
    }
    if (a.symbol > b.symbol) {
      return 1;
    }
    return 0;
  }

  const applyfun = async () => {

    if (getAscending) {
      getPosition.sort(sortbyascename);
    } else if (getDecending) {
      getPosition.sort(sortbydecname);
    } else {
      getPosition.sort(sortFunction);
    }
    setModalSort(false);
  };

  const clckradio = async (val: any) => {

    if (val == 'first') {
      setValue('first');
      setAscending(true);
      setDecending(false);
      setDatesort(false);
    } else if (val == 'second') {
      setValue('second');
      setAscending(false);
      setDecending(true);
      setDatesort(false);
    } else {
      setValue('third');
      setAscending(false);
      setDecending(false);
      setDatesort(true);
    }
  };
  const onLoadfun = async () => {

    let savealpcaid: any = await AsyncStorage.getItem('alpaca_id');
    //console.log(savealpcaid)
    try {

      // makeAlpacagetRequest('trading/accounts/' + savealpcaid + '/positions')
      //   .then(async (result: any) => {
      //     setPosition(result.data.sort(sortbyascename));
      //   })
      //   .catch(function (error) {
      //     var errmsg = JSON.stringify(error.response.data.message)
      //     seterrortext(errmsg)
      //     setModalCreate(true)
      //   });

      var uridata = {
        url: 'trading/accounts/' + savealpcaid + '/positions',
      };
      let tokenidstore = await AsyncStorage.getItem('token');
      post_GetAlpacaData('alpaca/getalpacadata', uridata, tokenidstore)
        .then(async (result: any) => {
          setPosition(result.data.data.sort(sortbyascename));
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

  const stockDetail = async (data: any) => {

    let idalpca: any = await AsyncStorage.getItem('alpaca_id');
    let achidstr: any = await AsyncStorage.getItem('achidval');
    if (idalpca == null) {

      var errmsg = 'Create a wekeza trading account'
      seterrortext(errmsg)
      setModalCreate(true)
    } else if (achidstr == null) {
      var errmsg = 'Link Your Bank account'
      seterrortext(errmsg)
      setModalCreate(true)
    }
    else {
      AsyncStorage.setItem('tradeSymbol', data.symbol);
      AsyncStorage.removeItem('tradeSymbolname', data.name);
      navigation.navigate('DetailsStockView');
    }
  }

  const displayContent = (key: any, index: any) => {

    total_invesment = total_invesment + Number(key.current_price);
    day_pl = day_pl + Number(key.unrealized_intraday_pl);
    total_pl = total_pl + Number(key.unrealized_pl);

    return (
      <View style={[CommonStyles.ContainerPink, CommonStyles.sideSpace]} key={index}>
        <TouchableOpacity style={[CommonStyles.StockView, CommonStyles.stockViewDetails]} onPress={() => stockDetail(key)} key={index}>
          <View style={[CommonStyles.cardHead, CommonStyles.portLogoOutRow]}>
            <View style={[CommonStyles.halfBox, CommonStyles.portLogoOut]}>
              <View style={CommonStyles.stocklogo}>
                <Image source={{ uri: 'https://stock-logo.s3.amazonaws.com/logos/' + key.symbol + '.png' }} style={CommonStyles.stocklogoImg} />
              </View>

              <View>
                <Text style={CommonStyles.compName}>{key.exchange}</Text>
                <Text style={CommonStyles.StockCode}>{key.symbol}</Text>
              </View>
            </View>
            <View style={CommonStyles.halfBoxRight}>
              <Text style={[CommonStyles.StckPrice]}>{Number(key.qty).toFixed(2)}</Text>
              <Text style={CommonStyles.StckPriceTxt}>Quantity</Text>
            </View>
          </View>
          <View style={CommonStyles.dividersm} />
          <View style={CommonStyles.StockDetails}>
            {(key.unrealized_intraday_pl > 0) ?
              <View style={CommonStyles.halfBox}>
                <View style={CommonStyles.flexRowNew}>
                  <Text style={[CommonStyles.StckPrice, CommonStyles.profitText]}>{Number(key.unrealized_intraday_pl).toFixed(2)} </Text>
                  <Text style={[CommonStyles.StckPrice, CommonStyles.profitText]}>({Number(key.unrealized_intraday_plpc).toFixed(2)}%)</Text>
                  <AntDesign name='arrowup' color={ColorSheet.$DarkGreen} size={15} />
                </View>
                <Text style={CommonStyles.StckPriceTxt}>Day's Gain</Text>
              </View> :
              <View style={CommonStyles.halfBox}>
                <View style={CommonStyles.flexRowNew}>
                  <Text style={[CommonStyles.StckPrice, CommonStyles.lossText]}>{Number(key.unrealized_intraday_pl).toFixed(2)} </Text>
                  <Text style={[CommonStyles.StckPrice, CommonStyles.lossText]}>({Number(key.unrealized_intraday_plpc).toFixed(2)}%)</Text>
                  <AntDesign name='arrowdown' color={ColorSheet.$RedBtn} size={15} />
                </View>
                <Text style={CommonStyles.StckPriceTxt}>Day's Gain</Text>
              </View>
            }
            {(key.unrealized_pl > 0) ?
              <View style={CommonStyles.halfBox}>
                <View style={CommonStyles.flexRowNew}>
                  <Text style={[CommonStyles.StckPrice, CommonStyles.profitText]}>{Number(key.unrealized_pl).toFixed(2)} </Text>
                  <Text style={[CommonStyles.StckPrice, CommonStyles.profitText]}>({Number(key.unrealized_plpc).toFixed(2)}%)</Text>
                  <AntDesign name='arrowup' color={ColorSheet.$DarkGreen} size={15} />
                </View>
                <Text style={CommonStyles.StckPriceTxt}>Total Gain</Text>
              </View> :
              <View style={CommonStyles.halfBox}>
                <View style={CommonStyles.flexRowNew}>
                  <Text style={[CommonStyles.StckPrice, CommonStyles.lossText]}>{Number(key.unrealized_pl).toFixed(2)} </Text>
                  <Text style={[CommonStyles.StckPrice, CommonStyles.lossText]}>({Number(key.unrealized_plpc).toFixed(2)}%)</Text>
                  <AntDesign name='arrowdown' color={ColorSheet.$RedBtn} size={15} />
                </View>
                <Text style={CommonStyles.StckPriceTxt}>Total Gain</Text>
              </View>
            }
            {(key.market_value > 0) ?
              <View style={CommonStyles.halfBoxRight}>
                <Text style={[CommonStyles.StckPrice, CommonStyles.profitText]}>{Number(key.market_value).toFixed(2)}</Text>
                <Text style={[CommonStyles.StckPriceTxt]}>Market Value</Text>
              </View> :
              <View style={CommonStyles.halfBoxRight}>
                <Text style={[CommonStyles.StckPrice, CommonStyles.lossText]}>{Number(key.market_value).toFixed(2)}</Text>
                <Text style={[CommonStyles.StckPriceTxt]}>Market Value</Text>
              </View>}
          </View>
          <View style={CommonStyles.StockDetails}>
            {(key.cost_basis > 0) ?
              <View style={CommonStyles.halfMiniBox}>
                <Text style={[CommonStyles.StckPrice, CommonStyles.profitText]}>{Number(key.cost_basis).toFixed(2)}</Text>
                <Text style={CommonStyles.StckPriceTxt}>Cost Basis</Text>
              </View> :
              <View style={CommonStyles.halfMiniBox}>
                <Text style={[CommonStyles.StckPrice, CommonStyles.lossText]}>{Number(key.cost_basis).toFixed(2)}</Text>
                <Text style={CommonStyles.StckPriceTxt}>Cost Basis</Text>
              </View>}
            {(key.current_price > 0) ?
              <View style={CommonStyles.halfMiniBox}>
                <Text style={[CommonStyles.StckPrice, CommonStyles.profitText]}>{Number(key.current_price).toFixed(2)}</Text>
                <Text style={CommonStyles.StckPriceTxt}>Current Price</Text>
              </View> :
              <View style={CommonStyles.halfMiniBox}>
                <Text style={[CommonStyles.StckPrice, CommonStyles.lossText]}>{Number(key.current_price).toFixed(2)}</Text>
                <Text style={CommonStyles.StckPriceTxt}>Current Price</Text>
              </View>}
            {(key.lastday_price > 0) ?
              <View style={CommonStyles.halfBoxRight}>
                <Text style={[CommonStyles.StckPrice, CommonStyles.profitText]}>{Number(key.lastday_price).toFixed(2)}</Text>
                <Text style={[CommonStyles.StckPriceTxt,]}>Last day Price</Text>
              </View> :
              <View style={CommonStyles.halfBoxRight}>
                <Text style={[CommonStyles.StckPrice, CommonStyles.lossText]}>{Number(key.lastday_price).toFixed(2)}</Text>
                <Text style={[CommonStyles.StckPriceTxt,]}>Last day Price</Text>
              </View>}
          </View>


        </TouchableOpacity>
      </View>
    );
  }

  const positionList = getPosition.map((key, index) => {
    return displayContent(key, index);
  });

  var fiarr: any = []
  const getchartdata = async () => {

    let savealpcaid: any = await AsyncStorage.getItem('alpaca_id');
    try {

      // makeAlpacagetRequest('trading/accounts/' + savealpcaid + '/account/portfolio/history')
      //   .then(async (result: any) => {
      //     if (result.data != null) {
      //       var eqval = result.data.profit_loss
      //       setcharteq(eqval);
      //       var timestore = result.data.timestamp;
      //       for (let i = 0; i < timestore.length; i++) {
      //         if (timestore[i] < 10000000000)
      //           timestore[i] *= 1000;
      //         var epoch: any = timestore[i] + (new Date().getTimezoneOffset() * -1);
      //         fiarr.push(new Date(epoch).toISOString().split("T")[0].split(".")[0]);
      //       }
      //       setTimestamp(fiarr);
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //     var errmsg = JSON.stringify(error.response.data.message);
      //   });

      var uridata = {
        url: 'trading/accounts/' + savealpcaid + '/account/portfolio/history',
      };
      let tokenidstore = await AsyncStorage.getItem('token');
      post_GetAlpacaData('alpaca/getalpacadata', uridata, tokenidstore)
        .then(async (result: any) => {
          if (result.data.data != null) {
            var eqval = result.data.data.profit_loss
            setcharteq(eqval);
            var timestore = result.data.data.timestamp;
            for (let i = 0; i < timestore.length; i++) {
              if (timestore[i] < 10000000000)
                timestore[i] *= 1000;
              var epoch: any = timestore[i] + (new Date().getTimezoneOffset() * -1);
              fiarr.push(new Date(epoch).toISOString().split("T")[0].split(".")[0]);
            }
            setTimestamp(fiarr);
          }
        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error.response.data.message.message)
          seterrortext(errmsg)
          setModalCreate(true)
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getClock = async () => {

    try {
      // makeAlpacagetRequest('clock')
      //   .then(async (result: any) => {
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

  useEffect(() => {

    getClock();
    getchartdata();
    if (get_Clock != undefined) {
      if (get_Clock == true) {
        if (!timerState) {
          onLoadfun();
        };
        timer = setInterval(() => {
          total_invesment = 0;
          day_pl = 0;
          total_pl = 0;
          onLoadfun();
          setTimerState(timer);
        }, 1000 * 10 * 2);
        return () => clearInterval(timer);
      }
      else {
        clearInterval(timer);
        total_invesment = 0;
        day_pl = 0;
        total_pl = 0;
        onLoadfun();
      }
    } else {
      total_invesment = 0;
      day_pl = 0;
      total_pl = 0;
      onLoadfun()
    }
    //return () => { console.log('return'); }
  }, [timer]);

  return (
    <View style={[CommonStyles.ContainerPink,]}>
      <View style={CommonStyles.sideSpace}>
        <RBSheet
          ref={refRBSheet} style={CommonStyles.chartBox}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={370}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.4)"
            },
            draggableIcon: {
              backgroundColor: ColorSheet.$DarkGreen
            },
          }}
        >
          {/* <Text style={WatchListStyles.PopupHeader}>Chart</Text> */}
          <Text style={WatchListStyles.chartHead}>Chart</Text>
          <PortfolioChart time={timestamp} closeprice={charteq} />
        </RBSheet>

        <View style={CommonStyles.sortTopsp}>
          <View style={WatchListDetailsStyles.btnView}>
            <TouchableOpacity onPress={toggleModal}>
              <View style={WatchListDetailsStyles.sortIconView}>
                <MaterialIcon
                  name="sort"
                  style={WatchListDetailsStyles.sortIcon}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => refRBSheet.current.open()} >
              <View style={WatchListDetailsStyles.sortIconView}>
                <AntDesign
                  name="linechart"
                  style={WatchListDetailsStyles.sortIcon}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleModalchart}>
              <View style={WatchListDetailsStyles.sortIconView}>
                <AntDesign
                  name="linechart"
                  style={WatchListDetailsStyles.sortIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Modal isVisible={isModalSort}>
          <View style={WatchListStyles.ModalView}>
            <TouchableOpacity onPress={toggleModal}>
              <View style={CommonStyles.closeBtnView}>
                <Ionicons name="close" style={CommonStyles.clodeICon} />
              </View>
            </TouchableOpacity>
            <Text style={WatchListStyles.PopupHeader}>Sort By</Text>
            <RadioButton.Group onValueChange={clckradio} value={value}>
              <View style={WatchListStyles.CheckBoxView}>
                <Text style={WatchListStyles.AsenDsenTxt}>Asending Order</Text>
                <RadioButton value="first" color={ColorSheet.$DarkGreen} />
              </View>
              <View style={WatchListStyles.CheckBoxView}>
                <Text style={WatchListStyles.AsenDsenTxt}>Decending Order</Text>
                <RadioButton value="second" color={ColorSheet.$DarkGreen} />
              </View>
              <View style={WatchListStyles.CheckBoxView}>
                <Text style={WatchListStyles.AsenDsenTxt}>Sort By Date</Text>
                <RadioButton value="third" color={ColorSheet.$DarkGreen} />
              </View>
              <View style={CommonStyles.commonBotSP}>
                <TouchableOpacity onPress={() => applyfun()}>
                  <View style={[CommonStyles.btnCotainer, { marginTop: 25 }]}>
                    <Text style={CommonStyles.btnTxt}>Apply</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </RadioButton.Group>
          </View>
        </Modal>
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
        <Modal isVisible={isModalChart}>
          <View style={[WatchListStyles.ModalViewChart]}>
            <TouchableOpacity onPress={Modalchartclose}>
              <View style={CommonStyles.closeBtnViewChart}>
                <Ionicons name="close" style={CommonStyles.clodeICon} />
              </View>
            </TouchableOpacity>
            <Text style={WatchListStyles.PopupHeader}>Chart</Text>

            <PortfolioChart time={timestamp} closeprice={charteq} />

          </View>
        </Modal>
        <View style={[CommonStyles.StockView, CommonStyles.portfolioTop]} >
          <Text style={CommonStyles.stockName}>Total Profit & Loss</Text>
          <View style={CommonStyles.portData}>

            <View style={CommonStyles.halfBox}>
              {(total_invesment > 0) ?
                <>
                  <Text style={[CommonStyles.StckPrice, CommonStyles.StckPriceTopSP, CommonStyles.profitText]}>{total_invesment.toFixed(2)}</Text>
                  <Text style={CommonStyles.StckPriceTxt}>Current Value</Text>
                </> : <>
                  <Text style={[CommonStyles.StckPrice, CommonStyles.StckPriceTopSP, CommonStyles.lossText]}>{total_invesment.toFixed(2)}</Text>
                  <Text style={CommonStyles.StckPriceTxt}>Current Value</Text>
                </>}

              {(day_pl > 0) ?
                <>
                  <Text style={[CommonStyles.StckPricePort, CommonStyles.StckPriceTopSP, CommonStyles.profitText]}>{day_pl.toFixed(2)}</Text>
                  <Text style={CommonStyles.StckPriceTxt}>Days P&L</Text>
                </> : <>
                  <Text style={[CommonStyles.StckPricePort, CommonStyles.StckPriceTopSP, CommonStyles.lossText]}>{day_pl.toFixed(2)}</Text>
                  <Text style={CommonStyles.StckPriceTxt}>Days P&L</Text>
                </>}

            </View>
            <View style={CommonStyles.halfBoxRight}>
              {(total_invesment > 0) ?
                <>
                  <Text style={[CommonStyles.StckPrice, CommonStyles.StckPriceTopSP, CommonStyles.profitText]}>{total_invesment.toFixed(2)}</Text>
                  <Text style={[CommonStyles.StckPriceTxt,]}>Total Investment</Text>
                </> : <>
                  <Text style={[CommonStyles.StckPrice, CommonStyles.StckPriceTopSP, CommonStyles.lossText]}>{total_invesment.toFixed(2)}</Text>
                  <Text style={[CommonStyles.StckPriceTxt,]}>Total Investment</Text>
                </>
              }

              {(total_pl > 0) ?
                <>
                  <Text style={[CommonStyles.StckPricePort, CommonStyles.StckPriceTopSP, CommonStyles.profitText]}>{total_pl.toFixed(2)}</Text>
                  <Text style={[CommonStyles.StckPriceTxt,]}>Total P&L</Text>
                </> : <>
                  <Text style={[CommonStyles.StckPricePort, CommonStyles.StckPriceTopSP, CommonStyles.lossText]}>{total_pl.toFixed(2)}</Text>
                  <Text style={[CommonStyles.StckPriceTxt]}>Total P&L</Text>
                </>
              }

            </View>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {positionList}
      </ScrollView>

      {/* chart add */}
      {/* <View style={{ height: 280 }}>
        <PortfolioChart time={timestamp} closeprice={charteq} />
      </View> */}
    </View>

  );
};

export default Portfolio;
