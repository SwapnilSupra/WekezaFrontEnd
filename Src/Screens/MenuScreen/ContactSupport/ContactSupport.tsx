import {Linking, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CommonStyles} from '../../../StyleSheet/CommonStyle';
import {ContactSupportStyles} from './ContactSupprtStyle';

const ContactSupport = ({navigation}: any) => {
  return (
    <ScrollView>
      <View style={CommonStyles.ContainerPink} />
      <View style={[CommonStyles.commonBotSP, CommonStyles.sideSpace]}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://files.alpaca.markets/disclosures/library/UseAndRisk.pdf ',
            );
          }}>
          <Text
            style={[ContactSupportStyles.Txt, ContactSupportStyles.topSpList]}>
            Use and Risk
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://files.alpaca.markets/disclosures/library/TermsAndConditions.pdf  ',
            );
          }}>
          <Text style={ContactSupportStyles.Txt}>Terms and Conditions </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://files.alpaca.markets/disclosures/library/PrivacyNotice.pdf  ',
            );
          }}>
          <Text style={ContactSupportStyles.Txt}>Privacy Notice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://files.alpaca.markets/disclosures/library/PFOF.pdf',
            );
          }}>
          <Text style={ContactSupportStyles.Txt}>Payment for order flow</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://files.alpaca.markets/disclosures/library/MarginDiscStmt.pdf',
            );
          }}>
          <Text style={ContactSupportStyles.Txt}>
            Margin Discount Statement
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://files.alpaca.markets/disclosures/library/ExtHrsRisk.pdf',
            );
          }}>
          <Text style={ContactSupportStyles.Txt}>
            Extended Hours Trading Risk
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://files.alpaca.markets/disclosures/library/BCPSummary.pdf',
            );
          }}>
          <Text style={ContactSupportStyles.Txt}>
            Business Continuity Plan Summary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://files.alpaca.markets/disclosures/Form+CRS.pdf',
            );
          }}>
          <Text style={ContactSupportStyles.Txt}>Form CRS</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ContactSupport;
