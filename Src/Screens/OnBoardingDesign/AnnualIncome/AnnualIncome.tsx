import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import {CommonStyles} from '../../../StyleSheet/CommonStyle';
import {EmployeeInfoStyles} from '../EmployeeInfo/EmployeeInfoStyle';
import CheckBox from 'react-native-check-box';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AnnualIncomeStyles} from './AnnualIncomeStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makePutRequest } from '../../../Utils/utils';
import Modal from 'react-native-modal';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnnualIncome = ({navigation}: any) => {
  const [Check1, setCheck1] = useState(false);
  const [Check2, setCheck2] = useState(false);
  const [Check3, setCheck3] = useState(false);
  const [Check4, setCheck4] = useState(false);
  const [Check5, setCheck5] = useState(false);
  const [Check6, setCheck6] = useState(false);
  const [annualIncome, setannualIncome] = useState('');
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  const onSubmit = async () => {
    // navigation.navigate('LiquidAssets');
    try {
      if (annualIncome !== '') {
      let storeuserid = await AsyncStorage.getItem('userID');
      let tokenidstore = await AsyncStorage.getItem('token');
      var bodyFormData = {
        user_id: Number(storeuserid),
        annual_income: annualIncome,

      };

      console.log(JSON.stringify(bodyFormData));
      makePutRequest('auth/updateUser', bodyFormData, tokenidstore)
        .then(async (result: any) => {
          navigation.navigate('LiquidAssets');
        })
        .catch(function (error) {
          console.log(error);
          var errmsg = JSON.stringify(error.response.data.message)
          seterrortext(errmsg)
          setModalCreate(true)
        });
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
    setannualIncome(type);
    if (i == 1) {
      setCheck1(true);
      setCheck2(false);
      setCheck3(false);
      setCheck4(false);
      setCheck5(false);
      setCheck6(false);
      AsyncStorage.setItem('minannual','0');
      AsyncStorage.setItem('maxannual','20000');
    } else if (i == 2) {
      setCheck1(false);
      setCheck2(true);
      setCheck3(false);
      setCheck4(false);
      setCheck5(false);
      setCheck6(false);
      AsyncStorage.setItem('minannual','20000');
      AsyncStorage.setItem('maxannual','49999');
    } else if (i == 3) {
      setCheck1(false);
      setCheck2(false);
      setCheck3(true);
      setCheck4(false);
      setCheck5(false);
      setCheck6(false);
      AsyncStorage.setItem('minannual','50000');
      AsyncStorage.setItem('maxannual','99999');
    } else if (i == 4) {
      setCheck1(false);
      setCheck2(false);
      setCheck3(false);
      setCheck4(true);
      setCheck5(false);
      setCheck6(false);
      AsyncStorage.setItem('minannual','100000');
      AsyncStorage.setItem('maxannual','499999');
    } else if (i == 5) {
      setCheck1(false);
      setCheck2(false);
      setCheck3(false);
      setCheck4(false);
      setCheck5(true);
      setCheck6(false);
      AsyncStorage.setItem('minannual','500000');
      AsyncStorage.setItem('maxannual','999999');
    } else if (i == 6) {
      setCheck1(false);
      setCheck2(false);
      setCheck3(false);
      setCheck4(false);
      setCheck5(false);
      setCheck6(true);
      AsyncStorage.setItem('minannual','1000000');
      AsyncStorage.setItem('maxannual','9999999');
    }
  }

  const onLoadfun = async () => {
    var retrievedData: any = await AsyncStorage.getItem('insertedquestarr');
    var usearry = JSON.parse(retrievedData);
    var arr = usearry[0].annual_income;
    var storeval = await AsyncStorage.getItem('basicinfostore');
    if (arr === '$20,000') {
      setCheck1(true);
      setannualIncome('$20,000');
    } else if (arr === '$20,000 - $49,999') {
      setCheck2(true);
      setannualIncome('$20,000 - $49,999');
    } else if (arr === '$50,000 - $99,999') {
      setCheck3(true);
      setannualIncome('$50,000 - $99,999');
    } else if (arr === '$100,000 - $499,999') {
      setCheck4(true);
      setannualIncome('$100,000 - $499,999');
    } else if (arr === '$500,000 - $1,000,000') {
      setCheck5(true);
      setannualIncome('$500,000 - $1,000,000');
    } else if (arr === '$1,000,000') {
      setCheck6(true);
      setannualIncome('$1,000,000');
    }
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
              <View style={EmployeeInfoStyles.stepLineInn2} />
            </View>
            <View style={EmployeeInfoStyles.numberView}>
              <Text style={EmployeeInfoStyles.numberTxt}>1</Text>
            </View>
            <View style={[EmployeeInfoStyles.numberView]}>
              <Text style={EmployeeInfoStyles.numberTxt}>2</Text>
            </View>
            <View
              style={[
                EmployeeInfoStyles.numberView,
                {backgroundColor: ColorSheet.$Gray3},
              ]}>
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
            What is your annual income?
          </Text>
          <Text style={EmployeeInfoStyles.optionTxt}>
            This includes income from sources such as employment, alimony,
            social security, investment income, etc.
          </Text>
        </View>
        <View style={AnnualIncomeStyles.optionView}>
          <Text style={EmployeeInfoStyles.checkLabel}>
            <MaterialIcons name="less-than" style={CommonStyles.lessThan} />
            $20,000
          </Text>
          <CheckBox
            onClick={() => click1(1, '$20,000')}
            isChecked={Check1}
            checkBoxColor={ColorSheet.$Green8}
          />
        </View>
        <View style={AnnualIncomeStyles.optionView}>
          <Text style={EmployeeInfoStyles.checkLabel}>$20,000 - $49,999</Text>
          <CheckBox
            onClick={() => click1(2, '$20,000 - $49,999')}
            isChecked={Check2}
            checkBoxColor={ColorSheet.$Green8}
          />
        </View>
        <View style={AnnualIncomeStyles.optionView}>
          <Text style={EmployeeInfoStyles.checkLabel}>$50,000 - $99,999</Text>
          <CheckBox
            onClick={() => click1(3, '$50,000 - $99,999')}
            isChecked={Check3}
            checkBoxColor={ColorSheet.$Green8}
          />
        </View>
        <View style={AnnualIncomeStyles.optionView}>
          <Text style={EmployeeInfoStyles.checkLabel}>$100,000 - $499,999</Text>
          <CheckBox
            onClick={() => click1(4, '$100,000 - $499,999')}
            isChecked={Check4}
            checkBoxColor={ColorSheet.$Green8}
          />
        </View>
        <View style={AnnualIncomeStyles.optionView}>
          <Text style={EmployeeInfoStyles.checkLabel}>
            $500,000 - $1,000,000
          </Text>
          <CheckBox
            onClick={() => click1(5, '$500,000 - $1,000,000')}
            isChecked={Check5}
            checkBoxColor={ColorSheet.$Green8}
          />
        </View>
        <View style={AnnualIncomeStyles.optionView}>
          <Text style={EmployeeInfoStyles.checkLabel}>
            <MaterialIcons name="greater-than" style={CommonStyles.lessThan} />
            $1,000,000
          </Text>
          <CheckBox
            onClick={() => click1(6, '$1,000,000')}
            isChecked={Check6}
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

export default AnnualIncome;
