import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import { EmployeeInfoStyles } from './EmployeeInfoStyle';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { makePutRequest } from '../../../Utils/utils';
import SelectDropdown from 'react-native-select-dropdown';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { ScrollView } from 'react-native-gesture-handler';

const EmployeeInfo = ({ navigation }: any) => {

  var emptype = [
    'Employed',
    'Unemployed',
    'Student',
    'Retired',
  ];

  const [jobTitle, setjobTitle] = useState('');
  const [fullname, setfullname] = useState('');
  const [currentemp, setcurrentemp] = useState('');
  const [empmenttype, setemptype] = useState('');
  const [showlist, setshowlist] = useState(false);
  const [address, setAddress] = useState('');

  const onSubmit = async (jobTitle: any, currentemp: any, address: any) => {

    try {

      if (empmenttype !== '') {
        if (await AsyncStorage.getItem('editprofileflg') == 'editprofile') {

          let storeuserid = await AsyncStorage.getItem('userID');
          let tokenidstore = await AsyncStorage.getItem('token');
          var bodyFormData = {
            user_id: Number(storeuserid),
            job_title: jobTitle,
            current_employer: currentemp
          };

          makePutRequest('auth/updateUser', bodyFormData, tokenidstore)
            .then(async (result: any) => {
              let insertedStorarr = [];
              if (result.data.data.basic_info == true) {
                insertedStorarr.push({
                  investing_type: result.data.data.investing_type,
                  job_title: result.data.data.job_title,
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
            job_title: jobTitle,
            current_employer: currentemp
          };

          console.log(JSON.stringify(bodyFormData));
          makePutRequest('auth/updateUser', bodyFormData, tokenidstore)
            .then(async (result: any) => {
              let disclosurearr = [];
              if (empmenttype == 'Employed') {
                if (jobTitle !== '' && currentemp !== '' && address !== '') {
                  disclosurearr.push({
                    emp_status: empmenttype,
                    job_title: jobTitle, current_employer: currentemp, address: address
                  });
                  AsyncStorage.setItem('saveempdata', JSON.stringify(disclosurearr),
                  );
                  console.log('dddd', disclosurearr)
                  navigation.navigate('AnnualIncome');
                } else {
                  Alert.alert(
                    "Error",
                    'Please fill all fields',
                    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                    { cancelable: false }
                  );
                }
              } else {
                disclosurearr.push({
                  emp_status: empmenttype,
                });
                AsyncStorage.setItem('saveempdata', JSON.stringify(disclosurearr),
                );
                console.log('eeeee', disclosurearr)
                navigation.navigate('AnnualIncome');
              }
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
        console.log("data");
      } else {
        Alert.alert(
          'Error',
          `Please Select Type `,
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false },
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onLoadfun = async () => {

    let storefname = await AsyncStorage.getItem('userfname');
    let storelname = await AsyncStorage.getItem('userlname');

    let fullnamenew = storefname + ' ' + storelname;
    setfullname(fullnamenew);
    var retrievedData: any = await AsyncStorage.getItem('insertedquestarr');
    var usearry = JSON.parse(retrievedData);
    var arr = usearry[0].job_title;
    var arremp = usearry[0].current_employer
    var storeval = await AsyncStorage.getItem('basicinfostore');
    if (arr !== '') {
      setjobTitle(arr);
    }
    if (arremp !== '') {
      setcurrentemp(arremp);
    }
  };

  const setelement = async (item: any, index: any) => {

    setemptype(item);
    if (index == 0) {
      setshowlist(true);
    }
    else {
      setshowlist(false);
    }
  };

  useEffect(() => {
    onLoadfun();
  }, []);

  return (

    <ScrollView>
      <View style={CommonStyles.ContainerPink}>
        <View style={CommonStyles.sideSpace}>
          <View style={EmployeeInfoStyles.numberStyle}>
            <View style={EmployeeInfoStyles.stepLine}>
              <View style={EmployeeInfoStyles.stepLineInn1} />
            </View>
            <View style={EmployeeInfoStyles.numberView}>
              <Text style={EmployeeInfoStyles.numberTxt}>1</Text>
            </View>
            <View
              style={[
                EmployeeInfoStyles.numberView,
                { backgroundColor: ColorSheet.$Gray3 },
              ]}>
              <Text style={EmployeeInfoStyles.numberTxt}>2</Text>
            </View>
            <View
              style={[
                EmployeeInfoStyles.numberView,
                { backgroundColor: ColorSheet.$Gray3 },
              ]}>
              <Text style={EmployeeInfoStyles.numberTxt}>3</Text>
            </View>
            <View
              style={[
                EmployeeInfoStyles.numberView,
                { backgroundColor: ColorSheet.$Gray3 },
              ]}>
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
          <Text style={EmployeeInfoStyles.infoTxt}>Employer information</Text>
          <Text style={EmployeeInfoStyles.optionTxt}></Text>
          <Text style={CommonStyles.labelText}>Select Employee Type</Text>
          <SelectDropdown
            data={emptype}
            renderDropdownIcon={(selectedItem: any, index: number) => (
              <Fontisto
                name="angle-down"
                style={CommonStyles.DropdownIcon}
              />
            )}
            dropdownIconPosition="right"
            onSelect={(selectedItem, index) => {
              setelement(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={CommonStyles.inputField}
            buttonTextStyle={CommonStyles.DropdownTxt}
            defaultButtonText={'Select Option'}
          />
          {showlist ?
            <>
              <Text style={CommonStyles.labelText}>Employee Name</Text>
              <TextInput
                placeholder="Employee Name"
                placeholderTextColor={ColorSheet.$Gray6}
                style={CommonStyles.inputField}
                editable={false}
                value={fullname}
              />
              <Text style={CommonStyles.labelText}>Current Employer</Text>
              <TextInput
                placeholder="Current Employer"
                placeholderTextColor={ColorSheet.$Gray6}
                style={CommonStyles.inputField}
                value={currentemp}
                onChangeText={text => setcurrentemp(text)}
              />
              <Text style={CommonStyles.labelText}>Job Title</Text>
              <TextInput
                placeholder="Job Title"
                placeholderTextColor={ColorSheet.$Gray6}
                style={CommonStyles.inputField}
                value={jobTitle}
                onChangeText={text => setjobTitle(text)}
              />
              <Text style={CommonStyles.labelText}>Address</Text>
              <TextInput
                placeholder="Job Address"
                placeholderTextColor={ColorSheet.$Gray6}
                style={CommonStyles.inputField}
                value={address}
                onChangeText={text => setAddress(text)}
              />
            </>
            : null
          }
          <TouchableOpacity onPress={() => onSubmit(jobTitle, currentemp, address)}>
            <View
              style={[CommonStyles.btnCotainer, EmployeeInfoStyles.marginTop]}>
              <Text style={CommonStyles.btnTxt}>Continue</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View >
    </ScrollView>
  );
};

export default EmployeeInfo;
