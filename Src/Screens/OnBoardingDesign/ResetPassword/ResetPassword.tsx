import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import React, { useState } from 'react';

import ColorSheet from '../../../StyleSheet/ColorSheet';
import ImagesAll from '../../../StyleSheet/ImagesAll';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';

import Ionicons from 'react-native-vector-icons/Ionicons';
import * as yup from 'yup';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makePostRequest, makePostRequestpass } from '../../../Utils/utils';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import Modal from 'react-native-modal';
import { SignupStyles } from '../../OnBoardingDesign/SignupScreen/SignupStyle';
import { SigninStyles } from '../../OnBoardingDesign/SigninScreen/SigninStyle';

const ResetPassword = ({ navigation, route, props }: any) => {

  const [password, setpassword] = useState('');
  const [ConfirmPass, setConfirmPass] = useState('');
  const [secure, setSecure] = useState(true);
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [flagalert, setflagalert] = useState(false);
  const [resetpasscode, setresetpasscode] = useState('');
  const [userid] = [route.params.userId];

  const onSubmit = async (values: any) => {

    try {

      var bodyFormData = {
        token_id: values.resetpasscode,
        user_id: userid,
        password: values.password
      };

      makePostRequest('auth/tokenVerification', bodyFormData)
        .then(async (result: any) => {
          console.log(result.data.message)
          if (result.data.message == 'success') {
            try {
              Alert.alert(
                "Updated",
                'Password Reset Successfully',
                [{ text: "OK", onPress: () => navigation.navigate('Signin') }],
                { cancelable: false }
              );
            } catch (e) {
              console.log(e);
            }
          } else {
            Alert.alert('Reset code is not match');
          }
        })
        .catch(function (error) {
          console.log(error);
          Alert.alert(
            'Error',
            JSON.stringify(error.response.data.message),
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false },
          );
        });
    } catch (e) {
      console.log(e);
    }
  };

  const toggleModal1 = () => {

    setModalCreate(!isModalCreate);
  };

  const okclick = async () => {

    await AsyncStorage.clear();
    navigation.navigate('Signin');
  };

  return (

    <View style={[CommonStyles.ContainerWhite, CommonStyles.centerContainer]}>
      <ImageBackground source={ImagesAll.BGLogin} style={SignupStyles.bgImage}>
        <View style={CommonStyles.sideSpaceLogin}>
          <Image
            source={ImagesAll.whitelogo}
            style={CommonStyles.logoImgCenter}
          />
          <Text style={SignupStyles.SignupTxt}>Reset Password</Text>
          <View>
            <Modal isVisible={isModalCreate}>
              <View style={WatchListStyles.ModalView}>
                <TouchableOpacity onPress={toggleModal1}>
                  <View style={CommonStyles.closeBtnView}>
                    <Ionicons name="close" style={CommonStyles.clodeICon} />
                  </View>
                </TouchableOpacity>
                <Text style={WatchListStyles.PopupHeader}>{errortext}</Text>
                {flagalert == true ? (
                  <View style={CommonStyles.commonBotSP}>
                    <TouchableOpacity onPress={okclick}>
                      <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                        <Text style={CommonStyles.btnTxt}>Ok</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={CommonStyles.commonBotSP}>
                    <TouchableOpacity onPress={toggleModal1}>
                      <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                        <Text style={CommonStyles.btnTxt}>Ok</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </Modal>
          </View>
          <Formik
            initialValues={{
              resetpasscode: '',
              password: '',
              ConfirmPass: '',
            }}
            onSubmit={onSubmit}
            validationSchema={yup.object().shape({
              resetpasscode: yup
                .string()
                .required('OTP is required')
                .matches(/^[0-9]{4}$/, 'Only 4 Numeric Digit required'),
              password: yup
                .string()
                .required('New password is required')
                .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                  'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
                ),
              ConfirmPass: yup
                .string()
                .equals([yup.ref('password')], "Password don't match")
                .required('Confirm password is required'),
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
                  placeholder="Enter OTP"
                  placeholderTextColor={ColorSheet.$Gray6}
                  style={[CommonStyles.inputField, CommonStyles.inputShadow]}
                  defaultValue={values.resetpasscode}
                  onChangeText={handleChange('resetpasscode')}
                  onChange={() => setresetpasscode(values.resetpasscode)}//
                  onBlur={() => setFieldTouched('resetpasscode')}
                />
                {touched.resetpasscode && errors.resetpasscode && (
                  <Text style={[CommonStyles.error]}>
                    {errors.resetpasscode}
                  </Text>
                )}

                <View style={CommonStyles.eyeIconOut}>
                  <TextInput
                    secureTextEntry={secure}
                    placeholder="New Password"
                    placeholderTextColor={ColorSheet.$Gray6}
                    style={[CommonStyles.inputField, SigninStyles.paddRight]}
                    defaultValue={values.password}
                    onChangeText={handleChange('password')}
                    onChange={() => setpassword(values.password)}//
                    onBlur={() => setFieldTouched('password')}
                  />
                  {touched.password && errors.password && (
                    <Text style={[CommonStyles.error]}>{errors.password}</Text>
                  )}
                  <Ionicons
                    name={secure ? 'eye-off' : 'eye'}
                    size={19}
                    color={ColorSheet.$Gray6}
                    style={CommonStyles.secureIcon}
                    onPress={() => setSecure(!secure)}
                  />
                </View>

                <View style={CommonStyles.eyeIconOut}>
                  <TextInput
                    secureTextEntry={secure}
                    placeholder="Confirm Password"
                    placeholderTextColor={ColorSheet.$Gray6}
                    style={CommonStyles.inputField}
                    defaultValue={values.ConfirmPass}
                    onChangeText={handleChange('ConfirmPass')}
                    onChange={() => setConfirmPass(values.ConfirmPass)}
                    onBlur={() => setFieldTouched('ConfirmPass')}
                  />
                  {touched.ConfirmPass && errors.ConfirmPass && (
                    <Text style={[CommonStyles.error]}>
                      {errors.ConfirmPass}
                    </Text>
                  )}
                  <Ionicons
                    name={secure ? 'eye-off' : 'eye'}
                    size={22}
                    color={ColorSheet.$Gray8}
                    style={CommonStyles.secureIcon}
                    onPress={() => setSecure(!secure)}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  disabled={!isValid}>
                  <View
                    style={[
                      CommonStyles.lightbtnCotainer,
                      SignupStyles.marginTop,
                    ]}>
                    <Text style={CommonStyles.btnTxt}>Reset Password</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ResetPassword;
