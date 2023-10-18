import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import React, { useState } from 'react';

import ColorSheet from '../../../StyleSheet/ColorSheet';
import ImagesAll from '../../../StyleSheet/ImagesAll';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';

import Ionicons from 'react-native-vector-icons/Ionicons';
import * as yup from 'yup';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makePostRequestpass } from '../../../Utils/utils';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import Modal from 'react-native-modal';
import { SignupStyles } from '../../OnBoardingDesign/SignupScreen/SignupStyle';
import { SigninStyles } from '../../OnBoardingDesign/SigninScreen/SigninStyle';

const Setting = ({ navigation }: any) => {
  const [newpassword, setnewpassword] = useState('');
  const [oldpassword, setoldpassword] = useState('');
  const [ConfirmPass, setConfirmPass] = useState('');
  const [secure, setSecure] = useState(true);
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [flagalert, setflagalert] = useState(false);


  const onSubmit = async (values: any) => {
    try {
      let storeuserid = await AsyncStorage.getItem('userID');
      let tokenidstore = await AsyncStorage.getItem('token');

      var bodyFormData = {
        user_id: Number(storeuserid),
        password: values.oldpassword,
        newpassword: values.newpassword,
      };

      makePostRequestpass('auth/changePassword', bodyFormData, tokenidstore)
        .then(async (result: any) => {
          setflagalert(true)
          var errmsg = JSON.stringify(result.data.message)
          seterrortext(errmsg);
          setModalCreate(true);
          setoldpassword('');
          setnewpassword('');
        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error.response.data.message)
          seterrortext(errmsg)
          setModalCreate(true)
          console.log(error);
          console.log(error.response.data.message)
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
  }
  return (
    <View style={[CommonStyles.ContainerWhite, CommonStyles.centerContainer]}>
      <ImageBackground source={ImagesAll.BGLogin} style={SignupStyles.bgImage}>
        <View style={CommonStyles.sideSpaceLogin}>
          <Image
            source={ImagesAll.whitelogo}
            style={CommonStyles.logoImgCenter}
          />
          <Text style={SignupStyles.SignupTxt}>Change Password</Text>
          <View>
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
                {(flagalert == true) ?
                  <View style={CommonStyles.commonBotSP}>
                    <TouchableOpacity onPress={okclick}>
                      <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                        <Text style={CommonStyles.btnTxt}>Ok</Text>
                      </View>
                    </TouchableOpacity>
                  </View> :
                  <View style={CommonStyles.commonBotSP}>
                    <TouchableOpacity onPress={toggleModal1}>
                      <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                        <Text style={CommonStyles.btnTxt}>Ok</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                }
              </View>
            </Modal>
          </View>
          <Formik
            initialValues={{
              oldpassword: '',
              newpassword: '',
              ConfirmPass: ''
            }}
            onSubmit={onSubmit}
            validationSchema={yup.object().shape({
              oldpassword: yup.string().required('Old password is required'),
              newpassword: yup.string().required('New password is required').matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              ),
              ConfirmPass: yup
                .string()
                .equals([yup.ref('newpassword')], "Password don't match")
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
                <View style={CommonStyles.eyeIconOut}>
                  <TextInput
                    secureTextEntry={secure}
                    placeholder="Old Password"
                    placeholderTextColor={ColorSheet.$Gray6}
                    style={CommonStyles.inputField}
                    defaultValue={values.oldpassword}
                    onChangeText={handleChange('oldpassword')}
                    onChange={() => setoldpassword(values.oldpassword)}
                    onBlur={() => setFieldTouched('oldpassword')}
                  />
                  {touched.oldpassword && errors.oldpassword && (
                    <Text style={[CommonStyles.error]}>{errors.oldpassword}</Text>
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
                    placeholder="New Password"
                    placeholderTextColor={ColorSheet.$Gray6}
                    style={[CommonStyles.inputField, SigninStyles.paddRight]}
                    defaultValue={values.newpassword}
                    onChangeText={handleChange('newpassword')}
                    onChange={() => setnewpassword(values.newpassword)}
                    onBlur={() => setFieldTouched('newpassword')}
                  />
                  {touched.newpassword && errors.newpassword && (
                    <Text style={[CommonStyles.error]}>{errors.newpassword}</Text>
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
                    <Text style={CommonStyles.btnTxt}>Change Password</Text>
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

export default Setting;
