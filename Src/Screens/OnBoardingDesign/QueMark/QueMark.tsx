import {
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommisionFreeStyles} from '../CommisionFree/CommisionFreeStyle';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import ImagesAll from '../../../StyleSheet/ImagesAll';
import {CommonStyles} from '../../../StyleSheet/CommonStyle';
import {QueMarkStyles} from './QueMarkStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {makePutRequest} from '../../../Utils/utils';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import Modal from 'react-native-modal';

const QueMark = ({navigation}: any) => {
  const [Style, setStyle] = useState(false);
  const [Style1, setStyle1] = useState(false);
  const [Style2, setStyle2] = useState(false);
  const [Style3, setStyle3] = useState(false);
  const [investingType, setinvestingType] = useState('');
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');

  const onSubmit = async () => {
    // navigation.navigate('EmployeeInfo');
    try {
      if (investingType !== '') {
      if (await AsyncStorage.getItem('editprofileflg')=='editprofile') {
      // if (investingType !== '') {
        let storeuserid = await AsyncStorage.getItem('userID');
        let tokenidstore = await AsyncStorage.getItem('token');
        var bodyFormData = {
          user_id: Number(storeuserid),
          investing_type: investingType,
        };

        makePutRequest('auth/updateUser', bodyFormData, tokenidstore)
          .then(async (result: any) => {
            let insertedStorarr = [];
          if (result.data.data.basic_info == true) {
          insertedStorarr.push({
            investing_type: result.data.data.investing_type,
            job_title: result.data.data.job_title,
            current_employer: result.data.data.current_employer,
            annual_income: result.data.data.annual_income,
            liquid_asset: result.data.data.liquid_asset,
            funding_account: result.data.data.funding_account,
            phone_no: result.data.data.phone_no,
            street_address: result.data.data.street_address,
            city: result.data.data.city,
            state: result.data.data.state,
            postal_code: result.data.data.postal_code,
            country: result.data.data.country,
          });
          AsyncStorage.setItem(
            'insertedquestarr',
            JSON.stringify(insertedStorarr),
          );
          }
          AsyncStorage.removeItem('editprofileflg');
          navigation.navigate('Profile');
          })
          .catch(function (error) {
            console.log(error);
            var errmsg = JSON.stringify(error.response.data.message)
            seterrortext(errmsg)
            setModalCreate(true)
          });
      } else {
        let storeuserid = await AsyncStorage.getItem('userID');
        let tokenidstore = await AsyncStorage.getItem('token');
        var bodyFormData = {
          user_id: Number(storeuserid),
          investing_type: investingType,
        };

        makePutRequest('auth/updateUser', bodyFormData, tokenidstore)
          .then(async (result: any) => {
            navigation.navigate('EmployeeInfo');
          })
          .catch(function (error) {
            console.log(error);
            var errmsg = JSON.stringify(error.response.data.message)
            seterrortext(errmsg)
            setModalCreate(true)
          });
      }
    } else {
      var errmsg = 'Please select one option'
            seterrortext(errmsg)
            setModalCreate(true)
    }
    } catch (e) {
      console.log(e);
    }
  };

  function click1(num: number, type: string) {
    let i = num;
    setinvestingType(type);

    if (i == 0) {
      setStyle(true);
      setStyle1(false);
      setStyle2(false);
      setStyle3(false);
    } else if (i == 1) {
      setStyle(false);
      setStyle1(true);
      setStyle2(false);
      setStyle3(false);
    } else if (i == 2) {
      setStyle(false);
      setStyle1(false);
      setStyle2(true);
      setStyle3(false);
    } else if (i == 3) {
      setStyle(false);
      setStyle1(false);
      setStyle2(false);
      setStyle3(true);
    }
  }

  const onLoadfun = async () => {
    var retrievedData: any = await AsyncStorage.getItem('insertedquestarr');
    var usearry = JSON.parse(retrievedData);
    var arr = usearry[0].investing_type;
    console.log('locasto val', arr);
    var storeval = await AsyncStorage.getItem('basicinfostore');
    console.log(storeval);
    if (arr === 'More Income') {
      setStyle(true);
      setinvestingType('More Income');
    } else if (arr === 'Financial security') {
      setStyle1(true);
      setinvestingType('Financial security');
    } else if (arr === 'Generational wealth') {
      setStyle2(true);
      setinvestingType('Generational wealth');
    } else if (arr === 'Short term revenues') {
      setStyle3(true);
      setinvestingType('Short term revenues');
    }
  };

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  useEffect(() => {
    onLoadfun();
  }, []);
  return (
    <View style={CommonStyles.ContainerWhite}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View style={CommonStyles.sideLessSpace}>
          <Text
            style={[
              CommisionFreeStyles.mainTxt,
              CommisionFreeStyles.centerTxtHead,
            ]}>
            How will investing support your financial goals?
          </Text>
          <View style={QueMarkStyles.imageView}>
            <TouchableOpacity
              onPress={() => click1(0, 'More Income')}
              style={[
                QueMarkStyles.imageBack,
                Style ? QueMarkStyles.selected : null,
              ]}>
              <View style={QueMarkStyles.centerImg}>
                <Image source={ImagesAll.Frame} style={QueMarkStyles.iconImg} />
              </View>
              <View style={QueMarkStyles.centerText}>
              <Text style={[QueMarkStyles.imageTxt,
                Style ? {color:ColorSheet.$white} : null]}>More{'\n'}income</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => click1(1, 'Financial security')}
              style={[
                QueMarkStyles.imageBack,
                Style1 ? QueMarkStyles.selected : null,
              ]}>
              <View style={QueMarkStyles.centerImg}>
                <Image
                  source={ImagesAll.Frame1}
                  style={QueMarkStyles.iconImg}
                />
              </View>
              <View style={QueMarkStyles.centerText}>
                <Text style={[QueMarkStyles.imageTxt,
                Style1 ? {color:ColorSheet.$white} : null]}>
                  Financial{'\n'}security
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={QueMarkStyles.imageView}>
            <TouchableOpacity
              onPress={() => click1(2, 'Generational wealth')}
              style={[
                QueMarkStyles.imageBack,
                Style2 ? QueMarkStyles.selected : null,
              ]}>
              <View style={QueMarkStyles.centerImg}>
                <Image
                  source={ImagesAll.Frame2}
                  style={QueMarkStyles.iconImg}
                />
              </View>
              <View style={QueMarkStyles.centerText}>
              <Text style={[QueMarkStyles.imageTxt,
                Style2 ? {color:ColorSheet.$white} : null]}>
                  Generational{'\n'}wealth
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => click1(3, 'Short term revenues')}
              style={[
                QueMarkStyles.imageBack,
                Style3 ? QueMarkStyles.selected : null,
              ]}>
              <View style={QueMarkStyles.centerImg}>
                <Image
                  source={ImagesAll.Frame3}
                  style={QueMarkStyles.iconImg}
                />
              </View>
              <View style={QueMarkStyles.centerText}>
              <Text style={[QueMarkStyles.imageTxt,
                Style3 ? {color:ColorSheet.$white} : null]}>
                  Short term{'\n'}revenues
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ImageBackground
          source={ImagesAll.geryCurve}
          resizeMode={'stretch'}
          style={CommonStyles.geryCurve}>
          <View style={CommisionFreeStyles.iconBorder}>
            <TouchableOpacity
              style={CommisionFreeStyles.iconView}
              onPress={() => onSubmit()}>
              <Ionicons
                name="arrow-forward-circle-outline"
                color={ColorSheet.$white}
                size={40}
              />
            </TouchableOpacity>
          </View>
          <View style={CommisionFreeStyles.dotView}>
            <View style={CommisionFreeStyles.dot} />
            <View style={CommisionFreeStyles.dot} />
            <View
              style={[CommisionFreeStyles.dot, CommisionFreeStyles.longDash]}
            />
          </View>
        </ImageBackground>
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
                <View style={[CommonStyles.btnCotainer, {marginTop: 10}]}>
                  <Text style={CommonStyles.btnTxt}>Ok</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default QueMark;
