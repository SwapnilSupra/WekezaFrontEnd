import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../../../../StyleSheet/CommonStyle';
import ColorSheet from '../../../../StyleSheet/ColorSheet';
import { makeAlpacagetRequest, post_GetAlpacaData } from '../../../../Utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';


const Positions = ({ navigation }: any) => {

  const [getPosition, setPosition] = useState([]);

  const onLoadfun = async () => {

    let savealpcaid: any = await AsyncStorage.getItem('alpaca_id');

    try {

      // makeAlpacagetRequest('trading/accounts/' + savealpcaid + '/positions')
      //   .then(async (result: any) => {
      //     setPosition(result.data.sort(sortbyascename));
      //   })
      //   .catch(function (error) {
      //     Alert.alert(
      //       'Error',
      //       JSON.stringify(error.response.data.message),
      //       [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      //       { cancelable: false },
      //     );
      //   });
      var uridata = {
        url: 'trading/accounts/' + savealpcaid + '/positions',
      };
      let tokenidstore = await AsyncStorage.getItem('token');
      post_GetAlpacaData('alpaca/getalpacadata', uridata, tokenidstore)
        .then(async (result: any) => {
          console.log(result.data.data)
          setPosition(result.data.data.sort(sortbyascename));
        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error.response.data.message.message)
          console.log(errmsg)
        });
    } catch (e) {
      console.log(e);
    }
  }

  function sortbyascename(a: any, b: any) {
    if (a.symbol < b.symbol) {
      return -1;
    }
    if (a.symbol > b.symbol) {
      return 1;
    }
    return 0;
  }

  const displayContent = (key: any, index: any) => {

    return (
      <View style={CommonStyles.sideSpace} key={index}>
        <View style={[CommonStyles.StockViewPort, CommonStyles.stockViewDetails]}>
          <View style={CommonStyles.cardHead}>
            <View style={CommonStyles.halfBox}>
              {/* <Text style={CommonStyles.stockName}>{key.exchange} </Text> */}
              <Text style={CommonStyles.StockCode}>{key.symbol}</Text>
              <Text style={CommonStyles.StockCode}>{key.exchange}</Text>
            </View>
            <View style={CommonStyles.halfBox}>
              <Text style={[CommonStyles.StckPrice,]}>{key.qty}</Text>
              <Text style={CommonStyles.StckPriceTxt}>Quantity</Text>
            </View>
          </View>
          <View style={CommonStyles.dividersm} />
          <View style={CommonStyles.StockDetails}>
            {(key.unrealized_pl > 0) ?
              <View style={CommonStyles.halfBox}>
                <View style={CommonStyles.flexRowNew}>
                  <Text style={[CommonStyles.StckPrice, , CommonStyles.profitText]}>{Number(key.unrealized_pl).toFixed(2)} </Text>
                  <AntDesign name='arrowup' color={ColorSheet.$DarkGreen} size={15} />
                </View>
                <Text style={CommonStyles.StckPriceTxt}>Unrealized Pl </Text>
              </View> :
              <View style={CommonStyles.halfBox}>
                <View style={CommonStyles.flexRowNew}>
                  <Text style={[CommonStyles.StckPrice, CommonStyles.lossText]}>{Number(key.unrealized_pl).toFixed(2)} </Text>
                  <AntDesign name='arrowdown' color={ColorSheet.$RedBtn} size={15} />
                </View>
                <Text style={CommonStyles.StckPriceTxt}>Unrealized Pl </Text>
              </View>
            }
            {(key.market_value > 0) ?
              <View style={CommonStyles.halfBoxRight}>
                <Text style={[CommonStyles.StckPrice, CommonStyles.profitText]}>{Number(key.market_value).toFixed(2)}</Text>
                <Text style={[CommonStyles.StckPriceTxt]}>Market Value</Text>
              </View> :
              <View style={CommonStyles.halfBoxRight}>
                <Text style={[CommonStyles.StckPrice, CommonStyles.lossText]}>{Number(key.market_value).toFixed(2)}</Text>
                <Text style={[CommonStyles.StckPriceTxt]}>Market Value</Text>
              </View>
            }

          </View>
          <View style={CommonStyles.StockDetails}>
            {(key.cost_basis > 0) ?
              <View style={CommonStyles.halfMiniBox}>
                <Text style={[CommonStyles.StckPrice, CommonStyles.profitText]}>{Number(key.cost_basis).toFixed(2)}</Text>
                <Text style={CommonStyles.StckPriceTxt}>Cost Basis</Text>
              </View> :
              <View style={CommonStyles.halfMiniBox}>
                <Text style={[CommonStyles.StckPrice, CommonStyles.lossText]}>{Number(key.cost_basis).toFixed(2)}</Text>
                <Text style={CommonStyles.StckPriceTxt}>Cost Basis</Text>
              </View>
            }
            {(key.current_price > 0) ?
              <View style={CommonStyles.halfMiniBox}>
                <Text style={[CommonStyles.StckPrice, CommonStyles.profitText]}>{Number(key.current_price).toFixed(2)}</Text>
                <Text style={CommonStyles.StckPriceTxt}>Current Price</Text>
              </View> :
              <View style={CommonStyles.halfMiniBox}>
                <Text style={[CommonStyles.StckPrice, CommonStyles.lossText]}>{Number(key.current_price).toFixed(2)}</Text>
                <Text style={CommonStyles.StckPriceTxt}>Current Price</Text>
              </View>
            }
            {(key.lastday_price > 0) ?
              <View style={CommonStyles.halfBoxRight}>
                <Text style={[CommonStyles.StckPrice, , CommonStyles.profitText]}>{Number(key.lastday_price).toFixed(2)}</Text>
                <Text style={[CommonStyles.StckPriceTxt,]}>Lastday Price</Text>
              </View> :
              <View style={CommonStyles.halfBoxRight}>
                <Text style={[CommonStyles.StckPrice, CommonStyles.lossText]}>{Number(key.lastday_price).toFixed(2)}</Text>
                <Text style={[CommonStyles.StckPriceTxt,]}>Lastday Price</Text>
              </View>
            }
          </View>
        </View>
      </View>
    );
  }


  const positionList = getPosition.map((key, index) => {
    return displayContent(key, index);
  });

  useEffect(() => {

    onLoadfun();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {positionList}
    </ScrollView>
  );
};

export default Positions;

const styles = StyleSheet.create({});
