
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import { FundAddedStyles } from '../FundAdded/FundAddedStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAlpacagetRequest, makeAlpacapostRequest, post_GetAlpacaData, post_PostAlpacaData } from '../../../Utils/utils';
import Modal from 'react-native-modal';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AddFundStyles } from '../AddFund/AddFundStyle';

const Withdraw = ({ navigation }: any) => {

  const [Style1, setStyle1] = useState(false);
  const [Style2, setStyle2] = useState(false);
  const [Style3, setStyle3] = useState(false);
  const [Style4, setStyle4] = useState(false);
  const [Id, setId] = useState('');
  const [fullname, setfullname] = useState('');
  const [valone, setvalone] = useState('');
  const [aplcaid, setaplcaid] = useState('');
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [getAccountstatus, setAccountstatus] = useState([]);


  const toggleModal1 = () => {

    setModalCreate(!isModalCreate);
  };

  const onSubmit = async () => {
    // navigation.navigate('FundAdded');
    try {

      // var bodyformdata = {
      //   "transfer_type": "ach",
      //   "relationship_id": Id,
      //   "amount": Number(valone),
      //   "direction": "OUTGOING"
      // }

      // makeAlpacapostRequest('accounts/' + aplcaid + '/transfers', bodyformdata)
      //   .then(async (result: any) => {
      //   })
      //   .catch(function (error) {
      //     var errmsg = JSON.stringify(error.response.data.message)
      //     seterrortext(errmsg)
      //     setModalCreate(true)
      //   });

      var bodyformdata = {
        "url": 'accounts/' + aplcaid + '/transfers',
        "transfer_type": "ach",
        "relationship_id": Id,
        "amount": Number(valone),
        "direction": "OUTGOING"
      }
      let tokenidstore = await AsyncStorage.getItem('token');
      post_PostAlpacaData('alpaca/postalpacadata', bodyformdata, tokenidstore)
        .then(async (result: any) => {
          await AsyncStorage.setItem('amountsend', valone)
          navigation.navigate('FundAdded');
        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error.response.data.message)
          seterrortext(errmsg)
          setModalCreate(true)
        });

    } catch (e) {
      console.log(e);
    }
  }

  const onLoadfun = async () => {

    let savealpcaid: any = await AsyncStorage.getItem('alpaca_id')
    let saveuserfname: any = await AsyncStorage.getItem('userfname')
    let saveuserlname: any = await AsyncStorage.getItem('userlname')
    let fullnamenew = saveuserfname + ' ' + saveuserlname;
    setfullname(fullnamenew);
    setaplcaid(savealpcaid)

    try {

      // makeAlpacagetRequest('accounts/' + savealpcaid + '/ach_relationships')
      //   .then(async (result: any) => {
      //     setId(result.data[0].id)
      //     AsyncStorage.setItem('achidval', result.data[0].id);
      //   })
      //   .catch(function (error) {
      //     var errmsg = JSON.stringify(error.response.data.message)
      //     seterrortext(errmsg)
      //     setModalCreate(true)
      //   });

      var data = {
        url: 'accounts/' + savealpcaid + '/ach_relationships',
      };
      let tokenidstore = await AsyncStorage.getItem('token');
      post_GetAlpacaData('alpaca/getalpacadata', data, tokenidstore)
        .then(async (result: any) => {
          setId(result.data.data[0].id)
          AsyncStorage.setItem('achidval', result.data.data[0].id);
        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error.response.data.message.message)
          seterrortext(errmsg)
          setModalCreate(true)
        });
    } catch (e) {
      console.log(e);
    }

  }

  const clickfun1 = (val: any) => {
    if (val == '$25') {
      setStyle1(!Style1)
      setStyle2(false)
      setStyle3(false)
      setStyle4(false)
      setvalone('25')
    } else if (val == '$50') {
      setStyle2(!Style2)
      setStyle1(false)
      setStyle3(false)
      setStyle4(false)
      setvalone('50')
    } else if (val == '$75') {
      setStyle3(!Style3)
      setStyle2(false)
      setStyle1(false)
      setStyle4(false)
      setvalone('75')
    } else if (val == '$100') {
      setStyle4(!Style4)
      setStyle2(false)
      setStyle3(false)
      setStyle1(false)
      setvalone('100')
    }
  }

  const getAccountStatus = async () => {

    let savealpcaid: any = await AsyncStorage.getItem('alpaca_id');

    if (savealpcaid != null) {

      try {

        // makeAlpacagetRequest('trading/accounts/' + savealpcaid + '/account')
        //   .then(async (result: any) => {
        //     setAccountstatus(result.data);
        //     AsyncStorage.setItem('Amount', result.data.cash);
        //   })
        //   .catch(function (error) {
        //     var errmsg = JSON.stringify(error.response.data.message)
        //     seterrortext(errmsg)
        //     setModalCreate(true)
        //   });

        var data = {
          url: 'trading/accounts/' + savealpcaid + '/account',
        };
        let tokenidstore = await AsyncStorage.getItem('token');
        post_GetAlpacaData('alpaca/getalpacadata', data, tokenidstore)
          .then(async (result: any) => {
            setAccountstatus(result.data.data);
            AsyncStorage.setItem('Amount', result.data.data.cash);
          })
          .catch(function (error) {
            var errmsg = JSON.stringify(error.response.data.message.message)
            seterrortext(errmsg)
            setModalCreate(true)
          });

      } catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {

    onLoadfun();
    getAccountStatus();
  }, []);

  return (
    <View style={[CommonStyles.ContainerPink, { alignItems: 'center' }]}>
      <ScrollView>
        <View style={[CommonStyles.sideSpace, CommonStyles.commonBotSP]}>
          <TextInput
            placeholder="user name"
            placeholderTextColor={ColorSheet.$Gray6}
            style={[CommonStyles.inputField, { marginTop: 20 }]}
            value={fullname}
            editable={false}
          />
          <View style={AddFundStyles.BalanceViewWithdraw}>
            <View>
              <Text style={AddFundStyles.Moneyadded}>${getAccountstatus.cash != null ? Number(getAccountstatus.cash).toFixed(2) : 0}</Text>
              <Text style={AddFundStyles.BalanceTxt}>Available Balance</Text>
            </View>
            {/* <View style={AddFundStyles.plaidCheckView}>
              <Text style={AddFundStyles.plaidCheckTxt}>Plaid Checking</Text>
              <Text style={AddFundStyles.ChangeTxt}>CHANGE</Text>
            </View> */}
          </View>
          <Text style={{ marginBottom: 4 }}>How much would you like to withdraw?</Text>
          <View style={AddFundStyles.MoneyView}>
            <TouchableOpacity onPress={() => clickfun1('$25')} style={AddFundStyles.addmonyBx}>
              <Text style={[AddFundStyles.Moneyadd, Style1 ? AddFundStyles.MoneyaddSelected : null]}>$25</Text>
            </TouchableOpacity>
            <View style={AddFundStyles.VerticalDivider} />
            <TouchableOpacity onPress={() => clickfun1('$50')} style={AddFundStyles.addmonyBx}>
              <Text style={[AddFundStyles.Moneyadd, Style2 ? AddFundStyles.MoneyaddSelected : null]}>$50</Text>
            </TouchableOpacity>
            <View style={AddFundStyles.VerticalDivider} />
            <TouchableOpacity onPress={() => clickfun1('$75')} style={AddFundStyles.addmonyBx}>
              <Text style={[AddFundStyles.Moneyadd, Style3 ? AddFundStyles.MoneyaddSelected : null]}>$75</Text>
            </TouchableOpacity>
            <View style={AddFundStyles.VerticalDivider} />
            <TouchableOpacity onPress={() => clickfun1('$100')} style={AddFundStyles.addmonyBx}>
              <Text style={[AddFundStyles.Moneyadd, Style4 ? AddFundStyles.MoneyaddSelected : null]}>$100</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={CommonStyles.orText}>Select above amount or enter manually</Text>
          </View>
          <View>
            <Text style={CommonStyles.labelText}>Enter Amount</Text>
            <TextInput
              keyboardType='numeric'
              placeholder="Amount"
              placeholderTextColor={ColorSheet.$Gray6}
              style={CommonStyles.inputField}
              value={valone}
              onChangeText={text => setvalone(text)}
            />
          </View>
          {/* <TextInput
            placeholder="Add Amount"
            placeholderTextColor={ColorSheet.$Gray6}
            style={[CommonStyles.inputField, { marginTop: 20 }]}
          /> */}

          <Text style={FundAddedStyles.smallTxtWithDraw} >
            <FontAwesome name="lock" style={CommonStyles.lockIcon} /> {''} Your
            information is safe with us. The funds will be deducted with in a
            few days from now.
          </Text>
          <TouchableOpacity onPress={() => onSubmit()}>
            <View style={[CommonStyles.btnCotainer, { marginTop: 40 }]}>
              <Text style={CommonStyles.btnTxt}>Withdraw Fund</Text>
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
                <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                  <Text style={CommonStyles.btnTxt}>Ok</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView >
    </View >
  );
};

export default Withdraw;
