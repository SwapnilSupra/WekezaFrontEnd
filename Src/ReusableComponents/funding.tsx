import { View, Text, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import ImagesAll from '../StyleSheet/ImagesAll';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAlpacagetRequest, post_GetAlpacaData, sendNotification } from '../Utils/utils';
import { DashboardStyles } from '../Screens/Dashboard/dashboardStyle';
import MaterialIconsAdd from 'react-native-vector-icons/MaterialIcons';

interface fundProp {

  navigation: any,
}

const Funding = (props: fundProp) => {

  const [getAccountstatus, setAccountstatus] = useState(['cash']);
  const [fundingStatus, setfundingStatus] = useState('');
  const isCancelled = React.useRef(false);
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');

  const getAccountStatus = async () => {

    let savealpcaid: any = await AsyncStorage.getItem('alpaca_id');

    if (savealpcaid != null) {

      try {

        // makeAlpacagetRequest('trading/accounts/' + savealpcaid + '/account')
        //   .then(async (result: any) => {
        //     if (!isCancelled.current) {
        //       if (result.data != 0) {
        //         setAccountstatus(result.data);
        //         AsyncStorage.setItem('Amount', result.data.cash);
        //       }
        //     }
        //   })
        //   .catch(function (error) {
        //     var errmsg = JSON.stringify(error.response.data.message)
        //     seterrortext(errmsg)
        //     setModalCreate(true)
        //   });

        let tokenidstore = await AsyncStorage.getItem('token');

        var data = {
          url: 'trading/accounts/' + savealpcaid + '/account',
        };

        post_GetAlpacaData('alpaca/getalpacadata', data, tokenidstore)
          .then(async (result: any) => {
            if (!isCancelled.current) {
              //console.log(result.data.data)
              if (result.data.data != 0) {
                setAccountstatus(result.data.data);
                AsyncStorage.setItem('Amount', result.data.data.cash);
              }
            }
          })
          .catch(function (error) {
            var errmsg = JSON.stringify(error.response.data.data.message)
            seterrortext(errmsg)
            setModalCreate(true)
          });

        // makeAlpacagetRequest('accounts/' + savealpcaid + '/transfers?limit=1')
        //   .then(async (result: any) => {
        //     if (!isCancelled.current) {
        //       if (result.data != 0) {
        //         console.log(result.data[0].amount)
        //         AsyncStorage.setItem('fundingstaus', result.data[0].amount + " " + result.data[0].status.split("_").join(" "));
        //         if (result.data[0].status == "SENT_TO_CLEARING") {
        //           setfundingStatus(result.data[0].amount + "  " + result.data[0].status.replace('SENT_TO_CLEARING', "In progress"));
        //         }
        //         else if (result.data[0].status == "APPROVAL_PENDING") { setfundingStatus(result.data[0].amount + "  " + result.data[0].status.replace('APPROVAL_PENDING', "Pending")); }
        //         else { setfundingStatus(result.data[0].amount + "  " + result.data[0].status); }
        //       }
        //     }
        //   })
        //   .catch(function (error) {
        //     var errmsg = JSON.stringify(error.response.data.message)
        //     seterrortext(errmsg)
        //     setModalCreate(true)
        //   });

        var transferdata = {
          url: 'accounts/' + savealpcaid + '/transfers?limit=1',
        };
        post_GetAlpacaData('alpaca/getalpacadata', transferdata, tokenidstore)
          .then(async (result: any) => {
            if (!isCancelled.current) {
              if (result.data.data != 0) {
                console.log(result.data.data[0].amount)
                AsyncStorage.setItem('fundingstaus', result.data.data[0].amount + " " + result.data.data[0].status.split("_").join(" "));
                if (result.data.data[0].status == "SENT_TO_CLEARING") {
                  setfundingStatus(result.data.data[0].amount + "  " + result.data.data[0].status.replace('SENT_TO_CLEARING', "In progress"));
                }
                else if (result.data.data[0].status == "APPROVAL_PENDING") { setfundingStatus(result.data.data[0].amount + "  " + result.data.data[0].status.replace('APPROVAL_PENDING', "Pending")); }
                else { setfundingStatus(result.data.data[0].amount + "  " + result.data.data[0].status); }
              }
            }
          })
          .catch(function (error) {
            seterrortext(error.response.data.message.message)
            setModalCreate(true)
          });

      } catch (e) {
        console.log(e);
      }
    }
  };

  // const chk = async () => {

  //   let notification_token = await AsyncStorage.getItem('fcmToken');

  //   var notificationBody = {
  //     "registration_ids": [notification_token],
  //     "notification": {
  //       "title": 'Place order for  testing stock',
  //       "body": "testing notification"
  //     }
  //   }
  //   sendNotification(notificationBody)
  //     .then(async (res: any) => {
  //       console.log('test' + res.data.status);
  //     })
  // }

  useEffect(() => {

    getAccountStatus();
    return () => { isCancelled.current = true; }
  }, []);

  return (

    <View style={DashboardStyles.bgCashOut}>
      <ImageBackground
        source={ImagesAll.BGCashsm}
        resizeMode="cover"
        style={DashboardStyles.BgCash}>
        <View style={DashboardStyles.CashImgView}>
          <Image source={ImagesAll.Cash} style={DashboardStyles.CashImg} />
        </View>
        <View style={DashboardStyles.flexCol}>
          <View style={DashboardStyles.moneyView}>
            <Text style={DashboardStyles.CashTxt}>${getAccountstatus.cash != null ? Number(getAccountstatus.cash).toFixed(2) : 0}</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('AddFund')}>
              <View style={DashboardStyles.plusAddView}>
                <View style={DashboardStyles.plusView}>
                  <MaterialIconsAdd
                    name="add"
                    style={DashboardStyles.plus}
                  />
                </View>
                <Text style={DashboardStyles.addMoneyTxt}>
                  Add Funding..
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={DashboardStyles.labelCash}>
            Cash available for investment
          </Text>
          {fundingStatus !== null ? <Text style={DashboardStyles.lastFunding}>
            Last funding status for $<Text style={DashboardStyles.lastFundingStatus}>{fundingStatus}</Text>
          </Text> : null}
        </View>
      </ImageBackground>
    </View>
  );
};

export default React.memo(Funding);