import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import React, { useState, useEffect } from 'react';
import { CommisionFreeStyles } from '../CommisionFree/CommisionFreeStyle';
import { EmployeeInfoStyles } from '../EmployeeInfo/EmployeeInfoStyle';
import { AgreementStyle } from './AgreementStyle';
//import {IdentityStyles} from '../IdentityDetails/IdentityStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NetworkInfo } from 'react-native-network-info';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import CheckBox from 'react-native-check-box';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import PdfView from '../../../ReusableComponents/pdfview';
import Modal from 'react-native-modal';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

let ip: any;
const Agreement = ({ navigation, props }: any) => {

  const [Check1, setCheck1] = useState(false);
  const [isModalAgreement, setModalAgreement] = useState(false);
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [Check2, setCheck2] = useState(false);
  
  const toggleModal = () => {
    setModalAgreement(!isModalAgreement);
  };

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  const source = {
    uri: 'bundle-assets://pdf/alpacaAcctAppAgmt.pdf',
    cache: true,
  };
  // let ip: any;

  const onSubmit = async () => {

    let signed_at: any = new Date().toISOString();
    let agreements_arr = [];
    if (!Check1) {
      var errmsg = 'Please accept customer aggreement'
      seterrortext(errmsg)
      setModalCreate(true)

    } else if(!Check2){
      var errmsg = 'Please accept customer aggreement'
      seterrortext(errmsg)
      setModalCreate(true)
    }
    else {


      let agreements = {
        "agreement": "account_agreement",
        "ip_address": ip,
        "signed_at": signed_at,
      }
      let agreements1 = {
        "agreement": "customer_agreement",
        "ip_address": ip,
        "signed_at": signed_at,
      }
      let agreements2 = {
        "agreement": "margin_agreement",
        "ip_address": ip,
        "signed_at": signed_at,
      }
      agreements_arr.push(agreements);
      agreements_arr.push(agreements1);
      agreements_arr.push(agreements2);
      let bodyform: any = await AsyncStorage.getItem('data');
      let jsondata = JSON.parse(bodyform);
      let dis = { ...jsondata, "agreements": agreements_arr }
      console.log('agg obj', dis);
      AsyncStorage.setItem('data', JSON.stringify(dis));
      navigation.navigate('Document');
    }
  };
  useEffect(() => {
    NetworkInfo.getIPAddress().then(ipAddress => {
      ip = ipAddress;
      console.log('print ip', ip);
    });
  }, []);
  return (
    <View style={CommonStyles.ContainerPink}>
      <ScrollView contentContainerStyle={{
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <View style={[CommonStyles.sideSpace,  ]}>
          <View style={[CommisionFreeStyles.dotView]}>
            <View style={CommisionFreeStyles.dot} />
            <View style={CommisionFreeStyles.dot} />
            <View style={CommisionFreeStyles.dot} />
            <View
              style={[CommisionFreeStyles.dot, CommisionFreeStyles.longDash]}
            />
            <View style={CommisionFreeStyles.dot} />
            <View style={CommisionFreeStyles.dot} />
          </View>
          <Text
            style={[EmployeeInfoStyles.infoHeading,]}>
            Accept Customer Agreement
          </Text>
          <Text style={[CommonStyles.agreeTxt, CommonStyles.agreeTxtFullWidth]}>In consideration of Alpaca Securities LLC (“Alpaca”) and its agents and assigns (collectively
            “You” and/or “Your”) opening one or more accounts (“My Account(s)” or the “Account(s)”) on
            my behalf, I represent and agree with respect to all Accounts, to the terms set forth below (the
            “Agreement”). </Text>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={CommonStyles.linkText}>Read More</Text>
          </TouchableOpacity>
        </View>
        <View style={[CommonStyles.sideSpace, CommonStyles.commonBotSP]}>
          <Modal isVisible={isModalAgreement}>
            <View style={AgreementStyle.ModalView}>
              <TouchableOpacity onPress={toggleModal}>
                <View style={CommonStyles.closeBtnView}>
                  <Ionicons
                    name='close' style={CommonStyles.clodeICon}
                  />
                </View>
              </TouchableOpacity>
              <Text style={WatchListStyles.PopupHeader}>
                Accept Customer Agreement
              </Text>
              <PdfView uri={source} />
            </View>
          </Modal>
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
                <View style={[CommonStyles.btnCotainer, {marginTop: 10}]}>
                  <Text style={CommonStyles.btnTxt}>Ok</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
          <View style={CommonStyles.checkBoxOut}>
            <CheckBox
              onClick={() => setCheck1(!Check1)}
              isChecked={Check1}
              checkBoxColor={ColorSheet.$Green8}
              style={CommonStyles.checkBox}
            />
            <Text style={CommonStyles.AgreeTxt}>
              "I have read, understood, and agree to be bound by Alpaca
              Securities LLC and Wekeza, LLC account terms, and all other terms,
              disclosures and disclaimers applicable to me, as referenced in the
              Alpaca Customer Agreement. I also acknowledge that the Alpaca
              Customer Agreement contains a pre-dispute arbitration clause in
              Section 43." "Your legal entity" should be the name of the legal
              entity that signed the carrying agreement with Alpaca Securities
              LLC.
            </Text>
          </View>
          <View style={CommonStyles.checkBoxOut}>
            <CheckBox
              onClick={() => setCheck2(!Check2)}
              isChecked={Check2}
              checkBoxColor={ColorSheet.$Green8}
              style={CommonStyles.checkBox}
            />
            <Text style={CommonStyles.AgreeTxt}>
          I understand I am signing this agreement electronically, and that my electronic signature will have the same effect as physically signing and returning the Application Agreement.
          </Text>
          </View>
          <TouchableOpacity
            onPress={() => onSubmit()}
          /*disabled={!isValid} */
          >
            <View style={CommonStyles.btnCotainer}>
              <Text style={CommonStyles.btnTxt}>Next</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Agreement;
