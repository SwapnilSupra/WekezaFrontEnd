import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ImagesAll from '../../../StyleSheet/ImagesAll';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import { CommisionFreeStyles } from '../CommisionFree/CommisionFreeStyle';
import { FewQueStyles } from '../FewQue/FewQueStyle';
import { SuccessStyles } from './SuccessStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Success = ({ navigation }: any) => {

  const [id, setId] = useState('');
  const [account, setAccount] = useState('');
  const [status, setStatus] = useState('');

  const onLoadfun = async () => {
    let idget:any = await AsyncStorage.getItem('alpaca_id');
    let accget:any = await AsyncStorage.getItem('storeAccnoset');
    let statusget:any = await AsyncStorage.getItem('storeStatusset');
    setId(idget);
    setStatus(statusget);
    setAccount(accget)
  }

  useEffect(() => {
    onLoadfun();
  }, []);

  return (
    <View style={[CommonStyles.ContainerWhite, CommonStyles.centerContainer]}>
      <Image source={ImagesAll.Frame4} style={SuccessStyles.vertSpaceTop} />
      <Text style={[CommisionFreeStyles.mainTxt]}>Congratulations!</Text>
      <Text style={[FewQueStyles.helpText, { marginBottom: 5 }]}>
        Your brokerage application is received. We are processing it now.
      </Text>
      <Text style={[FewQueStyles.helpText, { marginBottom: 30 }]}>
        My Profile reflect your account status.
      </Text>
      <View style={SuccessStyles.idMainView}>
        <View style={SuccessStyles.idView}>
          <Text style={SuccessStyles.accountId}>Account Id</Text>
          <Text style={SuccessStyles.accountName}>{account}</Text>
        </View>
        <View style={[SuccessStyles.idView]}>
          <Text style={SuccessStyles.accountId}>Status</Text>
          <Text style={SuccessStyles.accountNameGrey}>{status
          }</Text>
        </View>
      </View>
      <View style={CommonStyles.sideSpace}>
        <TouchableOpacity onPress={() => navigation.navigate('bottomTab',{screen:'DashboardStack'})}>
          <View style={[CommonStyles.btnCotainer, { marginTop: 20 }]}>
            <Text style={CommonStyles.btnTxt}>Go To Dashboard</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={[SuccessStyles.link, SuccessStyles.vertSpaceBottom]}>
            My Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Success;
