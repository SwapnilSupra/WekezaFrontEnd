import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CommonStyles } from '../../../../StyleSheet/CommonStyle';
import { makeAlpacagetRequest, post_GetAlpacaData } from '../../../../Utils/utils';
import { SummaryStyles } from '../../../OnBoardingDesign/Summary/SummaryStyle';

interface depoProp {
  depositprop: any,
  holdingdtprop?: any,
  tranprop?: any
}
var Documenttype = [
  'account_statement',
];
const Deposits = (props: depoProp) => {
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [downloaddata, setdownloaddata] = useState([]);
  const [viewflag, setviewflag] = useState(false);

  const downloadfun = async () => {

    try {

      var getdocuid = await AsyncStorage.getItem('savedocid');
      let idalpca: any = await AsyncStorage.getItem('alpaca_id');

      // makeAlpacagetRequest('accounts/' + idalpca + '/documents/' + getdocuid + '/download?document_type=' + Documenttype + '')
      //   .then(async (result: any) => {
      //     setdownloaddata(result.data.deposits_and_withdrawals);
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
          setdownloaddata(result.data.data.deposits_and_withdrawals);
          setviewflag(true)
        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error.result.data.message)
          seterrortext(errmsg)
          setModalCreate(true)
        });


    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log('hello')
    downloadfun();
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        {(downloaddata.length > 0 && viewflag == true) ?
          <View>
            {downloaddata.map((key: any, index: any) => (
              <>
                <View style={CommonStyles.sideSpace} >
                  <View key={index.key} style={[CommonStyles.StockViewPort, CommonStyles.stockViewDetails]}>
                    <View style={SummaryStyles.editViewDN}>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>Account no.</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.account_no}</Text>
                      </View>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>Description</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.description}</Text>
                      </View>
                    </View>
                    <View style={SummaryStyles.editViewDN}>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>Entry type</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.entry_type}</Text>
                      </View>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>Net amount</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.net_amount}</Text>
                      </View>
                    </View>
                    <View style={SummaryStyles.editViewDN}>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>System date</Text>
                        <Text style={SummaryStyles.mainTxtDN}>{key.system_date}</Text>
                      </View>
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

export default Deposits;
