import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import { WatchListStyles } from './WatchListStyle';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import { WatchListDetailsStyles } from '../WatchlistDetails/WatchListDetailsStyle';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  makeAlpacadeleteRequest,
  makeAlpacagetRequest,
  makeAlpacaputRequest,
  post_DelAlpacaData,
  post_GetAlpacaData,
  post_PutAlpacaRequest,
} from '../../../Utils/utils';
import { RadioButton } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

const WatchList = ({ navigation }: any) => {
  const [getAscending, setAscending] = useState(false);
  const [getDecending, setDecending] = useState(false);
  const [getDatesort, setDatesort] = useState(false);

  const [value, setValue] = React.useState('first');
  const [isModalSort, setModalSort] = useState(false);
  const [isModalCreate, setModalCreate] = useState(false);
  const [getWatchlist, setWatchlist] = useState([]);
  const [getWatchlistname, setWatchlistname] = useState('');
  const [isModalEdit, setModalEdit] = useState(false);
  const [getWatchlistnameup, setWatchlistnameup] = useState('');
  const isFocused = useIsFocused();
  const [stockarr, setstockarr] = useState([]);
  const [Style, setStyle] = useState(false);
  const [isModalerr, setModalerr] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [delflg, setdelflg] = useState(false);


  const toggleModal = () => {
    setModalSort(!isModalSort);
  };

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  const toggleclose = () => {
    setModalEdit(!isModalEdit);
  };

  const toggleModalerr = () => {
    setModalerr(!isModalerr);
  };

  let saveArray1: any = [];
  const editwatchlist = async (data: any) => {

    AsyncStorage.setItem('watchListid', data.id);
    AsyncStorage.setItem('watchList_Name', data.name);
    let savealpcaid: any = await AsyncStorage.getItem('alpaca_id');
    var wid = data.id;
    try {

      // makeAlpacagetRequest('trading/accounts/' + savealpcaid + '/watchlists/' + wid,
      // ).then(async (result: any) => {
      //   var dataval = result.data.assets;
      //   for (let i = 0; i < dataval.length; i++) {
      //     var test = result.data.assets[i].symbol;
      //     saveArray1.push(test);
      //   }
      //   setstockarr(saveArray1);
      // }).catch(function (error) {
      //   var errmsg = JSON.stringify(error.response.data.message)
      //   seterrortext(errmsg)
      //   setModalerr(true)
      //   console.log(error);
      // });

      var uridata = {
        url: 'trading/accounts/' + savealpcaid + '/watchlists/' + wid,
      };
      let tokenidstore = await AsyncStorage.getItem('token');
      post_GetAlpacaData('alpaca/getalpacadata', uridata, tokenidstore)
        .then(async (result: any) => {
          var dataval = result.data.data.assets;
          for (let i = 0; i < dataval.length; i++) {
            var test = result.data.data.assets[i].symbol;
            saveArray1.push(test);
          }
          setstockarr(saveArray1);
        })
        .catch(function (error) {

        });

    } catch (e) {
      console.log(e);
    }
    setWatchlistnameup(data.name);
    setModalEdit(!isModalEdit);
  };
  const navigate_next = (data: any) => {
    AsyncStorage.setItem('watchListid', data.id);
    AsyncStorage.setItem('watchList_Name', data.name);
    AsyncStorage.setItem('watchList_created_at', data.created_at);
    navigation.navigate('WatchListDetails');
  };

  const displayContent = (key: any, index: any) => {
    return (
      <TouchableOpacity key={key.id} onPress={() => navigate_next(key)}>
        <View style={WatchListStyles.listCard}>
          <View style={WatchListStyles.nameSection}>
            <Text style={WatchListStyles.listName}>{key.name}</Text>
          </View>
          <View style={WatchListStyles.iconView}>
            <TouchableOpacity onPress={() => editwatchlist(key)}>
              <FontAwesome name="pencil" style={WatchListStyles.editIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteconfirm(key)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={WatchListStyles.deleteIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onLoadfun = async () => {

    let savealpcaid: any = await AsyncStorage.getItem('alpaca_id');

    try {

      // makeAlpacagetRequest('trading/accounts/' + savealpcaid + '/watchlists')
      //   .then(async (result: any) => {
      //     if (result.data) {
      //       setWatchlist(result.data.sort(sortbyascename));
      //     } else {
      //       setWatchlist([]);
      //     }
      //   })
      //   .catch(function (error) {
      //     var errmsg = JSON.stringify(error.response.data.message)
      //     seterrortext(errmsg)
      //     setModalerr(true)
      //   });

      var uridata = {
        url: 'trading/accounts/' + savealpcaid + '/watchlists',
      };
      let tokenidstore = await AsyncStorage.getItem('token');
      post_GetAlpacaData('alpaca/getalpacadata', uridata, tokenidstore)
        .then(async (result: any) => {
          if (result.data.data) {
            setWatchlist(result.data.data.sort(sortbyascename));
          } else {
            setWatchlist([]);
          }
        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error.response.data.message)
          seterrortext(errmsg)
          setModalerr(true)
        });
    } catch (e) {
      console.log(e);
    }
  };

  function sortFunction(a: any, b: any) {
    var dateA = new Date(a.created_at).getDate();
    var dateB = new Date(b.created_at).getDate();
    return dateA > dateB ? 1 : -1;
  }

  function sortbydecname(a: any, b: any) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  function sortbyascename(a: any, b: any) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  const applyfun = async () => {
    if (getAscending) {
      getWatchlist.sort(sortbyascename);
    } else if (getDecending) {
      getWatchlist.sort(sortbydecname);
    } else {
      getWatchlist.sort(sortFunction);
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

  const onSubmit = async (listname: any) => {
    try {
      if (getWatchlistname !== '') {
        setModalCreate(false);
        AsyncStorage.setItem('watchListname', listname);
        setWatchlistname('');
        setWatchlist([]);
        navigation.navigate('WatchListSearch', { paramname: 'came from create' });
      } else {
        var errmsg = 'Wachlist name should not be empty'
        seterrortext(errmsg)
        setModalerr(true)
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitupdate = async (listname: any) => {
    console.log('in submit')
    let idstorewatchlist = await AsyncStorage.getItem('watchListid');
    let account_id = await AsyncStorage.getItem('alpaca_id');

    try {

      // var body = {
      //   name: getWatchlistnameup,
      //   symbols: stockarr,
      // };
      // makeAlpacaputRequest(
      //   'trading/accounts/' + account_id + '/watchlists/' + idstorewatchlist,
      //   body,
      // ).then(async (result: any) => {
      //   navigation.navigate('WatchList');
      //   setModalEdit(false);
      //   onLoadfun();
      // })  .catch(function (error) {
      //   var errmsg = JSON.stringify(error.result.data.message)
      //   seterrortext(errmsg)
      //   setModalerr(true)
      //   console.log(error);
      // });

      var body = {
        "url": 'trading/accounts/' + account_id + '/watchlists/' + idstorewatchlist,
        name: getWatchlistnameup,
        symbols: stockarr,
      }
      let tokenidstore = await AsyncStorage.getItem('token');
      post_PutAlpacaRequest('alpaca/putalpacadata', body, tokenidstore).then(async (result: any) => {
        navigation.navigate('WatchList');
        setModalEdit(false);
        onLoadfun();
      }).catch(function (error) {
        var errmsg = JSON.stringify(error.result.data.message)
        seterrortext(errmsg)
        setModalerr(true)
        console.log(error);
      });

    } catch (e) {
      console.log(e);
    }
  };

  const deleteconfirm = async (keydata: any) => {
    setdelflg(true)
    var errmsg = 'Do you want to delete this watchlist'
    seterrortext(errmsg)
    setModalerr(true)
    await AsyncStorage.setItem('deletwatch', keydata.id);
  };

  const cancelbtn = async () => {
    AsyncStorage.removeItem('deletwatch');
    setModalerr(false)
    setdelflg(false)
  };

  const deleteWachlist = async () => {
    setdelflg(false)
    setModalerr(false)
    var wachlistidstr = await AsyncStorage.getItem('deletwatch');
    let savealpcaid: any = await AsyncStorage.getItem('alpaca_id');

    try {

      // makeAlpacadeleteRequest(
      //   'trading/accounts/' + savealpcaid + '/watchlists/' + wachlistidstr,
      // ).then(async (result: any) => {
      //   var errmsg = 'Watchlist delete successfully'
      //   seterrortext(errmsg)
      //   setModalerr(true)
      //   AsyncStorage.removeItem('deletwatch');
      //   onLoadfun();
      // }).catch(function (error) {
      //   var errmsg = JSON.stringify(error.response.data.message)
      //   seterrortext(errmsg)
      //   setModalerr(true)
      // });

      var body = {
        "url": 'trading/accounts/' + savealpcaid + '/watchlists/' + wachlistidstr,
      };

      let tokenidstore = await AsyncStorage.getItem('token');

      post_DelAlpacaData('alpaca/deletealpacadata', body, tokenidstore).then(async (result: any) => {
        var errmsg = 'Watchlist delete successfully'
        seterrortext(errmsg)
        setModalerr(true)
        AsyncStorage.removeItem('deletwatch');
        onLoadfun();
      }).catch(function (error) {
        var errmsg = JSON.stringify(error.response.data.message)
        seterrortext(errmsg)
        setModalerr(true)
      });

    } catch (e) {
      console.log(e);
    }
  };

  const watchListData = getWatchlist.map((key, index) => {
    return displayContent(key, index);
  });

  useEffect(() => {
    if (isFocused) {
      onLoadfun();
    }
  }, [isFocused]);

  return (
    <View style={CommonStyles.ContainerPink}>
      <View style={CommonStyles.sideSpace}>
        <View style={WatchListDetailsStyles.btnView}>
          <TouchableOpacity onPress={toggleModal}>
            <View style={WatchListDetailsStyles.sortIconView}>
              <MaterialIcon
                name="sort"
                style={WatchListDetailsStyles.sortIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal1}>
            <View style={WatchListStyles.btnContainerSM}>
              <Text style={WatchListStyles.CreateBtnTxt}>Create New</Text>
            </View>
          </TouchableOpacity>
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
              Create New Watchlist
            </Text>
            <TextInput
              placeholder="Enter Name Of Watchlist"
              placeholderTextColor={ColorSheet.$Gray6}
              style={[
                CommonStyles.inputField,
                { marginTop: 15, borderWidth: 1, borderColor: ColorSheet.$Gray3 },
              ]}
              value={getWatchlistname}
              onChangeText={text => setWatchlistname(text)}
            />
            <View style={CommonStyles.commonBotSP}>
              <TouchableOpacity onPress={() => onSubmit(getWatchlistname)}>
                <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                  <Text style={CommonStyles.btnTxt}>Create</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal isVisible={isModalEdit}>
          <View style={WatchListStyles.ModalView}>
            <TouchableOpacity onPress={toggleclose}>
              <View style={CommonStyles.closeBtnView}>
                <Ionicons name="close" style={CommonStyles.clodeICon} />
              </View>
            </TouchableOpacity>
            <Text style={WatchListStyles.PopupHeader}>Update Watchlist</Text>
            <TextInput
              placeholder="Enter Name Of Watchlist"
              placeholderTextColor={ColorSheet.$Gray6}
              style={[
                CommonStyles.inputField,
                { marginTop: 15, borderWidth: 1, borderColor: ColorSheet.$Gray3 },
              ]}
              value={getWatchlistnameup}
              onChangeText={text => setWatchlistnameup(text)}
            />
            <View style={CommonStyles.commonBotSP}>
              <TouchableOpacity
                onPress={() => onSubmitupdate(getWatchlistnameup)}>
                <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                  <Text style={CommonStyles.btnTxt}>update</Text>
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
                <TouchableOpacity onPress={deleteWachlist}>
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
        <Text style={WatchListStyles.listMainTxt}>My Watchlist</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={CommonStyles.sideSpace}>{watchListData}</View>
      </ScrollView>
    </View>
  );
};

export default WatchList;
