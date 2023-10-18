import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CommonStyles } from '../../../../StyleSheet/CommonStyle';
import { makeAlpacagetRequest, post_GetAlpacaData } from '../../../../Utils/utils';
import { SummaryStyles } from '../../../OnBoardingDesign/Summary/SummaryStyle';

var Documenttype = [
  'account_statement',
];
const Holdingstab = () => {
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [holdingsdata, setholdingsdata] = useState([]);

  const [viewflag, setviewflag] = useState(false);

  const downloadfun = async () => {

    try {

      var getdocuid = await AsyncStorage.getItem('savedocid');
      let idalpca: any = await AsyncStorage.getItem('alpaca_id');

      // makeAlpacagetRequest('accounts/' + idalpca + '/documents/' + getdocuid + '/download?document_type=' + Documenttype + '')
      //   .then(async (result: any) => {
      //     setholdingsdata(result.data.holdings);
      //     setviewflag(true)
      //   })
      //   .catch(function (error) {
      //     var errmsg = JSON.stringify(error.result.data.message)
      //     seterrortext(errmsg)
      //     setModalCreate(true)
      //     console.log(error);
      //   });

      var uridata = {
        url: 'accounts/' + idalpca + '/documents/' + getdocuid + '/download?document_type=' + Documenttype + '',
      };
      let tokenidstore = await AsyncStorage.getItem('token');
      post_GetAlpacaData('alpaca/getalpacadata', uridata, tokenidstore)
        .then(async (result: any) => {
          setholdingsdata(result.data.data.holdings);
          setviewflag(true)
        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error.result.data.message.message)
          seterrortext(errmsg)
          setModalCreate(true)
        });

    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    downloadfun();
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        {(holdingsdata.length > 0 && viewflag == true) ?
          <View>
            {holdingsdata.map((key: any, index: any) => (
              <>
                <View style={CommonStyles.sideSpace} >
                  <View key={index.key} style={[CommonStyles.StockViewPort, CommonStyles.stockViewDetails]}>
                    <View style={SummaryStyles.editViewDN}>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>cost price</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.cost_price}</Text>
                      </View>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>Description</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.description}</Text>
                      </View>
                    </View>
                    <View style={SummaryStyles.editViewDN}>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>market_price</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.market_price}</Text>
                      </View>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>market_value</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.market_value}</Text>
                      </View>
                    </View>
                    <View style={SummaryStyles.editViewDN}>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>quantity</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.quantity}</Text>
                      </View>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>td_cost_basis</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.td_cost_basis}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </>
            ))}
          </View> : null}
      </View>
    </ScrollView>
  );
};

export default Holdingstab;
