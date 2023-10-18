import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import { AccontLinkedStyles } from './AccountLinkedStyle';
import ImagesAll from '../../../StyleSheet/ImagesAll';
import { ConnectBankStyles } from '../ConnectBank/ConnectBankStyle';
import { CommisionFreeStyles } from '../../OnBoardingDesign/CommisionFree/CommisionFreeStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makePostRequest } from '../../../Utils/utils';

const AccountLinked = ({ navigation }: any) => {

  const onSubmit = async () => {

    let token = await AsyncStorage.getItem('access_token');
    try {
      
      var accesstoken = {
        access_token: token,
      };

      makePostRequest('auth/getPlaidaccount', accesstoken)
        .then(async (result: any) => {
          AsyncStorage.setItem('bankaccount', result.data.data.numbers.ach[0].account);
          AsyncStorage.setItem('bankrouting', result.data.data.numbers.ach[0].routing);
          AsyncStorage.setItem('bankname', result.data.data.accounts[0].name);
          AsyncStorage.setItem('accounttype', result.data.data.accounts[0].subtype);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <View style={[CommonStyles.ContainerWhite, AccontLinkedStyles.center]}>
      <Image source={ImagesAll.Frame4} />
      <View style={[CommonStyles.sideSpace, CommonStyles.commonBotSP]}>
        <Text style={[CommisionFreeStyles.mainTxt, ConnectBankStyles.mainHead]}>
          Your Account is {'\n'} Linked
        </Text>
        <Text style={ConnectBankStyles.SmallTxt}>
          Now you can go fund your Account to begin trading!
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('ACHRelationship')}>
          <View style={[CommonStyles.btnCotainer, { marginTop: 30 }]}>
            <Text style={CommonStyles.btnTxt}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountLinked;
