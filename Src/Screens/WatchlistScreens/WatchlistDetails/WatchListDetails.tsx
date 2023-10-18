import {
  ActivityIndicator,
  Alert,
  FlatList,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import { WatchListStyles } from '../WatchList/WatchListStyle';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WatchListDetailsStyles } from './WatchListDetailsStyle';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAlpacagetRequest, post_GetAlpacaData } from '../../../Utils/utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RadioButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WatchFlatlist from '../../../ReusableComponents/watchflatlist';
import Trash from 'react-native-vector-icons/FontAwesome';



const WatchListDetails = ({ navigation, props }: any) => {

  const [value, setValue] = React.useState('first');
  const [isModalSort, setModalSort] = useState(false);
  const [getWatchlistdestail, setWatchlistdestail] = useState([]);
  const [getwatchListname, setwatchListname] = useState();
  const [getstockCount, setstockCount] = useState();
  const [getcreated_at, setcreated_at] = useState();
  const [data, setDate] = useState([]);
  const [storewid, setstorewid] = useState();
  const [getAscending, setAscending] = useState(false);
  const [getDecending, setDecending] = useState(false);
  const [getDatesort, setDatesort] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [flagsearch, setflagsearch] = useState(false);
  const [loading, setLoading] = useState(false);


  const toggleModal = () => {

    setModalSort(!isModalSort);
  };

  const onLoadfun = async () => {

    let alpacaAccountid: any = await AsyncStorage.getItem('alpaca_id');
    let watchlistid: any = await AsyncStorage.getItem('watchListid');
    let name: any = await AsyncStorage.getItem('watchList_Name');
    let strdt: any = await AsyncStorage.getItem('watchList_created_at');
    setstorewid(watchlistid);
    var dateObj = new Date(strdt);
    var binddate: any = dateObj.toDateString();

    try {

      // makeAlpacagetRequest('trading/accounts/' + alpacaAccountid + '/watchlists/' + watchlistid)
      //   .then(async (result: any) => {

      //     if (result.data.assets.length > 0) {
      //       setstockCount(result.data.assets.length);
      //       setwatchListname(name);
      //       setcreated_at(binddate);
      //       setWatchlistdestail(result.data.assets);
      //       setDate(result.data.assets);
      //       console.log(result.data.assets);
      //       setFilteredDataSource(result.data.assets);
      //     } else { console.log('in else'); setWatchlistdestail([]); }
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

      var uridata = {
        url: 'trading/accounts/' + alpacaAccountid + '/watchlists/' + watchlistid,
      };

      let tokenidstore = await AsyncStorage.getItem('token');
      
      post_GetAlpacaData('alpaca/getalpacadata', uridata, tokenidstore)
        .then(async (result: any) => {
          if (result.data.data.assets.length > 0) {
            setstockCount(result.data.data.assets.length);
            setwatchListname(name);
            setcreated_at(binddate);
            setWatchlistdestail(result.data.data.assets);
            setDate(result.data.data.assets);
            console.log(result.data.assets);
            setFilteredDataSource(result.data.data.assets);
          } else { console.log('in else'); setWatchlistdestail([]); }
        })
        .catch(function (error) {
          console.log(JSON.stringify(error.response.data.message));
        });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchMore = () => {
    setDate(getWatchlistdestail);
  };

  const searchData = (text: any) => {

    if (text) {

      setflagsearch(true)
      const newData = getWatchlistdestail.filter(item => {
        const itemData = item.symbol.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1
      });

      if (newData.length > 0) {

        setFilteredDataSource(newData);
        setSearch(text);
      }
      else {
        const newDataname = getWatchlistdestail.filter(item => {
          const itemData = item.name.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1
        });
        if (newDataname.length > 0) {

          setFilteredDataSource(newDataname);
          setSearch(text);
        }
      }
    }
    else {

      setflagsearch(true);
      setFilteredDataSource(getWatchlistdestail);
      setSearch(text);
    }
  };

  function sortFunction(a: any, b: any) {
    var dateA = new Date(a.created_at).getDate();
    var dateB = new Date(b.created_at).getDate();
    return dateA > dateB ? 1 : -1;
  };

  function sortbydecname(a: any, b: any) {
    if (a.name > b.name)
      return -1;
    if (a.name < b.name)
      return 1;
    return 0;
  };

  function sortbyascename(a: any, b: any) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  };

  const applyfun = async () => {

    if (getAscending) {
      getWatchlistdestail.sort(sortbyascename);
    } else if (getDecending) {
      getWatchlistdestail.sort(sortbydecname);
    }
    setModalSort(false);
  };

  const clckradio = async (val: any) => {

    if (val == 'first') {
      setValue('first')
      setAscending(true)
      setDecending(false)
      setDatesort(false);
    } else if (val == 'second') {
      setValue('second')
      setAscending(false)
      setDecending(true)
      setDatesort(false)
    } else {
      setValue('third')
      setAscending(false)
      setDecending(false)
      setDatesort(true)
    }
  };

  const stockDetail = async (data: any) => {
    console.log(data.symbol);
    AsyncStorage.setItem('tradeSymbol', data.symbol);
    AsyncStorage.setItem('tradeSymbolname', data.name);
    navigation.navigate('DetailsStockView')
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
    // console.log("in renser")
    return (
      <View style={CommonStyles.sideSpace}>
        <WatchFlatlist name={item.name} symbol={item.symbol} navigation={navigation} id=
          {index} watchid={storewid} flg={false} isActive={false} />
      </View>
    );
  };

  const renderItem_filter = ({ item, index }) => {

    return (
      <View style={CommonStyles.sideSpace}>
        <WatchFlatlist name={item.name} symbol={item.symbol} navigation={navigation} id=
          {item.id} watchid={storewid} flg={false} isActive={false} />

      </View>
    );
  };

  useEffect(() => {

    onLoadfun();
  }, []);

  return (
    <>
      <View style={CommonStyles.ContainerPink}>
        <View style={CommonStyles.sideSpace}>
          <View style={CommonStyles.flexRow}>
            <Text
              style={[
                WatchListStyles.listMainTxt,
                WatchListStyles.listMainDetails,
              ]}>
              {getwatchListname}
            </Text>
            {/* <View style={WatchListStyles.iconViewDetails}>
              <TouchableOpacity>
                <FontAwesome name="pencil" style={WatchListStyles.editIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="delete-outline"
                  style={WatchListStyles.deleteIcon}
                />
              </TouchableOpacity>
            </View> */}
          </View>
          <View style={WatchListStyles.createdOn}>
            <Text style={WatchListStyles.qtyTxt}>{getstockCount} Stocks, </Text>
            <Text style={WatchListDetailsStyles.createdTxt}>
              created on {getcreated_at}
            </Text>
          </View>
          <Modal isVisible={isModalSort}>
            <View style={WatchListStyles.ModalView}>
              <TouchableOpacity onPress={toggleModal}>
                <View style={CommonStyles.closeBtnView}>
                  <Ionicons
                    name='close' style={CommonStyles.clodeICon}
                  />
                </View>
              </TouchableOpacity>
              <Text style={WatchListStyles.PopupHeader}>Sort By</Text>
              <RadioButton.Group
                onValueChange={clckradio}
                value={value}>
                <View style={WatchListStyles.CheckBoxView}>
                  <Text style={WatchListStyles.AsenDsenTxt}>Asending Order</Text>
                  <RadioButton value="first" color={ColorSheet.$DarkGreen} />
                </View>
                <View style={WatchListStyles.CheckBoxView}>
                  <Text style={WatchListStyles.AsenDsenTxt}>Decending Order</Text>
                  <RadioButton value="second" color={ColorSheet.$DarkGreen} />
                </View>
                <View style={CommonStyles.commonBotSP}>
                  <TouchableOpacity onPress={() => applyfun()}>
                    <View style={[CommonStyles.btnCotainer, { marginTop: 20 }]}>
                      <Text style={CommonStyles.btnTxt}>Apply</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </RadioButton.Group>
            </View>
          </Modal>
          <View style={{ marginTop: 10 }}>
            <TextInput
              placeholder="Search"
              // onEndEditing={(e) => searchData(e.nativeEvent.text)}
              onChangeText={(text) => searchData(text)}
              value={search}
              placeholderTextColor={ColorSheet.$Gray6}
              style={[CommonStyles.inputField, CommonStyles.inputFieldSearch]}
            />
            <Fontisto
              name="search"
              size={20}
              color={ColorSheet.$Gray7}
              style={{ position: 'absolute', marginTop: 15, marginLeft: 15 }}
            />
          </View>
          <View style={[WatchListDetailsStyles.btnView, WatchListDetailsStyles.botSp,]}>
            <TouchableOpacity onPress={toggleModal}>
              <View style={WatchListDetailsStyles.sortIconView}>
                <MaterialIcon name="sort" size={28} color={ColorSheet.$Gray6} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('WatchListSearch', { watchitemId: storewid, otherParam: 'came from add stock' })}>
              <View style={[WatchListStyles.btnContainer, { marginTop: 0 }]}>
                <Text style={WatchListStyles.CreateBtnTxt}>Add Stock</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {
          (flagsearch) ?
            <FlatList
              data={filteredDataSource}
              numColumns={1}
              onEndReached={fetchMore}
              ListFooterComponent={renderFooter}
              renderItem={renderItem_filter}
              keyExtractor={item => item.id.toString()}
            /> :
            <FlatList
              data={data}
              numColumns={1}
              onEndReached={fetchMore}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
        }
        {/* {props.flg && */}
        {/* <View>
            <TouchableOpacity style={CommonStyles.deleteBtn}>
              <Trash name='trash-o' style={CommonStyles.deleteBtnIcon} />
            </TouchableOpacity>
          </View> */}

      </View>
    </>
  );
};

export default WatchListDetails;
