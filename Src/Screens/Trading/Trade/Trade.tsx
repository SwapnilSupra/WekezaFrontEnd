import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import { makeAlpacagetRequest, post_GetAlpacaData } from '../../../Utils/utils';
import { TradeStyles } from './TradeStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Trade = ({ navigation }: any) => {

  const [load, getLoad] = useState(false);
  const [Select, setSelect] = useState(false);
  const [getAsset, setAsset] = useState([]);
  const [data, setDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [flagsearch, setflagsearch] = useState(false);
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');

  let watchListname;

  var symbole_arr: any = [];

  const fetchMore = () => {

    setLoading(true);
    setDate(getAsset);
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

  function getSymbol(symbol: string) {

    if (symbole_arr.includes(symbol)) {

      var index = symbole_arr.indexOf(symbol);
      if (index > -1) {
        symbole_arr.splice(index, 1);
      }
    } else {
      symbole_arr.push(symbol);
    }
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
      //     setLoading(false);
      //   })
      //   .catch(function (error) {
      //     var errmsg = JSON.stringify(error)
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
          setLoading(false);
        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error)
          seterrortext(errmsg)
          setModalCreate(true)
          console.log(error);
          setLoading(false);
        });
        
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

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
      AsyncStorage.setItem('tradeSymbolname', data.name);
      if (data.fractionable == true) {
        AsyncStorage.setItem('fractionval', 'true')
      } else {
        AsyncStorage.setItem('fractionval', 'false')
      }

      navigation.navigate('DetailsStockView');
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

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  useEffect(() => {

    if (!load) {
      onLoadfun();
    }
  }, []);

  return (

    <View style={CommonStyles.ContainerPink}>
      <View style={[CommonStyles.sideSpace, CommonStyles.commonTopSP]}>
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
      </View>
      {
        (flagsearch) ?
          <FlatList
            data={filteredDataSource}
            numColumns={1}
            onEndReached={fetchMore}
            renderItem={({ item }) => (
              <View style={CommonStyles.sideSpace}>
                <TouchableOpacity key={item.id} onPress={() => getSymbol(item.symbol)}>
                  <View
                    style={[
                      CommonStyles.StockView, CommonStyles.stockViewDetails,
                      Select ? TradeStyles.selected : null,
                    ]}>
                    <View style={CommonStyles.cardHead}>
                      <View style={CommonStyles.stLeft}>
                        <View style={CommonStyles.stocklogo}>
                          <Image source={{ uri: 'https://stock-logo.s3.amazonaws.com/logos/' + item.symbol + '.png' }} style={CommonStyles.stocklogoImg} />
                        </View>
                        <View style={CommonStyles.stNamOut}>
                          <Text style={CommonStyles.stockName}>{item.name.replace('Common Stock', '')}</Text>
                          <Text style={CommonStyles.StockCode}>{item.symbol}</Text>
                        </View>
                      </View>
                      <View style={CommonStyles.bellOut}>
                        <TouchableOpacity>
                          <FontAwesome name="bell-o" style={CommonStyles.bellIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => stockDetail(item)}>
                          <Text style={CommonStyles.tradeBut}>Trade</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          /> :
          <FlatList
            data={data}
            numColumns={1}
            onEndReached={fetchMore}
            ListFooterComponent={renderFooter}
            renderItem={({ item }) => (
              <View style={CommonStyles.sideSpace}>
                <TouchableOpacity key={item.id} onPress={() => getSymbol(item.symbol)}>
                  <View
                    style={[
                      CommonStyles.StockView, CommonStyles.stockViewDetails,
                      Select ? TradeStyles.selected : null,
                    ]}>
                    <View style={CommonStyles.cardHead}>
                      <View style={CommonStyles.stLeft}>
                        <View style={CommonStyles.stocklogo}>
                          <Image source={{ uri: 'https://stock-logo.s3.amazonaws.com/logos/' + item.symbol + '.png' }} style={CommonStyles.stocklogoImg} />
                        </View>
                        <View style={CommonStyles.stNamOut}>
                          <Text style={CommonStyles.stockName}>{item.name.replace('Common Stock', '')}</Text>
                          <Text style={CommonStyles.StockCode}>{item.symbol}</Text>
                        </View>
                      </View>
                      <View style={CommonStyles.bellOut}>
                        <TouchableOpacity>
                          <FontAwesome name="bell-o" style={CommonStyles.bellIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => stockDetail(item)}>
                          <Text style={CommonStyles.tradeBut}>Trade</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />}

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
    </View>
  );
};

export default Trade;
