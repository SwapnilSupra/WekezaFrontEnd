
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { makeAlpacagetRequest, makeAlpacapostRequest, post_GetAlpacaData, post_PostAlpacaData } from '../../../Utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlatlistCard from '../../../ReusableComponents/flatlistCard';
import Modal from 'react-native-modal';
import { WatchListStyles } from '../WatchList/WatchListStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

var arr: any = [];
var symbole_arr: any = [];


const WatchListSearch = ({ navigation, route, props }: any) => {

  const [load, getLoad] = useState(false);
  const [Select, setSelect] = useState(false);
  const [getAsset, setAsset] = useState([]);
  const [data, setDate]: any[] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource]: any[] = useState([]);
  const [flagsearch, setflagsearch] = useState(false);
  const { watchitemId, otherParam, paramname } = route.params;
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [modalflg, setmodalflg] = useState(false);

  let watchListname;

  const fetchMore = () => {

    setLoading(true);
    setDate(getAsset);
  };

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  function getTradable(a: any) {

    if (a.tradable != false) {
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

  const onLoadfun = async () => {
    setLoading(true);
    try {

      // makeAlpacagetRequest('assets?status=active&asset_class=us_equity&exchange=AMEX,ARCA,BATS,NYSE,NASDAQ')
      //   .then(async (result: any) => {

      //     let data = result.data.filter(getTradable);
      //     setAsset(data.sort(sortbyascename));
      //     setDate(data.sort(sortbyascename));
      //     getLoad(true);
      //     setFilteredDataSource(result.data)
      //     console.log(result.data[0].account_id);
      //     console.log(result.data[0].nickname);
      //     setLoading(false);
      //     if (result.data.lenght >= 0) {
      //       console.log(result)
      //     }
      //     else { console.log('in else'); }
      //   })
      //   .catch(function (error) {
      //     // Alert.alert(
      //     //   'Error',
      //     //   JSON.stringify(error.response.data.message),
      //     //   [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      //     //   { cancelable: false },
      //     // );
      //     var errmsg = JSON.stringify(error.response.data.message)
      //     seterrortext(errmsg)
      //     setModalCreate(true)
      //     console.log(error);
      //     setLoading(false);
      //   });

      var uridata = {
        url: 'assets?status=active&asset_class=us_equity&exchange=AMEX,ARCA,BATS,NYSE,NASDAQ',
      };
      let tokenidstore = await AsyncStorage.getItem('token');
      post_GetAlpacaData('alpaca/getalpacadata', uridata, tokenidstore)
        .then(async (result: any) => {
          let data = result.data.data.filter(getTradable);
          setAsset(data.sort(sortbyascename));
          setDate(data.sort(sortbyascename));
          getLoad(true);
          setFilteredDataSource(result.data.data)
          setLoading(false);
        })
        .catch(function (error) {
          console.log(JSON.stringify(error.response.data.message));
        });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const searchData = (text: any) => {

    if (text) {
      console.log(text);
      setflagsearch(true)
      const newData = getAsset.filter(item => {
        const itemData = item.symbol.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.startsWith(textData);
      });

      if (newData.length > 0) {
        setFilteredDataSource(newData.sort(sortbyascename));
        setSearch(text);
        setLoading(false);
      } else {
        const newDataname = getAsset.filter(item => {
          //  console.log(">>> "+JSON.stringify(item))
          const itemData = item.name.toUpperCase();
          const textData = text.toUpperCase();
          // console.log(itemData.indexOf(textData));   
          return itemData.startsWith(textData);
        });

        if (newDataname.length > 0) {
          setFilteredDataSource(newDataname.sort(sortbyascename));
          setSearch(text);
          setLoading(false);
        }
      }
    } else {
      setflagsearch(true)
      setFilteredDataSource(getAsset);
      setSearch(text);
      setLoading(false);
    }
  }

  const createWatchlist = async () => {

    watchListname = await AsyncStorage.getItem('watchListname');
    symbole_arr = await AsyncStorage.getItem('symbolarr');
    let arrdata = JSON.parse(symbole_arr);
    let account_id = await AsyncStorage.getItem('alpaca_id');

    try {

      // var body = {
      //   "name": watchListname,
      //   "symbols": arrdata
      // }

      // makeAlpacapostRequest('trading/accounts/' + account_id + '/watchlists', body)
      //   .then(async (result: any) => {
      //     console.log(result);
      //     AsyncStorage.setItem('symbolarr', '');
      //     navigation.navigate('WatchList');
      //   })
      //   .catch(function (error) {
      //     var errmsg = JSON.stringify(error.response.data.message)
      //     seterrortext(errmsg)
      //     setModalCreate(true)
      //     console.log(error);
      //   });

      var body = {
        "url": 'trading/accounts/' + account_id + '/watchlists',
        "name": watchListname,
        "symbols": arrdata
      }
      let tokenidstore = await AsyncStorage.getItem('token');
      post_PostAlpacaData('alpaca/postalpacadata', body, tokenidstore)
        .then(async (result: any) => {
          AsyncStorage.setItem('symbolarr', '');
          navigation.navigate('WatchList');
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

  const renderFooter = () => {

    return (
      <View>
        {loading ? (
          <ActivityIndicator
            color="black"
            style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={CommonStyles.sideSpace}>
        <FlatlistCard id={item.id} symbol={item.symbol} name={item.name} otherParam={otherParam} watchitemId={watchitemId} isActive={false} navigation={navigation} />
      </View>
    );
  };

  const renderItem_filter = ({ item, index }) => {

    return (
      <View style={CommonStyles.sideSpace}>
        <FlatlistCard id={item.id} symbol={item.symbol} name={item.name} otherParam={otherParam} watchitemId={watchitemId} isActive={false} navigation={navigation} />
      </View>
    );
  };

  useEffect(() => {

    if (!load) {
      setDate([]);
      setFilteredDataSource([]);
      onLoadfun();
    }
  }, [load]);

  return (
    <View>
      <View style={[CommonStyles.sideSpace, CommonStyles.commonTopSP,]}>
        <View>
          <TextInput
            placeholder="Search"
            onChangeText={(text) => searchData(text)}
            value={search}
            placeholderTextColor={ColorSheet.$Gray6}
            style={[CommonStyles.inputField, { paddingLeft: 43 }]}
          />
          <Fontisto
            name="search"
            size={18}
            color={ColorSheet.$Gray7}
            style={CommonStyles.searchFild}
          />
        </View>
        {paramname &&
          <View style={CommonStyles.commonBotSm}>
            <TouchableOpacity
              onPress={() => createWatchlist()}>
              <View style={CommonStyles.btnCotainer}>
                <Text style={CommonStyles.btnTxt}>Add To Watchlist</Text>
              </View>
            </TouchableOpacity>
          </View>}
      </View>
      {
        (flagsearch) ?
          <FlatList
            data={filteredDataSource}
            numColumns={1}
            onEndReached={fetchMore}
            renderItem={renderItem_filter}
            keyExtractor={item => item.id.toString()}
          /> :
          <FlatList
            data={data}
            numColumns={1}
            onEndReached={fetchMore}
            ListFooterComponent={renderFooter}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
      }
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

          {/* <View style={CommonStyles.commonBotSP}>
              <TouchableOpacity onPress={()=>navigation.navigate('Orders')}>
                <View style={[CommonStyles.btnCotainer, {marginTop: 10}]}>
                  <Text style={CommonStyles.btnTxt}>Ok</Text>
                </View>
              </TouchableOpacity>
            </View>: */}
          <View style={CommonStyles.commonBotSP}>
            <TouchableOpacity onPress={toggleModal1}>
              <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                <Text style={CommonStyles.btnTxt}>Ok</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WatchListSearch;

const styles = StyleSheet.create({

  list: {
    width: '100%',
    backgroundColor: '#000',
  },
  item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
  ckItem: {
    width: 15,
    height: 15,
    marginTop: 1,
  },
});