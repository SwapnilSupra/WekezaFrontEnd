import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import ImagesAll from '../../../StyleSheet/ImagesAll';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import { SignupStyles } from './SignupStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as yup from 'yup';
import { Formik } from 'formik';
import { makePostRequest } from '../../../Utils/utils';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import Modal from 'react-native-modal';

const SignupScreen = ({ navigation }: any) => {

  const [FName, setFName] = useState('');
  const [LName, setLName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPass, setConfirmPass] = useState('');
  const [secure, setSecure] = useState(true);
  const [secureconfirm, setSecureconfirm] = useState(true);
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');

  const onSubmit = async (values: any) => {

    try {

      if (values.ConfirmPass == values.Password) {
        var bodyFormData = {
          fname: values.FName,
          lname: values.LName,
          email: values.Email,
          password: values.Password,
        };
        makePostRequest('auth/createUser', bodyFormData)
          .then(async (result: any) => {
            values.FName = '';
            values.LName = '';
            values.Email = '';
            values.Password = '';
            setEmail('');
            setFName('');
            setLName('');
            setEmail('');
            setPassword('');
            setConfirmPass('');
            var errmsg = JSON.stringify(result.data.message)
            seterrortext(errmsg)
            setModalCreate(true)

          })
          .catch(function (error) {
            var errmsg = JSON.stringify(error.response.data.message)
            seterrortext(errmsg)
            setModalCreate(true)
            console.log(error);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  useEffect(() => {

    return () => {
      setFName('');
      setLName('');
      setEmail('');
      setPassword('');
      setConfirmPass('');
    };
  }, []);

  return (

    <View style={[CommonStyles.ContainerWhite, CommonStyles.centerContainer]}>
      <ImageBackground source={ImagesAll.BGLogin} style={SignupStyles.bgImage}>
        <ScrollView>
          <View style={[CommonStyles.sideSpace, CommonStyles.logoTopSpace]}>
            <Image
              source={ImagesAll.whitelogo}
              style={CommonStyles.logoImgCenter}
            />
            <Text style={SignupStyles.SignupTxt}>Sign Up</Text>
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
                  <TouchableOpacity onPress={() => { navigation.navigate('Signin') }}>
                    <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                      <Text style={CommonStyles.btnTxt}>Ok</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Formik
              initialValues={{
                FName: '',
                LName: '',
                Email: '',
                Password: '',
                ConfirmPass: '',
              }}
              onSubmit={onSubmit}
              validationSchema={yup.object().shape({
                FName: yup.string().required('First Name is required').matches(/^[A-Za-z .'"]*$/, 'Please enter valid first name'),
                LName: yup.string().required('Last Name is required').matches(/^[A-Za-z .'"]*$/, 'Please enter valid last name'),
                Email: yup.string().trim().email('Please enter valid email').required('Email id is required'),
                Password: yup.string().required('Password is required').matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                ),
                ConfirmPass: yup
                  .string()
                  .nullable()
                  .equals([yup.ref('Password')], "Confirm password does not match with password")
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
                  <View style={CommonStyles.smFild}>
                    <View style={CommonStyles.smFildInn}>
                      <TextInput
                        placeholder="First Name"
                        placeholderTextColor={ColorSheet.$Gray6}
                        style={CommonStyles.inputField}
                        defaultValue={values.FName}
                        onChangeText={handleChange('FName')}
                        onChange={() => setFName(values.FName)}
                        onBlur={() => setFieldTouched('FName')}
                      />
                      {touched.FName && errors.FName && (
                        <Text style={[CommonStyles.error]}>{errors.FName}</Text>
                      )}
                    </View>
                    <View style={CommonStyles.smFildInn}>
                      <TextInput
                        placeholder="Last Name"
                        placeholderTextColor={ColorSheet.$Gray6}
                        style={CommonStyles.inputField}
                        defaultValue={values.LName}
                        onChangeText={handleChange('LName')}
                        onChange={() => setLName(values.LName)}
                        onBlur={() => setFieldTouched('LName')}
                      />
                      {touched.LName && errors.LName && (
                        <Text style={[CommonStyles.error]}>{errors.LName}</Text>
                      )}
                    </View>
                  </View>
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
                      style={CommonStyles.inputField}
                      defaultValue={values.Password}
                      onChangeText={handleChange('Password')}
                      onChange={() => setPassword(values.Password)}
                      onBlur={() => setFieldTouched('Password')}
                    />
                    {touched.Password && errors.Password && (
                      <Text style={[CommonStyles.error]}>
                        {errors.Password}
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

                  <View style={CommonStyles.eyeIconOut}>
                    <TextInput
                      secureTextEntry={secureconfirm}
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
                      name={secureconfirm ? 'eye-off' : 'eye'}
                      size={22}
                      color={ColorSheet.$Gray8}
                      style={CommonStyles.secureIcon}
                      onPress={() => setSecureconfirm(!secureconfirm)}
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
                      <Text style={CommonStyles.btnTxt}>Signup</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <View style={CommonStyles.dontAccount}>
              <Text style={SignupStyles.smallTxt}>
                Already have an account? {''}
              </Text>
              <TouchableOpacity>
                <Text
                  style={SignupStyles.signLink}
                  onPress={() => {
                    navigation.navigate('Signin');
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SignupScreen;
