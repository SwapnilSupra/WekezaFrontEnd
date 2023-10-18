import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import * as yup from 'yup';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAlpacapostRequest, makePostRequest, post_PostAlpacaData } from '../../../Utils/utils';
import Modal from 'react-native-modal';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ACHRelationship = ({ navigation }: any) => {

  const [account, setAccount] = useState('');
  const [routing, setRouting] = useState('');
  const [name, setName] = useState('');
  const [subtype, setSubtype] = useState('');
  const [Alpcaid, setAlpcaid] = useState('');
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  const onSubmit = async (values: any) => {

    try {

      // var bodyFormData = {
      //   "account_owner_name": name,
      //   "bank_account_number": account,
      //   "bank_account_type": subtype.toUpperCase(),
      //   "bank_routing_number": routing,
      //   "nickname": "Bank of America Checking"
      // }

      // makeAlpacapostRequest('accounts/' + Alpcaid + '/ach_relationships', bodyFormData)
      //   .then(async (result: any) => {
      //     navigation.navigate('AddFund')
      //   })
      //   .catch(function (error) {
      //     var errmsg = JSON.stringify(error.response.data.message)
      //     seterrortext(errmsg)
      //     setModalCreate(true)
      //     console.log(error);
      //   });

      var bodyFormData = {
        "url": 'accounts/' + Alpcaid + '/ach_relationships',
        "account_owner_name": name,
        "bank_account_number": account,
        "bank_account_type": subtype.toUpperCase(),
        "bank_routing_number": routing,
        "nickname": "Bank of America Checking"
      }
      let tokenidstore = await AsyncStorage.getItem('token');
      post_PostAlpacaData('alpaca/postalpacadata', bodyFormData, tokenidstore)
        .then(async (result: any) => {
          navigation.navigate('AddFund');
        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error.response.data.message)
          seterrortext(errmsg)
          setModalCreate(true)
          console.log(error);
        });


    } catch (e) {
      console.log(e);
    }
  };

  const onLoadfun = async () => {
    
    let savebankacc: any = await AsyncStorage.getItem('bankaccount')
    let saveroute: any = await AsyncStorage.getItem('bankrouting')
    let savename: any = await AsyncStorage.getItem('bankname')
    let savetype: any = await AsyncStorage.getItem('accounttype')
    let savealpcaid: any = await AsyncStorage.getItem('alpaca_id')
    setAccount(savebankacc)
    setRouting(saveroute)
    setName(savename)
    setSubtype(savetype)
    setAlpcaid(savealpcaid)
  }

  useEffect(() => {
    onLoadfun();
  }, []);

  return (
    <View style={CommonStyles.ContainerPink}>
      <Formik
        enableReinitialize
        initialValues={{
          account: '',
          routing: '',
          name: '',
          subtype: '',
        }}
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          account: yup.string(),
          routing: yup.string(),
          name: yup.string(),
          subtype: yup.string(),
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
          <View style={[CommonStyles.sideSpace, CommonStyles.commonBotSP]}>
            <TextInput
              placeholder="Bank name"
              placeholderTextColor={ColorSheet.$Gray6}
              style={[CommonStyles.inputField, { marginTop: 30 }]}
              value={account}
              editable={false}
            />
            {touched.account && errors.account && (
              <Text style={[CommonStyles.error]}>{errors.account}</Text>
            )}
            <TextInput
              placeholder="Bank Routing"
              placeholderTextColor={ColorSheet.$Gray6}
              style={CommonStyles.inputField}
              value={routing}
              editable={false}
            />
            {touched.routing && errors.routing && (
              <Text style={[CommonStyles.error]}>{errors.routing}</Text>
            )}
            <TextInput
              placeholder="Bank name"
              placeholderTextColor={ColorSheet.$Gray6}
              style={CommonStyles.inputField}
              value={name}
              editable={false}
            />
            {touched.name && errors.name && (
              <Text style={[CommonStyles.error]}>{errors.name}</Text>
            )}
            <TextInput
              placeholder="Bank subtype"
              placeholderTextColor={ColorSheet.$Gray6}
              style={CommonStyles.inputField}
              value={subtype}
              editable={false}
            />
            {touched.subtype && errors.subtype && (
              <Text style={[CommonStyles.error]}>{errors.subtype}</Text>
            )}

            <TouchableOpacity
              onPress={() => handleSubmit()}
              disabled={!isValid}>
              <View style={[CommonStyles.btnCotainer, { marginTop: 50 }]}>
                <Text style={CommonStyles.btnTxt}>Continue</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
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
              <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                <Text style={CommonStyles.btnTxt}>Ok</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ACHRelationship;
