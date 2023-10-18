import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../StyleSheet/CommonStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAlpacadeleteRequest, makeAlpacagetRequest, post_DelAlpacaData, post_GetAlpacaData } from '../Utils/utils';
import { DashboardStyles } from '../Screens/Dashboard/dashboardStyle';
import MaterialIconsAdd from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from "@react-navigation/native";
import Modal from 'react-native-modal';
import { WatchListStyles } from '../Screens/WatchlistScreens/WatchList/WatchListStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dashboardwatchsnap from './dashboardwatchsnap';
import Trash from 'react-native-vector-icons/FontAwesome';

interface gainProp {

  navigation: any,
  alpcaidprop: any,
}

const Watchlist = (props: gainProp) => {

  const isFocused = useIsFocused();
  const [getWatchlist, setWatchlist] = useState([]);
  const [data, setData] = useState([{}]);
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const isCancelled = React.useRef(false);
  const [firstwlist, setfirstwlist] = useState('');
  const [watchlistid, setwatchlistid] = useState('');
  const [getCreatedate, setCreatedate] = useState('');
  const [watchlistdestail, setWatchlistdestail] = useState([]);
  const [getSnapshot, setSnapshot] = useState([]);
  const [sym, setsym] = useState([]);
  const [isModalerr, setModalerr] = useState(false);
  const [delflg, setdelflg] = useState(false);
  const [isActive, setActive] = useState(false);
  const [flagdelicon, setflagdelicon] = useState(false);
  const [flagdel, setflagdel] = useState(false);


  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  const getWatchlistdata = async () => {

    let savealpcaid: any = await AsyncStorage.getItem('alpaca_id');

    if (savealpcaid != null) {

      try {

        // makeAlpacagetRequest('trading/accounts/' + savealpcaid + '/watchlists')
        //   .then(async (result: any) => {

        //     if (result.data != 0) {
        //       if (!isCancelled.current) {
        //         var firstdata = result.data.sort(sortFunction)
        //         setfirstwlist(firstdata[0].name);
        //         setwatchlistid(firstdata[0].id)
        //         setCreatedate(firstdata[0].created_at)
        //         var morewatchlist = firstdata.slice(1);
        //         setData(morewatchlist);
        //         onLoadfun(firstdata[0].id)
        //       }
        //     }
        //     else {

        //       setWatchlist([]);
        //     }
        //   })
        //   .catch(function (error) {
        //     var errmsg = JSON.stringify(error.response.data.message)
        //     seterrortext(errmsg)
        //     setModalCreate(true)
        //   });
        var data = {
          url: 'trading/accounts/' + savealpcaid + '/watchlists',
        };
        let tokenidstore = await AsyncStorage.getItem('token');
        post_GetAlpacaData('alpaca/getalpacadata', data, tokenidstore)
          .then(async (result: any) => {
            if (result.data.data != 0) {
              if (!isCancelled.current) {
                var firstdata = result.data.data.sort(sortFunction)
                setfirstwlist(firstdata[0].name);
                setwatchlistid(firstdata[0].id)
                setCreatedate(firstdata[0].created_at)
                var morewatchlist = firstdata.slice(1);
                setData(morewatchlist);
                onLoadfun(firstdata[0].id)
              }
            }
            else {
              setWatchlist([]);
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
    }
  };

  const onflatlistclick = async () => {

    AsyncStorage.setItem('watchListid', watchlistid);
    AsyncStorage.setItem('watchList_Name', firstwlist);
    AsyncStorage.setItem('watchList_created_at', getCreatedate)
    props.navigation.navigate('WatchListDetails');

  };

  function sortFunction(a: any, b: any) {
    if (a.created_at < b.created_at) {
      return -1;
    }
    if (a.created_at > b.created_at) {
      return 1;
    }
    return 0;
  }

  const saveArray1: any = []

  const onLoadfun = async (id: any) => {

    let savealpcaid: any = await AsyncStorage.getItem('alpaca_id');

    try {

      // makeAlpacagetRequest('trading/accounts/' + savealpcaid + '/watchlists/' + id)
      //   .then(async (result: any) => {
      //     if (result.data != 0) {
      //       if (result.data.assets.length > 0) {
      //         setWatchlistdestail(result.data.assets);
      //       } else {
      //         setWatchlistdestail([]);
      //       }
      //     }
      //   })
      //   .catch(function (error) {
      //     Alert.alert(
      //       'Error',
      //       JSON.stringify(error.response.data.message),
      //       [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      //       { cancelable: false },
      //     );
      //     console.log(error);
      //   });
      var data = {
        url: 'trading/accounts/' + savealpcaid + '/watchlists/' + id,
      };
      let tokenidstore = await AsyncStorage.getItem('token');
      post_GetAlpacaData('alpaca/getalpacadata', data, tokenidstore)
        .then(async (result: any) => {
          if (result.data.data != 0) {
            if (result.data.data.assets.length > 0) {
              setWatchlistdestail(result.data.data.assets);
            } else {
              setWatchlistdestail([]);
            }
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

      // makeAlpacadeleteRequest(
      //   'trading/accounts/' + savealpcaid + '/watchlists/' + watchlistid + '/' + wachlistsymbol + '',
      // ).then(async (result: any) => {
      //   var errmsg = 'stock delete successfully'
      //   seterrortext(errmsg)
      //   setModalerr(true)
      //   AsyncStorage.removeItem('deletwatchsym');
      //   getWatchlistdata();
      //   setActive(false)
      //   setflagdelicon(false)
      // }).catch(function (error) {
      //   var errmsg = JSON.stringify(error.response.data.message)
      //   seterrortext(errmsg)
      //   setModalerr(true)
      //   console.log(error);
      // });

      var body = {
        "url": 'trading/accounts/' + savealpcaid + '/watchlists/' + watchlistid + '/' + wachlistsymbol + '',
      }
      let tokenidstore = await AsyncStorage.getItem('token');
      post_DelAlpacaData('alpaca/deletealpacadata', body, tokenidstore).then(async (result: any) => {
        var errmsg = 'stock delete successfully'
        seterrortext(errmsg)
        setModalerr(true)
        AsyncStorage.removeItem('deletwatchsym');
        getWatchlistdata();
        setActive(false)
        setflagdelicon(false)
      }).catch(function (error) {
        var errmsg = JSON.stringify(error.response.data.message)
        seterrortext(errmsg)
        setModalerr(true)
        console.log(error);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getSymbol = async (symbol: string) => {

    setActive(!isActive);
    setflagdelicon(!flagdelicon)
    AsyncStorage.setItem('symbolsavedash', symbol)

  }
  useEffect(() => {
    if (isFocused) {
      getWatchlistdata();
    }
    // onLoadfun();

    return () => { isCancelled.current = true; }
  }, [isFocused]);

  return (
    <View style={DashboardStyles.watchListView}>
      <View style={DashboardStyles.wishListAddView}>
        <Text style={DashboardStyles.BoxHeading}>Watchlists</Text>
        <TouchableOpacity onPress={() => onflatlistclick()}>
          <View style={DashboardStyles.addBtn}>
            <View style={DashboardStyles.plusViewGr}>
              <MaterialIconsAdd
                name="add"
                style={DashboardStyles.plusGr}
              />
            </View>
            <Text style={DashboardStyles.addMoneyTxtGr}>
              Add
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={DashboardStyles.BoxHeadingSub}>{firstwlist}</Text>

      <View style={DashboardStyles.newWatchlist}>

        {watchlistdestail.map((key: any, index: any) => (
          <View key={key.id} style={DashboardStyles.newWatchlistInn}>
            <TouchableOpacity key={key.id} onPress={() => getSymbol(key.symbol)}>
              <View style={[DashboardStyles.newWatchBox, isActive ? DashboardStyles.newWatchBoxSelected : null]}>
                <View style={[CommonStyles.stocklogo, CommonStyles.noBorder,]}>
                  <Image source={{ uri: 'https://stock-logo.s3.amazonaws.com/logos/' + key.symbol + '.png' }} style={CommonStyles.stocklogoImgWtclist} />
                </View>
                <Text style={DashboardStyles.newWatchSymbol}>{key.symbol}</Text>
                <Dashboardwatchsnap id={key.id} symbol={key.symbol} />
              </View>
            </TouchableOpacity>

            {flagdelicon &&
              <View>
                <TouchableOpacity style={[CommonStyles.deleteBtn, CommonStyles.deleteBtnDashboard]} onPress={() => deleteconfirm(key.symbol)}>
                  <Trash name='trash-o' style={CommonStyles.deleteBtnIcon} />
                </TouchableOpacity>
              </View>
            }
          </View>
        ))}
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
    </View>
  );
};

export default Watchlist;