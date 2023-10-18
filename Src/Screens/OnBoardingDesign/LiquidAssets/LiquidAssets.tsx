import {Alert, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {EmployeeInfoStyles} from '../EmployeeInfo/EmployeeInfoStyle';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import {CommonStyles} from '../../../StyleSheet/CommonStyle';
import {AnnualIncomeStyles} from '../AnnualIncome/AnnualIncomeStyle';
import CheckBox from 'react-native-check-box';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {makePutRequest} from '../../../Utils/utils';
import Modal from 'react-native-modal';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LiquidAssets = ({navigation}: any) => {
  const [Check1, setCheck1] = useState(false);
  const [Check2, setCheck2] = useState(false);
  const [Check3, setCheck3] = useState(false);
  const [Check4, setCheck4] = useState(false);
  const [Check5, setCheck5] = useState(false);
  const [liquidAssets, setliquidAssets] = useState('');
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');

  const onSubmit = async () => {
    // navigation.navigate('FundAccount');
    try {
      if (liquidAssets !== '') {
        if (await AsyncStorage.getItem('editprofileflg')=='editprofile') {  
      let storeuserid = await AsyncStorage.getItem('userID');
      let tokenidstore = await AsyncStorage.getItem('token');
      var bodyFormData = {
        user_id: Number(storeuserid),
        liquid_asset: liquidAssets,

      };

      console.log(JSON.stringify(bodyFormData));
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
          liquid_asset: liquidAssets,
  
        };
  
        console.log(JSON.stringify(bodyFormData));
        makePutRequest('auth/updateUser', bodyFormData, tokenidstore)
          .then(async (result: any) => {
            navigation.navigate('FundAccount');
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

  function clickchkbox(num: number, type: string) {
    let i = num;
    setliquidAssets(type);
    if (i == 1) {
      setCheck1(true);
      setCheck2(false);
      setCheck3(false);
      setCheck4(false);
      setCheck5(false);
      AsyncStorage.setItem('minliq','0');
      AsyncStorage.setItem('maxliq','25000');
    } else if (i == 2) {
      setCheck1(false);
      setCheck2(true);
      setCheck3(false);
      setCheck4(false);
      setCheck5(false);
      AsyncStorage.setItem('minliq','25000');
      AsyncStorage.setItem('maxliq','99999');
    } else if (i == 3) {
      setCheck1(false);
      setCheck2(false);
      setCheck3(true);
      setCheck4(false);
      setCheck5(false);
      AsyncStorage.setItem('minliq','100000');
      AsyncStorage.setItem('maxliq','499999');
    } else if (i == 4) {
      setCheck1(false);
      setCheck2(false);
      setCheck3(false);
      setCheck4(true);
      setCheck5(false);
      AsyncStorage.setItem('minliq','500000');
      AsyncStorage.setItem('maxliq','1000000');
    } else if (i == 5) {
      setCheck1(false);
      setCheck2(false);
      setCheck3(false);
      setCheck4(false);
      setCheck5(true);
      AsyncStorage.setItem('minliq','1000000');
      AsyncStorage.setItem('maxliq','9999999');
    }
  }
  const onLoadfun = async () => {
    var retrievedData: any = await AsyncStorage.getItem('insertedquestarr');
    var usearry = JSON.parse(retrievedData);
    var arr = usearry[0].liquid_asset;
    var storeval = await AsyncStorage.getItem('basicinfostore');
    if (arr === '$25,000') {
      setCheck1(true);
      setliquidAssets('$25,000');
    } else if (arr === '$25,000 - $99,999') {
      setCheck2(true);
      setliquidAssets('$25,000 - $99,999');
    } else if (arr === '$100,000 - $499,999') {
      setCheck3(true);
      setliquidAssets('$100,000 - $499,999');
    } else if (arr === '$500,000 - $1,000,000') {
      setCheck4(true);
      setliquidAssets('$500,000 - $1,000,000');
    } else if (arr === '$1,000,000') {
      setCheck5(true);
      setliquidAssets('$1,000,000');
    }
  };

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };
  
  useEffect(() => {
    onLoadfun();
  }, []);
  return (
    <View style={CommonStyles.ContainerPink}>
      <ScrollView>
        <View style={CommonStyles.sideSpace}>
          <View style={EmployeeInfoStyles.numberStyle}>
            <View style={EmployeeInfoStyles.stepLine}>
              <View style={EmployeeInfoStyles.stepLineInn3} />
            </View>
            <View style={EmployeeInfoStyles.numberView}>
              <Text style={EmployeeInfoStyles.numberTxt}>1</Text>
            </View>
            <View style={[EmployeeInfoStyles.numberView]}>
              <Text style={EmployeeInfoStyles.numberTxt}>2</Text>
            </View>
            <View style={[EmployeeInfoStyles.numberView]}>
              <Text style={EmployeeInfoStyles.numberTxt}>3</Text>
            </View>
            <View
              style={[
                EmployeeInfoStyles.numberView,
                {backgroundColor: ColorSheet.$Gray3},
              ]}>
              <Text style={EmployeeInfoStyles.numberTxt}>4</Text>
            </View>
            <View
              style={[
                EmployeeInfoStyles.numberView,
                {backgroundColor: ColorSheet.$Gray3},
              ]}>
              <Text style={EmployeeInfoStyles.numberTxt}>5</Text>
            </View>
          </View>
          <Text style={EmployeeInfoStyles.infoTxt}>
            How much investible liquid assets do you have?
          </Text>
          <Text style={EmployeeInfoStyles.optionTxt}>
            An investible liquid asset can be easily converted into cash,
            including cash, checking and savings, stocks, bonds and mutual
            funds.
          </Text>
        </View>
        <View style={AnnualIncomeStyles.optionView}>
          <Text style={EmployeeInfoStyles.checkLabel}>
            <MaterialIcons
              name="less-than"
              color={ColorSheet.$Gray7}
              size={18}
            />
            $25,000
          </Text>
          <CheckBox
            onClick={() => clickchkbox(1, '$25,000')}
            isChecked={Check1}
            checkBoxColor={ColorSheet.$Green8}
          />
        </View>
        <View style={AnnualIncomeStyles.optionView}>
          <Text style={EmployeeInfoStyles.checkLabel}>$25,000 - $99,999</Text>
          <CheckBox
            onClick={() => clickchkbox(2, '$25,000 - $99,999')}
            isChecked={Check2}
            checkBoxColor={ColorSheet.$Green8}
          />
        </View>
        <View style={AnnualIncomeStyles.optionView}>
          <Text style={EmployeeInfoStyles.checkLabel}>$100,000 - $499,999</Text>
          <CheckBox
            onClick={() => clickchkbox(3, '$100,000 - $499,999')}
            isChecked={Check3}
            checkBoxColor={ColorSheet.$Green8}
          />
        </View>
        <View style={AnnualIncomeStyles.optionView}>
          <Text style={EmployeeInfoStyles.checkLabel}>
            $500,000 - $1,000,000
          </Text>
          <CheckBox
            onClick={() => clickchkbox(4, '$500,000 - $1,000,000')}
            isChecked={Check4}
            checkBoxColor={ColorSheet.$Green8}
          />
        </View>
        <View style={AnnualIncomeStyles.optionView}>
          <Text style={EmployeeInfoStyles.checkLabel}>
            <MaterialIcons
              name="greater-than"
              color={ColorSheet.$Gray7}
              size={18}
            />
            $1,000,000
          </Text>
          <CheckBox
            onClick={() => clickchkbox(5, '$1,000,000')}
            isChecked={Check5}
            checkBoxColor={ColorSheet.$Green8}
          />
        </View>
        <View style={[CommonStyles.sideSpace, CommonStyles.commonBotSP]}>
          <TouchableOpacity onPress={() => onSubmit()}>
            <View
              style={[CommonStyles.btnCotainer, EmployeeInfoStyles.marginTop]}>
              <Text style={CommonStyles.btnTxt}>Next</Text>
            </View>
          </TouchableOpacity>
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

export default LiquidAssets;
