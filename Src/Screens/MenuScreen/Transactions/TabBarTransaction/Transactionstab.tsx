import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CommonStyles } from '../../../../StyleSheet/CommonStyle';
import { makeAlpacagetRequest, post_GetAlpacaData } from '../../../../Utils/utils';
import { SummaryStyles } from '../../../OnBoardingDesign/Summary/SummaryStyle';

var Documenttype = [
  'account_statement',
];
const Transactionstab = () => {
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [transactionsdata, settransactionsdata] = useState([]);
  const [viewflag, setviewflag] = useState(false);

  const downloadfun = async () => {

    try {

      var getdocuid = await AsyncStorage.getItem('savedocid');
      let idalpca: any = await AsyncStorage.getItem('alpaca_id');

      // makeAlpacagetRequest('accounts/' + idalpca + '/documents/' + getdocuid + '/download?document_type=' + Documenttype + '')
      //   .then(async (result: any) => {
      //     settransactionsdata(result.data.transactions);
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
          settransactionsdata(result.data.transactions);
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
        {(transactionsdata.length > 0 && viewflag == true) ?
          <View>
            {transactionsdata.map((key: any, index: any) => (
              <>
                <View style={CommonStyles.sideSpace} >
                  <View key={index.key} style={[CommonStyles.StockViewPort, CommonStyles.stockViewDetails]}>
                    <View style={SummaryStyles.editViewDN}>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>Amount</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.amount}</Text>
                      </View>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>Commission</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.commission}</Text>
                      </View>
                    </View>
                    <View style={SummaryStyles.editViewDN}>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>Entry type</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.entry_type}</Text>
                      </View>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>Price</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.price}</Text>
                      </View>
                    </View>
                    <View style={SummaryStyles.editViewDN}>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>Quantity</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.quantity}</Text>
                      </View>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>Side</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.side}</Text>
                      </View>
                    </View>
                    <View style={SummaryStyles.editViewDN}>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>Trade date</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.trade_date}</Text>
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

export default Transactionstab;
