import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SignupStyles } from '../SignupScreen/SignupStyle';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import ImagesAll from '../../../StyleSheet/ImagesAll';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import { SigninStyles } from './SigninStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as yup from 'yup';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAlpacagetRequest, makeGetRequest, makePostRequest, post_GetAlpacaData, storeApiKey } from '../../../Utils/utils';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import Modal from 'react-native-modal';

const SigninScreen = ({ navigation }: any) => {

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');

  const [get_token, setToken] = useState('');

  const onSubmit = async (values: any) => {

    try {

      var bodyFormData = {
        email: values.Email.trim(),
        password: values.Password,
      };

      makePostRequest('auth/logIn', bodyFormData)
        .then(async (result: any) => {

          makeGetRequest('auth/getKey', result.data.data.token_id)
            .then(async (keyresult: any) => {

              if (keyresult.data) {

                storeApiKey(keyresult.data.data);

                let insertedStorarr = [];

                AsyncStorage.setItem('userID', result.data.data.user_id.toString());
                AsyncStorage.setItem('token', result.data.data.token_id);
                AsyncStorage.setItem('userfname', result.data.data.fname);
                AsyncStorage.setItem('userlname', result.data.data.lname);
                AsyncStorage.setItem('emailstore', result.data.data.email);

                if (result.data.data.profilepic !== null) {
                  AsyncStorage.setItem('profilestore', result.data.data.profilepic);
                }

                if (result.data.data.basic_info == true) {
                  AsyncStorage.setItem('basicinfostore', 'true');
                } else {
                  AsyncStorage.setItem('basicinfostore', 'false');
                }

                if (result.data.data.basic_info == false) {

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
                  navigation.navigate('CommisionFree');
                }
                else if (result.data.data.basic_info == true && result.data.account[0] == undefined) {

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

                  navigation.navigate('bottomTab', { screen: 'DashboardStack' });

                }
                else {

                  AsyncStorage.setItem('alpaca_id', result.data.account[0].al_id);
                  AsyncStorage.setItem('broksttus', result.data.account[0].al_status);
                  AsyncStorage.setItem('alpacaAccountNo', result.data.account[0].al_account_number);

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

                  try {
                    // makeAlpacagetRequest('accounts/' + result.data.account[0].al_id + '/ach_relationships')
                    //   .then(async (accresult: any) => {
                    //     if (accresult.data != 0) {
                    //       AsyncStorage.setItem('achidval', accresult.data[0].id);
                    //     }
                    //     navigation.navigate('bottomTab', { screen: 'DashboardStack' });
                    //   })
                    //   .catch(function (error) {
                    //     navigation.navigate('bottomTab', { screen: 'DashboardStack' });
                    //   });
                    var uridata = {
                      url: 'accounts/' + result.data.account[0].al_id + '/ach_relationships',
                    };
                    let tokenidstore = await AsyncStorage.getItem('token');
                    post_GetAlpacaData('alpaca/getalpacadata', uridata, tokenidstore)
                      .then(async (accresult: any) => {
                        console.log('ach_relationships')
                        if (accresult.data.data != 0) {
                          AsyncStorage.setItem('achidval', accresult.data.data[0].id);
                        }
                        navigation.navigate('bottomTab', { screen: 'DashboardStack' });
                      })
                      .catch(function (error) {
                        navigation.navigate('bottomTab', { screen: 'DashboardStack' });
                      });

                  } catch (e) {
                    console.log(e);
                  }
                  //if (getAccount) {
                  // insertedStorarr.push({
                  //   investing_type: result.data.data.investing_type,
                  //   job_title: result.data.data.job_title,
                  //   current_employer: result.data.data.current_employer,
                  //   annual_income: result.data.data.annual_income,
                  //   liquid_asset: result.data.data.liquid_asset,
                  //   funding_account: result.data.data.funding_account,
                  //   phone_no: result.data.data.phone_no,
                  //   street_address: result.data.data.street_address,
                  //   city: result.data.data.city,
                  //   state: result.data.data.state,
                  //   postal_code: result.data.data.postal_code,
                  //   country: result.data.data.country,
                  // });

                  // AsyncStorage.setItem(
                  //   'insertedquestarr',
                  //   JSON.stringify(insertedStorarr),
                  // );

                  // navigation.navigate('bottomTab', { screen: 'DashboardStack' });
                  //}
                }

                values.UserName = '';
                values.Password = '';
                setPassword('');
                setPassword('');
              }
              else {
                seterrortext('Check with app configuration,contact system administration');
                setModalCreate(true);
              }
            })
            .catch(function (error) {
              var errmsg = JSON.stringify(error);
              console.log(errmsg);
              seterrortext(errmsg);
              setModalCreate(true);
            });
        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error.response.data.message);
          console.log(errmsg);
          seterrortext(errmsg);
          setModalCreate(true);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const GetKey = (tokenidstore: string): any => {

    let apiStatus = makeGetRequest('auth/getKey', tokenidstore)
      .then(async (result: any) => {
        if (result.data) {
          console.log(result.data.data)
          storeApiKey(result.data.data);
          //return false;
        }
        else {
          //return false;
        }
      })
      .catch(function (error) {
        //return false;
      });
    return apiStatus;
  };

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  return (
    <View style={[CommonStyles.ContainerWhite, CommonStyles.centerContainer]}>
      <ImageBackground source={ImagesAll.BGLogin} style={SignupStyles.bgImage}>
        <View style={CommonStyles.sideSpaceLogin}>
          <Image
            source={ImagesAll.whitelogo}
            style={CommonStyles.logoImgCenter}
          />
          <Text style={SignupStyles.SignupTxt}>Login</Text>
          <View>
            <Modal isVisible={isModalCreate}>
              <View style={WatchListStyles.ModalView}>
                <TouchableOpacity onPress={toggleModal1}>
                  <View style={CommonStyles.closeBtnView}>
                    <Ionicons name="close" style={CommonStyles.clodeICon} />
                  </View>
                </TouchableOpacity>
                <Text style={WatchListStyles.PopupHeader}>
                  {errortext}..
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
          <Formik
            initialValues={{
              Email: '',
              Password: '',
            }}
            onSubmit={onSubmit}
            validationSchema={yup.object().shape({
              Email: yup.string().trim().email('Please enter valid email').required(),
              Password: yup.string().required(),
            })}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <View>
                <TextInput
                  placeholder="Email Address"
                  placeholderTextColor={ColorSheet.$Gray6}
                  style={CommonStyles.inputField}
                  defaultValue={values.Email}
                  onChangeText={handleChange('Email')}
                  onChange={() => setEmail(values.Email)}
                  onBlur={() => setFieldTouched('Email')}
                />
                {touched.Email && errors.Email && (
                  <Text style={[CommonStyles.error]}>{errors.Email}</Text>
                )}
                <View style={CommonStyles.eyeIconOut}>
                  <TextInput
                    secureTextEntry={secure}
                    placeholder="Password"
                    placeholderTextColor={ColorSheet.$Gray6}
                    style={[CommonStyles.inputField, SigninStyles.paddRight]}
                    defaultValue={values.Password}
                    onChangeText={handleChange('Password')}
                    onChange={() => setPassword(values.Password)}
                    onBlur={() => setFieldTouched('Password')}
                  />
                  {touched.Password && errors.Password && (
                    <Text style={[CommonStyles.error]}>{errors.Password}</Text>
                  )}
                  <Ionicons
                    name={secure ? 'eye-off' : 'eye'}
                    size={19}
                    color={ColorSheet.$Gray6}
                    style={CommonStyles.secureIcon}
                    onPress={() => setSecure(!secure)}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotScreen')}>
                  <Text style={SigninStyles.forgotPassTxt}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  disabled={!isValid}>
                  <View
                    style={[
                      CommonStyles.lightbtnCotainer,
                    ]}>
                    <Text style={CommonStyles.btnTxt}>Login</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <View style={CommonStyles.dontAccount}>
            <Text style={SignupStyles.smallTxt}>
              Don't have an account? {''}
            </Text>
            <TouchableOpacity>
              <Text
                style={SignupStyles.signLink}
                onPress={() => {
                  navigation.navigate('Signup');
                }}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>    
  );
};

export default SigninScreen;
