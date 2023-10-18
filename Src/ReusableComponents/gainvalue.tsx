import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../StyleSheet/CommonStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAlpacagetRequest, post_GetAlpacaData } from '../Utils/utils';
import { DashboardStyles } from '../Screens/Dashboard/dashboardStyle';
import { useIsFocused } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import ColorSheet from '../StyleSheet/ColorSheet';
import Modal from 'react-native-modal';
import { WatchListStyles } from '../Screens/WatchlistScreens/WatchList/WatchListStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface gainProp {

  navigation: any,
}

const GainValue = (props: gainProp) => {

  const isFocused = useIsFocused();
  const [getPortfolio, setPortfolio] = useState([{}]);
  const [currval, setcurrval] = useState(0);
  const [lastdayval, setlastdayval] = useState(0);
  const [percyesterday, setpercyesterday] = useState(0);
  const [totalgain, settotalgain] = useState(0);
  const [pertotalgn, setpertotalgn] = useState(0);
  const isCancelled = React.useRef(false);
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  let current_value: number = 0;
  let last_day_val: number = 0;
  let purchase_val: number = 0;

  const getPortfoliodata = async () => {

    let savealpcaid: any = await AsyncStorage.getItem('alpaca_id');
    let cashamt: any = await AsyncStorage.getItem('Amount');

    if (savealpcaid != null) {

      try {
        // makeAlpacagetRequest('trading/accounts/' + savealpcaid + '/positions')
        //   .then(async (result: any) => {
        //     if (!isCancelled.current) {
        //       if (result.data != 0) {
        //         setPortfolio(result.data);
        //         for (let i = 0; i < result.data.length; i++) {
        //           current_value = current_value + Number(result.data[i].current_price);
        //           last_day_val = last_day_val + Number(result.data[i].lastday_price);
        //           var yestprofit: any = last_day_val - current_value;
        //           var percval: any = percyesterday + Number(result.data[i].unrealized_intraday_pl);
        //           purchase_val = purchase_val + Number(result.data[i].unrealized_pl);
        //           var perctotal: any = pertotalgn + Number(result.data[i].unrealized_plpc);
        //         }
        //         var totalcash = (Number(current_value) + Number(cashamt))
        //         setcurrval(totalcash);
        //         setlastdayval(yestprofit);
        //         setpercyesterday(percval);
        //         settotalgain(purchase_val);
        //         setpertotalgn(perctotal);
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
          url: 'trading/accounts/' + savealpcaid + '/positions',
        };

        post_GetAlpacaData('alpaca/getalpacadata', data, tokenidstore)
          .then(async (result: any) => {
            if (!isCancelled.current) {
              if (result.data.data != 0) {
                setPortfolio(result.data.data);
                for (let i = 0; i < result.data.data.length; i++) {
                  current_value = current_value + Number(result.data.data[i].current_price);
                  last_day_val = last_day_val + Number(result.data.data[i].lastday_price);
                  var yestprofit: any = last_day_val - current_value;
                  var percval: any = percyesterday + Number(result.data.data[i].unrealized_intraday_pl);
                  purchase_val = purchase_val + Number(result.data.data[i].unrealized_pl);
                  var perctotal: any = pertotalgn + Number(result.data.data[i].unrealized_plpc);
                }
                var totalcash = (Number(current_value) + Number(cashamt))
                setcurrval(totalcash);
                setlastdayval(yestprofit);
                setpercyesterday(percval);
                settotalgain(purchase_val);
                setpertotalgn(perctotal);
              }
            }
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
  };

  useEffect(() => {
    getPortfoliodata();
    return () => { isCancelled.current = true; }
  }, []);

  return (
    <View style={DashboardStyles.tradeValue}>

      {(currval >= 0) ?
        <View style={DashboardStyles.barLineGreen}>
          <View style={DashboardStyles.rowLine}>
            <Text style={[DashboardStyles.DollarValueTop]}>${currval.toFixed(2)}</Text>
          </View>
          <Text style={DashboardStyles.PriceTxtTop}>Net Assets</Text>
        </View> :
        <View style={DashboardStyles.barLineRed}>
          <View style={DashboardStyles.rowLine}>
            <Text style={[DashboardStyles.DollarValueTop]}>${currval.toFixed(2)}</Text>
          </View>
          <Text style={DashboardStyles.PriceTxtTop}>Net Assets</Text>
        </View>
      }

      {(percyesterday >= 0) ?
        <View style={DashboardStyles.barLineGreen}>
          <View style={DashboardStyles.rowLine}>
            <Text style={[DashboardStyles.DollarValueTop]}>${(lastdayval != null ? lastdayval.toFixed(2) : 0)} </Text>
            <AntDesign name='arrowup' color={ColorSheet.$DarkGreen} size={12} style={DashboardStyles.redArrow} />
            <Text style={[DashboardStyles.DollarValueTop, DashboardStyles.arrowSP, CommonStyles.profitText]}>{(percyesterday != null ? percyesterday.toFixed(2) : 0)}% </Text>
          </View>
          <Text style={DashboardStyles.PriceTxtTop}>Day's Gain</Text>
        </View> :
        <View style={DashboardStyles.barLineRed}>
          <View style={DashboardStyles.rowLine}>
            <Text style={[DashboardStyles.DollarValueTop]}>${(lastdayval != null ? (lastdayval * -1).toFixed(2) : 0)} </Text>
            <AntDesign name='arrowdown' color={ColorSheet.$RedBtn} size={12} style={DashboardStyles.redArrow} />
            <Text style={[DashboardStyles.DollarValueTop, DashboardStyles.arrowSP, CommonStyles.lossText]}>{(percyesterday != null ? (percyesterday * -1).toFixed(2) : 0)}% </Text>
          </View>
          <Text style={DashboardStyles.PriceTxtTop}>Day's Loss</Text>
        </View>
      }

      {(pertotalgn >= 0) ?
        <View style={DashboardStyles.barLineGreen}>
          <View style={DashboardStyles.rowLine}>
            <Text style={[DashboardStyles.DollarValueTop]}>$ {(totalgain != null ? totalgain.toFixed(2) : 0)} </Text>
            <AntDesign name='arrowup' color={ColorSheet.$DarkGreen} size={12} style={DashboardStyles.redArrow} />
            <Text style={[DashboardStyles.DollarValueTop, DashboardStyles.arrowSP, CommonStyles.profitText]}>({(pertotalgn != null ? pertotalgn.toFixed(2) : 0)}%) </Text>
          </View>
          <Text style={DashboardStyles.PriceTxtTop}>Total Gain</Text>
        </View> :
        <View style={DashboardStyles.barLineRed}>
          <View style={DashboardStyles.rowLine}>
            <Text style={[DashboardStyles.DollarValueTop]}>$ {(totalgain != null ? (totalgain).toFixed(2) : 0)} </Text>
            <AntDesign name='arrowdown' color={ColorSheet.$RedBtn} size={12} style={DashboardStyles.redArrow} />
            <Text style={[DashboardStyles.DollarValueTop, DashboardStyles.arrowSP, CommonStyles.lossText]}> {pertotalgn != null ? (pertotalgn * -1).toFixed(2) : 0}% </Text>
          </View>
          <Text style={DashboardStyles.PriceTxtTop}>Total Loss</Text>
        </View>
      }

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

export default React.memo(GainValue);