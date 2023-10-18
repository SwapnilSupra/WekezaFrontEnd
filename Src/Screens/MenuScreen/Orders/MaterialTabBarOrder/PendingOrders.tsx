import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../../../../StyleSheet/CommonStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAlpacagetRequest, post_GetAlpacaData } from '../../../../Utils/utils';

const PendingOrders = ({ navigation }: any) => {

  const [getOrder, setOrder] = useState([]);

  const onLoadfun = async () => {

    let savealpcaid: any = await AsyncStorage.getItem('alpaca_id');

    try {

      // makeAlpacagetRequest('trading/accounts/' + savealpcaid + '/orders')
      //   .then(async (result: any) => {
      //     console.log(result.data);
      //     setOrder(result.data);
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
        url: 'trading/accounts/' + savealpcaid + '/orders',
      };
      let tokenidstore = await AsyncStorage.getItem('token');
      post_GetAlpacaData('alpaca/getalpacadata', uridata, tokenidstore)
        .then(async (result: any) => {
          setOrder(result.data.data);
        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error.response.data.message.message)
          console.log(errmsg)
        });
    } catch (e) {
      console.log(e);
    }
  }

  const displayContent = (key: any, index: any) => {

    return (
      <View style={[CommonStyles.sideSpace, CommonStyles.ContainerPink]} key={key.client_order_id}>
        <View style={[CommonStyles.StockViewPort, CommonStyles.stockViewDetails]}>
          <View style={CommonStyles.cardHead}>
            <View>
              <Text style={CommonStyles.stockName}>{key.symbol} </Text>
              {/* <Text style={CommonStyles.StockCode}>{key.symbol}</Text> */}
            </View>
          </View>
          <View style={CommonStyles.dividersm} />
          <View style={CommonStyles.StockDetails}>
            <View style={CommonStyles.halfMiniBox}>
              <Text style={CommonStyles.StckPrice}>{key.order_type}</Text>
              <Text style={CommonStyles.StckPriceTxt}>Order</Text>
            </View>
            <View style={CommonStyles.halfMiniBox}>
              <Text style={CommonStyles.StckPrice}>{key.side}</Text>
              <Text style={CommonStyles.StckPriceTxt}>Side</Text>
            </View>
            <View style={CommonStyles.halfBoxRight}>
              <Text style={CommonStyles.StckPrice}>{key.status}</Text>
              <Text style={CommonStyles.StckPriceTxt}>status</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  const orderList = getOrder.map((key, index) => {
    return displayContent(key, index);
  });

  useEffect(() => {
    onLoadfun();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {orderList}
    </ScrollView>
  );
};

export default PendingOrders;
