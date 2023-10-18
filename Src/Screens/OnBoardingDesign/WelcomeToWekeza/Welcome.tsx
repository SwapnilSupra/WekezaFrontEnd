import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import ImagesAll from '../../../StyleSheet/ImagesAll';
import { SignupStyles } from '../SignupScreen/SignupStyle';
import { FewQueStyles } from '../FewQue/FewQueStyle';

export default function Welcome({ navigation }: any) {

  return (
    <View style={[CommonStyles.ContainerWhite]}>
      <ImageBackground
        source={ImagesAll.BGLogin}
        style={[SignupStyles.bgImage, CommonStyles.centerContainer]}>
        <Image source={ImagesAll.Frame5} style={SignupStyles.continueImg} />
        <View style={CommonStyles.sideSpace}>
          <Text style={[SignupStyles.SignupTxt, { marginBottom: 17 }]}>
            Continue To Create Brokerage Account
          </Text>
          <Text style={[FewQueStyles.contuneSub]}>
            Register your brokerage account seamlessly.
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PenaltyAgreement');
            }}>
            <View style={[CommonStyles.lightbtnCotainer]}>
              <Text style={CommonStyles.btnTxt}>Continue</Text>
            </View>
          </TouchableOpacity>
          <View style={CommonStyles.dontAccount}>
            <TouchableOpacity onPress={() => navigation.navigate('bottomTab')}>
              <Text style={SignupStyles.signLink}>Skip for Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
