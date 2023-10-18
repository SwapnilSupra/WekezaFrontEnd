import {
  FlatList,
  Image,
  ImageBackground,
  LogBox,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Suspense, useEffect, useState } from 'react';
import { CommonStyles } from '../../StyleSheet/CommonStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorSheet from '../../StyleSheet/ColorSheet';
import { DashboardStyles } from './dashboardStyle';
import ImagesAll from '../../StyleSheet/ImagesAll';
import { CommisionFreeStyles } from '../OnBoardingDesign/CommisionFree/CommisionFreeStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAlpacagetRequest, makeGetRequest, makePutRequest, post_GetAlpacaData } from '../../Utils/utils';
import { useIsFocused } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { WatchListStyles } from '../WatchlistScreens/WatchList/WatchListStyle';
import { ScrollView as VirtualScrollView } from 'react-native-virtualized-view';
import Funding from '../../ReusableComponents/funding';
const DashboardWatchlist = React.lazy(() => import('../../ReusableComponents/dashboardWatchlist'));
import GainValue from '../../ReusableComponents/gainvalue';
const Watchlist = React.lazy(() => import('../../ReusableComponents/watchlist'));
import TrendingStocks from '../../ReusableComponents/trendingStocks';
import Notification_Bell from '../../ReusableComponents/notification';
import Newsdata from '../../ReusableComponents/newsdata';
import Market from '../../ReusableComponents/market';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const Dashboard = ({ navigation }: any) => {

  const [fullname, setfullname] = useState('');
  const [alpacaid, setalpcaid] = useState(false);
  const [achid, setachid] = useState(false);
  const [Brokragestatus, setBrokragestatus] = useState('');
  const [getBrokrageaccount, setBrokrageaccount] = useState('');
  const isFocused = useIsFocused();
  const [profileimg, setProfileimg] = React.useState('');
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [trendingstocks, srtTrendingstocks] = useState([]);
  const [getStockName, setStockName] = useState([]);
  const [getChlid, setChild] = React.useState('');

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  const onLoadfun = async () => {

    let idalpca: any = await AsyncStorage.getItem('alpaca_id');
    let achidstr: any = await AsyncStorage.getItem('achidval');
    let storeuserid = await AsyncStorage.getItem('userID');
    let tokenidstore = await AsyncStorage.getItem('token');
    let saveuserfname: any = await AsyncStorage.getItem('userfname');
    let saveuserlname: any = await AsyncStorage.getItem('userlname');
    let accountStatus: any = await AsyncStorage.getItem('broksttus');
    let alpacaaccountno: any = await AsyncStorage.getItem('alpacaAccountNo');

    let fullnamenew = saveuserfname + ' ' + saveuserlname;
    setfullname(fullnamenew);

    if (await AsyncStorage.getItem('profilestore') !== undefined || await AsyncStorage.getItem('profilestore') !== null) {

      let storepro: any = await AsyncStorage.getItem('profilestore');
      setProfileimg(storepro);
    } else {
      setProfileimg('');
    }

    if (idalpca == '' || idalpca == null) {
      setalpcaid(true)
      setachid(false)
    } else {

      if (achidstr !== null) {
        setachid(false);
        setalpcaid(false);

        if (Brokragestatus !== 'ACTIVE') {

          try {

            // makeAlpacagetRequest('accounts/' + idalpca)
            //   .then(async (result: any) => {
            //     setBrokrageaccount(result.data.account_number);
            //     var bodyFormData = {
            //       user_id: Number(storeuserid),
            //       al_status: result.data.status,
            //     };
            //     makePutRequest('auth/updatealpaca', bodyFormData, tokenidstore)
            //       .then(async (response: any) => {
            //         AsyncStorage.setItem('broksttus', response.data.data['al_status']);
            //         setBrokragestatus(response.data.data['al_status']);
            //       })
            //       .catch(function (error) {
            //         var errmsg = JSON.stringify(error.response.data.message)
            //         seterrortext(errmsg)
            //         setModalCreate(true)
            //       });
            //   })
            //   .catch(function (error) {
            //     var errmsg = JSON.stringify(error.response.data.message);
            //     seterrortext(errmsg);
            //     setModalCreate(true);
            //   });

            var data = {
              url: 'accounts/' + idalpca,
            };
            let tokenidstore = await AsyncStorage.getItem('token');
            post_GetAlpacaData('alpaca/getalpacadata', data, tokenidstore)
              .then(async (result: any) => {
                setBrokrageaccount(result.data.data.account_number);
                var bodyFormData = {
                  user_id: Number(storeuserid),
                  al_status: result.data.data.status,
                };
                makePutRequest('auth/updatealpaca', bodyFormData, tokenidstore)
                  .then(async (response: any) => {
                    AsyncStorage.setItem('broksttus', response.data.data['al_status']);
                    setBrokragestatus(response.data.data['al_status']);
                  })
                  .catch(function (error) {
                    var errmsg = JSON.stringify(error.response.data.message)
                    seterrortext(errmsg)
                    setModalCreate(true)
                  });
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
      } else {
        setBrokrageaccount(alpacaaccountno);
        setBrokragestatus(accountStatus);
        setachid(true)
        setalpcaid(false)
      }
    }
  };

  function getstatus() {

    if (Brokragestatus == '') {
      return (
        <View style={DashboardStyles.statusPro}>
        </View>
      );
    } else if (Brokragestatus !== 'ACTIVE') {
      return (
        <View>
          <View style={DashboardStyles.statusPro}>
            <MaterialIcons
              name="close-circle-outline"
              size={16}
              color={ColorSheet.$Errorred}
              style={DashboardStyles.checkUser}
            />
            <Text style={DashboardStyles.statusText}>
              {Brokragestatus}
            </Text>
          </View>
          {getBrokrageaccount != null ? (
            <Text style={DashboardStyles.accNo}>
              Acc No: {'xxxx' + getBrokrageaccount.slice(4)}
            </Text>) : null}
        </View>
      );
    } else {
      return (
        <View style={DashboardStyles.statusBox}>
          {getBrokrageaccount != null ? (
            <Text style={DashboardStyles.accNo}>
              Acc No: {'xxxx' + getBrokrageaccount.slice(4)}
            </Text>) : null}
          <View style={DashboardStyles.statusPro}>
            <MaterialIcons
              name="checkbox-marked-circle-outline"
              size={16}
              color={ColorSheet.$white}
              style={DashboardStyles.checkUser}
            />
            <Text style={DashboardStyles.statusText}>
              {Brokragestatus}
            </Text>
          </View>
        </View>
      );
    }
  };

  var testsym: any = [];
  var names: any = [];

  const gettrendingstocks = async () => {

    try {

      let tokenidstore = await AsyncStorage.getItem('token');
      makeGetRequest('auth/getTrendingdata', tokenidstore)
        .then(async (result: any) => {
          if (result.data.data.rows) {
            testsym = [];
            names = [];
            for (let i = 0; i < result.data.data.rows.length; i++) {
              testsym.push(result.data.data.rows[i].symbol);
              names.push(result.data.data.rows[i].stock_name);
            }
            setStockName(names);
            srtTrendingstocks(testsym);
          }
          else {
            srtTrendingstocks([]);
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

  const renderItem = ({ item, index }: any) => {
    return (
      <View>
        <TrendingStocks symbol={item} navigation={navigation} symbolname={getStockName[index]} />
      </View>
    );
  };

  useEffect(() => {

    if (isFocused) {
      onLoadfun();
      gettrendingstocks();
    }
  }, [isFocused]);

  return (

    <View style={CommonStyles.ContainerPink}>

      {/* <VirtualScrollView> */}
      <ScrollView nestedScrollEnabled={true}>

        <View>

          <ImageBackground
            source={ImagesAll.BGLogin}
            resizeMode={'stretch'}
            style={CommonStyles.sideSpaceDashBoard}>
            <View>
              <Notification_Bell setChild={setChild} />
            </View>
            <View style={DashboardStyles.topSearchView}>
              <Image source={ImagesAll.smlogo} style={CommonStyles.logoImgCenterDashlogo} />
              <Text style={DashboardStyles.dashTxt}> Dashboard</Text>
            </View>
            <View style={DashboardStyles.namePropic}>
              <View style={DashboardStyles.userLeft}>
                <TouchableHighlight onPress={() => navigation.navigate('Profile')}>
                  {(profileimg == '' || profileimg == null) ?
                    <Image source={ImagesAll.Men} style={DashboardStyles.UserImage} /> :
                    <Image source={{ uri: profileimg }} style={DashboardStyles.UserImage} />
                  }
                </TouchableHighlight>
              </View>
              <View style={DashboardStyles.userRight}>
                <View style={DashboardStyles.welcomName}>
                  <Text style={DashboardStyles.hi}>Hi</Text>
                  <Text style={DashboardStyles.userName} onPress={() => navigation.navigate('Profile')}>{fullname}</Text>
                </View>
                {getstatus()}
              </View>
            </View>
          </ImageBackground>

          {(alpacaid) &&
            <View style={{ margin: 15 }}>
              <Text style={DashboardStyles.linkBankTxt}>
                Create a wekeza trading account
              </Text>
              <View style={{ width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.navigate('IdentityDetails')}>
                  <View style={[CommonStyles.btnCotainer, { marginTop: 20 }]}>
                    <Text style={CommonStyles.btnTxt}>Create Account</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          }

          {(achid) ?
            <View style={{ margin: 15 }}>
              <Text style={[DashboardStyles.linkBankTxt, DashboardStyles.linkBankTxtTopSP]}>
                Link your bank account with Wekeza
              </Text>
              <View style={{ width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.navigate('ConnectBank')}>
                  <View style={[CommonStyles.btnCotainer, { marginTop: 20 }]}>
                    <Text style={CommonStyles.btnTxt}>Link Account</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View> : null
          }

          <View style={CommonStyles.sideSpaceDashBoard}>
            <GainValue navigation={navigation} />
            <Funding navigation={navigation} />
          </View>

          <View style={CommonStyles.sideSpaceDashBoard}>
            <Text style={DashboardStyles.BoxHeading}>Market</Text>
            <Market />
          </View>

          <Suspense fallback={<View><Text>Loading</Text></View>}>
            <DashboardWatchlist navigation={navigation} alpaca_id={alpacaid} />
          </Suspense>

          <View style={DashboardStyles.newsWrapperOut}>
            <Newsdata navigation={navigation} />
          </View>

          <Suspense fallback={<View><Text>Loading</Text></View>}>
            <Watchlist navigation={navigation} alpcaidprop={alpacaid} />
          </Suspense>

          <View style={CommonStyles.ContainerTemp}>
            <View style={DashboardStyles.educationVIew}>
              <View style={DashboardStyles.videoView}>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={ImagesAll.YouTube} />
                  <Text style={DashboardStyles.EduVideoTxt}>
                    Investor Education
                  </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Video')}>
                  <Image source={ImagesAll.ArrowRight} />
                </TouchableOpacity>
              </View>
              <Text style={DashboardStyles.VideoDescription}>
                Investor Education is our first priority.
              </Text>
            </View>
          </View>

          <View >
            <Suspense fallback={<View><Text>Loading</Text></View>}>
              <Text style={[DashboardStyles.BoxHeading, CommonStyles.sideSpace, DashboardStyles.wishlistTxtSP]}>Trending on Wekeza</Text>
              <FlatList
                data={trendingstocks}
                numColumns={1}
                renderItem={renderItem}
              />
            </Suspense>
          </View>
        </View>
        {/* </VirtualScrollView> */}
        
      </ScrollView>

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

export default Dashboard;
