import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import { EmployeeInfoStyles } from '../EmployeeInfo/EmployeeInfoStyle';
import { CommisionFreeStyles } from '../CommisionFree/CommisionFreeStyle';
import * as yup from 'yup';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TrustedContact = ({ navigation }: any) => {

  const [GName, setGName] = useState('');
  const [FName, setFName] = useState('');
  const [Email, setEmail] = useState('');
  const [Reltionship, setReltionship] = useState('');
  const [Phone, setPhone] = useState('');


  const onSubmit = async (values: any) => {

    if (await AsyncStorage.getItem('setflagidentity') == 'editidentity') {

      let bodyform: any = await AsyncStorage.getItem('data');
      let jsondata = JSON.parse(bodyform);
      jsondata.trusted_contact = null;
      let trusted_contact_edit = {
        "given_name": values.GName,
        "family_name": values.FName,
        "email_address": values.Email,
        "phone_number": values.Phone,
      }

      let dis = { ...jsondata, "trusted_contact": trusted_contact_edit }
      console.log("if obj", dis)
      AsyncStorage.setItem('data', JSON.stringify(dis));
      navigation.navigate('Summary', {
        trusted_contact: trusted_contact_edit
      });
      AsyncStorage.removeItem('setflagidentity');
    } else {
      let bodyform: any = await AsyncStorage.getItem('data');
      let jsondata = JSON.parse(bodyform);
      let trusted_contact = {
        "given_name": values.GName,
        "family_name": values.FName,
        "email_address": values.Email,
        "phone_number": values.Phone,
      }
      let dis = { ...jsondata, "trusted_contact": trusted_contact }
      AsyncStorage.setItem('data', JSON.stringify(dis));
      navigation.navigate('Summary', {
        trusted_contact: trusted_contact
      });
    }
  };

  const onLoadfun = async () => {

    if (await AsyncStorage.getItem('setflagidentity') == 'editidentity') {
      let bodyform: any = await AsyncStorage.getItem('data');
      let jsondata = JSON.parse(bodyform);
      console.log(jsondata.trusted_contact.email_address);
      setGName(jsondata.trusted_contact.given_name);
      setFName(jsondata.trusted_contact.family_name);
      setEmail(jsondata.trusted_contact.email_address);
      setPhone(jsondata.trusted_contact.phone_number)
    }
  }

  useEffect(() => {
    onLoadfun();
  }, [])

  return (
    <View style={CommonStyles.ContainerPink}>
      <ScrollView>
        <View style={[CommonStyles.sideSpace, CommonStyles.commonBotSP]}>
          <View style={[CommisionFreeStyles.dotView]}>
            <View style={CommisionFreeStyles.dot} />
            <View style={CommisionFreeStyles.dot} />
            <View style={CommisionFreeStyles.dot} />
            <View style={CommisionFreeStyles.dot} />
            <View style={CommisionFreeStyles.dot} />
            <View
              style={[CommisionFreeStyles.dot, CommisionFreeStyles.longDash]}
            />
          </View>
          <Text
            style={[
              EmployeeInfoStyles.infoHeading,
              EmployeeInfoStyles.marginBotMore,
            ]}>
            Trusted Contact
          </Text>
          <Formik
            enableReinitialize
            initialValues={{
              GName: GName,
              FName: FName,
              Email: Email,
              Phone: Phone,
              // Reltionship: '',
            }}
            onSubmit={onSubmit}
            validationSchema={yup.object().shape({
              GName: yup.string().required(),
              FName: yup.string().required(),
              Email: yup.string().email('Please enter valid email').required(),
              Phone:
                yup.string().matches(/^[0-9]{10}$/, 'Phone no must be 10 digits').required(),
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
                <Text style={CommonStyles.labelText}>Given Name</Text>
                <TextInput
                  placeholder="Given Name"
                  placeholderTextColor={ColorSheet.$Gray6}
                  style={CommonStyles.inputField}
                  defaultValue={GName}
                  onChangeText={handleChange('GName')}
                  onChange={() => setGName(GName)}
                  onBlur={() => setFieldTouched('GName')}
                />
                {touched.GName && errors.GName && (
                  <Text style={[CommonStyles.error]}>{errors.GName}</Text>
                )}
                <Text style={CommonStyles.labelText}>Family Name</Text>
                <TextInput
                  placeholder="Family Name"
                  placeholderTextColor={ColorSheet.$Gray6}
                  style={CommonStyles.inputField}
                  defaultValue={FName}
                  onChangeText={handleChange('FName')}
                  onChange={() => setFName(FName)}
                  onBlur={() => setFieldTouched('FName')}
                />
                {touched.FName && errors.FName && (
                  <Text style={[CommonStyles.error]}>{errors.FName}</Text>
                )}
                <Text style={CommonStyles.labelText}>Email Address</Text>
                <TextInput
                  placeholder="Email Address"
                  placeholderTextColor={ColorSheet.$Gray6}
                  style={CommonStyles.inputField}
                  defaultValue={Email}
                  onChangeText={handleChange('Email')}
                  onChange={() => setEmail(Email)}
                  onBlur={() => setFieldTouched('Email')}
                />
                {touched.Email && errors.Email && (
                  <Text style={[CommonStyles.error]}>{errors.Email}</Text>
                )}
                <View style={CommonStyles.prefixOut}>
                  <Text style={CommonStyles.labelText}>Phone No.</Text>
                  <TextInput
                    placeholder="Phone No."
                    placeholderTextColor={ColorSheet.$Gray6}
                    style={[CommonStyles.inputField, CommonStyles.inputFieldPhone]}
                    defaultValue={Phone}
                    onChangeText={handleChange('Phone')}
                    onChange={() => setPhone(Phone)}
                    onBlur={() => setFieldTouched('Phone')}
                  />
                  <Text style={CommonStyles.prefix}>+1</Text>
                  {touched.Phone && errors.Phone && (
                    <Text style={[CommonStyles.error]}>{errors.Phone}</Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  disabled={!isValid}>
                  <View style={[CommonStyles.btnCotainer, { marginTop: 20 }]}>
                    <Text style={CommonStyles.btnTxt}>Submit</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

export default TrustedContact;
