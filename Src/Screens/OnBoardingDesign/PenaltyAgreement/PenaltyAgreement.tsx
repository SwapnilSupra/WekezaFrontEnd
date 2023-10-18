import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {CommonStyles} from '../../../StyleSheet/CommonStyle';
import CheckBox from 'react-native-check-box';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import {CommisionFreeStyles} from '../CommisionFree/CommisionFreeStyle';
import {EmployeeInfoStyles} from '../EmployeeInfo/EmployeeInfoStyle';
import {PenaltyAgreeStyles} from './PenaltyAgreementStyle';
import Octicons from 'react-native-vector-icons/Octicons';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

const PenaltyAgreement = ({navigation}: any) => {
  const [Check1, setCheck1] = useState(false);
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };
  
  const onSubmit = async () => {

    if (Check1) {
      navigation.navigate('IdentityDetails')
    } else {
      var errmsg = 'Please select penalty aggreement'
          seterrortext(errmsg)
          setModalCreate(true)
    }
  };

  return ( <ScrollView >
    <View style={[CommonStyles.ContainerPink, CommonStyles.sideSpace]}>
     
        <View style={[CommisionFreeStyles.dotView]}>
          <View
            style={[CommisionFreeStyles.dot, CommisionFreeStyles.longDash]}
          />
          <View style={CommisionFreeStyles.dot} />
          <View style={CommisionFreeStyles.dot} />
          <View style={CommisionFreeStyles.dot} />
          <View style={CommisionFreeStyles.dot} />
          <View style={CommisionFreeStyles.dot} />
        </View>
        <Text
          style={[EmployeeInfoStyles.infoTxt, EmployeeInfoStyles.marginBot]}>
          Penalty Agreement
        </Text>
        <Text style={CommonStyles.agreeTxt}>
          Under penalties of perjury, I declare that I have examined the
          information on this form and to the best of my knowledge and belief it
          is true, correct, and complete. I further certify under penalties of
          perjury that:
        </Text>
        <View style={PenaltyAgreeStyles.pointOut}>
          <Octicons
            name="dot-fill"
            style={PenaltyAgreeStyles.dotBullet}
          />
          <Text style={CommonStyles.agreeTxt}>
            I am the individual that is the beneficial owner (or am authorized
            to sign for the individual that is the beneficial owner) of all the
            income or proceeds to which this form relates or am using this form
            to document myself for chapter 4 purposes;
          </Text>
        </View>
        <View>
          <View style={PenaltyAgreeStyles.pointOut}>
          <Octicons
            name="dot-fill"
            style={PenaltyAgreeStyles.dotBullet}
          />
            <Text style={CommonStyles.agreeTxt}>
              The person named on line 1 of this form is not a U.S. person;
            </Text>
          </View>
          <View style={PenaltyAgreeStyles.pointOut}>
          <Octicons
            name="dot-fill"
            style={PenaltyAgreeStyles.dotBullet}
          />
            <Text style={CommonStyles.agreeTxt}>
              This form relates to: {'\n'}(a) income not effectively connected
              with the conduct of a trade or business in the United States;
              {'\n'}(b) income effectively connected with the conduct of a trade
              or business in the United States but is not subject to tax under
              an applicable income tax treaty;
              {'\n'}(c) the partner’s share of a partnership’s effectively
              connected taxable income; or
              {'\n'}(d) the partner’s amount realized from the transfer of a
              partnership interest subject to withholding under section 1446(f);
            </Text>
          </View>
          <View style={PenaltyAgreeStyles.pointOut}>
          <Octicons
            name="dot-fill"
            style={PenaltyAgreeStyles.dotBullet}
          />
            <Text style={CommonStyles.agreeTxt}>
              The person named on line 1 of this form is a resident of the
              treaty country listed on line 9 of the form (if any) within the
              meaning of the income tax treaty between the United States and
              that country; and
            </Text>
          </View>
          <View style={PenaltyAgreeStyles.pointOut}>
          <Octicons
            name="dot-fill"
            style={PenaltyAgreeStyles.dotBullet}
          />
            <Text style={CommonStyles.agreeTxt}>
              For broker transactions or barter exchanges, The beneficial owner
              is an exempt foreign person as defined in the instructions.
            </Text>
          </View>
        </View>
        <Text style={CommonStyles.agreeTxt}>
          Furthermore, I authorize this form to be provided to any withholding
          agent that has control, receipt, or custody of the income of which I
          am the beneficial owner or any withholding agent that can disburse or
          make payments of the income of which I am the beneficial owner. I
          agree that I will submit a new form within 30 days if any
          certification made on this form becomes incorrect.
        </Text>
        <View style={CommonStyles.checkBoxOut}>
          <CheckBox
            onClick={() => setCheck1(!Check1)}
            isChecked={Check1}
            checkBoxColor={ColorSheet.$Green8}
            style={CommonStyles.checkBox}  
          />
          <Text style={CommonStyles.AgreeTxt}>
            "I have read, understood, and agree to be bound by Alpaca Securities
            LLC and Wekeza, LLC account terms, and all other terms, disclosures
            and disclaimers applicable to me, as referenced in the Alpaca
            Customer Agreement. I also acknowledge that the Alpaca Customer
            Agreement contains a pre-dispute arbitration clause in Section 42."
            {'\n'}"Your legal entity" should be the name of the legal entity
            that signed the carrying agreement with Alpaca Securities LLC."
          </Text>
        </View>
        <View style={[CommonStyles.commonBotSP]}>
        <TouchableOpacity
        onPress={() => onSubmit()}
         >
          <View style={CommonStyles.btnCotainer}>
            <Text style={CommonStyles.btnTxt}>Next</Text>
          </View>
        </TouchableOpacity>
        </View>
      
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
                <View style={[CommonStyles.btnCotainer, {marginTop: 10}]}>
                  <Text style={CommonStyles.btnTxt}>Ok</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </ScrollView>
  );
};

export default PenaltyAgreement;
