import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { EmployeeInfoStyles } from '../EmployeeInfo/EmployeeInfoStyle';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import { SignupStyles } from '../SignupScreen/SignupStyle';
import * as yup from 'yup';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makePostRequest } from '../../../Utils/utils';


const ForgotScreen = ({ navigation }: any) => {

  const [Email, setEmail] = useState('');

  const onSubmit = async (values: any) => {

    try {

      let storeuserid = await AsyncStorage.getItem('userID');
      let tokenidstore = await AsyncStorage.getItem('token');

      var bodyFormData = {
        email: values.Email.trim(),
      };
      makePostRequest('auth/forgotMail', bodyFormData)
        .then(async (result: any) => {
          values.Email = '';
          Alert.alert(
            "success",
            "OTP Send On your register Email Address",
            [{
              text: "OK", onPress: () =>
                navigation.navigate('ResetPassword', { userId: result.data.data })
            }],
            { cancelable: false })

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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={[CommonStyles.ContainerPink, CommonStyles.centerContainer]}>
      <View style={CommonStyles.sideSpace}>
        <Text
          style={[
            EmployeeInfoStyles.optionTxt,
            { marginVertical: 25, marginHorizontal: 0 },
          ]}>
          We will send OTP to Your registered email address.
        </Text>
        <Formik
          initialValues={{
            Email: '',
          }}
          onSubmit={onSubmit}
          validationSchema={yup.object().shape({
            Email: yup.string().trim().email('Please enter valid email').required(),
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
                style={[CommonStyles.inputField, CommonStyles.inputShadow]}
                defaultValue={values.Email}
                onChangeText={handleChange('Email')}
                onChange={() => setEmail(values.Email)}
                onBlur={() => setFieldTouched('Email')}
              />
              {touched.Email && errors.Email && (
                <Text style={[CommonStyles.errorRed]}>{errors.Email}</Text>
              )}
              <TouchableOpacity
                onPress={() => handleSubmit()}
                disabled={!isValid}>
                <View
                  style={[CommonStyles.btnDarkGreen, SignupStyles.forgotBtn]}>
                  <Text style={CommonStyles.btnTxt}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default ForgotScreen;
