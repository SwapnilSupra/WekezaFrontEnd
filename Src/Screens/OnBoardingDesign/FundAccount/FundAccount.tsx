import { Alert, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { EmployeeInfoStyles } from '../EmployeeInfo/EmployeeInfoStyle';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import { AnnualIncomeStyles } from '../AnnualIncome/AnnualIncomeStyle';
import CheckBox from 'react-native-check-box';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makePutRequest } from '../../../Utils/utils';

const FundAccount = ({ navigation }: any) => {

  const [Check1, setCheck1] = useState(false);
  const [Check2, setCheck2] = useState(false);
  const [Check3, setCheck3] = useState(false);
  const [Check4, setCheck4] = useState(false);
  const [Check5, setCheck5] = useState(false);
  const [fundAcc, setfundAcc] = useState('');

  const onSubmit = async () => {
    // navigation.navigate('ContactDetails');
    try {
      if (fundAcc !== '') {
        if (await AsyncStorage.getItem('editprofileflg') == 'editprofile') {
          let storeuserid = await AsyncStorage.getItem('userID');
          let tokenidstore = await AsyncStorage.getItem('token');
          var bodyFormData = {
            user_id: Number(storeuserid),
            funding_account: fundAcc,

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
              Alert.alert(
                "Error",
                JSON.stringify(error.response.data.message),
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false }
              );
            });
        } else {
          let storeuserid = await AsyncStorage.getItem('userID');
          let tokenidstore = await AsyncStorage.getItem('token');
          var bodyFormData = {
            user_id: Number(storeuserid),
            funding_account: fundAcc,

          };

          console.log(JSON.stringify(bodyFormData));
          makePutRequest('auth/updateUser', bodyFormData, tokenidstore)
            .then(async (result: any) => {
              navigation.navigate('ContactDetails');
            })
            .catch(function (error) {
              console.log(error);
              Alert.alert(
                "Error",
                JSON.stringify(error),
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false }
              );
            });
        }
      } else {
        Alert.alert(
          'Error',
          `Please Select One Option from the List`,
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false },
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  function clickchkbox(num: number, type: string) {

    let i = num;
    setfundAcc(type);
    if (i == 1) {
      setCheck1(true);
      setCheck2(false);
      setCheck3(false);
      setCheck4(false);
      setCheck5(false);
    } else if (i == 2) {
      setCheck1(false);
      setCheck2(true);
      setCheck3(false);
      setCheck4(false);
      setCheck5(false);
    } else if (i == 3) {
      setCheck1(false);
      setCheck2(false);
      setCheck3(true);
      setCheck4(false);
      setCheck5(false);
    } else if (i == 4) {
      setCheck1(false);
      setCheck2(false);
      setCheck3(false);
      setCheck4(true);
      setCheck5(false);
    } else if (i == 5) {
      setCheck1(false);
      setCheck2(false);
      setCheck3(false);
      setCheck4(false);
      setCheck5(true);
    }
  }

  const onLoadfun = async () => {

    var retrievedData: any = await AsyncStorage.getItem('insertedquestarr');
    var usearry = JSON.parse(retrievedData);
    var arr = usearry[0].funding_account;
    var storeval = await AsyncStorage.getItem('basicinfostore');
    if (arr === 'Family') {
      setCheck1(true);
      setfundAcc('Family');
    } else if (arr === 'Employment Income') {
      setCheck2(true);
      setfundAcc('Employment Income');
    } else if (arr === 'Investments') {
      setCheck3(true);
      setfundAcc('Investments');
    } else if (arr === 'Inheritance') {
      setCheck4(true);
      setfundAcc('Inheritance');
    } else if (arr === 'Business Income') {
      setCheck5(true);
      setfundAcc('Business Income');
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
              <View style={EmployeeInfoStyles.stepLineInn4} />
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
            <View style={[EmployeeInfoStyles.numberView]}>
              <Text style={EmployeeInfoStyles.numberTxt}>4</Text>
            </View>
            <View
              style={[
                EmployeeInfoStyles.numberView,
                { backgroundColor: ColorSheet.$Gray3 },
              ]}>
              <Text style={EmployeeInfoStyles.numberTxt}>5</Text>
            </View>
          </View>
          <Text style={EmployeeInfoStyles.infoTxt}>
            How will you fund your account?
          </Text>
          <Text
            style={[
              EmployeeInfoStyles.infoTxt,
              { fontSize: 20, marginBottom: 20 },
            ]}>
            Bank Account
          </Text>
        </View>
        <View style={AnnualIncomeStyles.optionView}>
          <Text style={EmployeeInfoStyles.checkLabel}>Family</Text>
          <CheckBox
            onClick={() => clickchkbox(1, 'Family')}
            isChecked={Check1}
            checkBoxColor={ColorSheet.$Green8}
          />
        </View>
        <View style={AnnualIncomeStyles.optionView}>
          <Text style={EmployeeInfoStyles.checkLabel}>Employment Income</Text>
          <CheckBox
            onClick={() => clickchkbox(2, 'Employment Income')}
            isChecked={Check2}
            checkBoxColor={ColorSheet.$Green8}
          />
        </View>
        <View style={AnnualIncomeStyles.optionView}>
          <Text style={EmployeeInfoStyles.checkLabel}>Investments</Text>
          <CheckBox
            onClick={() => clickchkbox(3, 'Investments')}
            isChecked={Check3}
            checkBoxColor={ColorSheet.$Green8}
          />
        </View>
        <View style={AnnualIncomeStyles.optionView}>
          <Text style={EmployeeInfoStyles.checkLabel}>Inheritance</Text>
          <CheckBox
            onClick={() => clickchkbox(4, 'Inheritance')}
            isChecked={Check4}
            checkBoxColor={ColorSheet.$Green8}
          />
        </View>
        <View style={AnnualIncomeStyles.optionView}>
          <Text style={EmployeeInfoStyles.checkLabel}>Business Income</Text>
          <CheckBox
            onClick={() => clickchkbox(5, 'Business Income')}
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
      </ScrollView>
    </View>
  );
};

export default FundAccount;
