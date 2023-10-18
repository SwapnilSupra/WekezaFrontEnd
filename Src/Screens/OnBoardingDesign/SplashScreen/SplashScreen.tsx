import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { SplashStyles } from './SplashStyle';
import { SignupStyles } from '../SignupScreen/SignupStyle';
import ImagesAll from '../../../StyleSheet/ImagesAll';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';

const SplashScreen = ({ navigation }: any) => {

  return (

    <View style={CommonStyles.ContainerWhite}>
      <ImageBackground
        source={ImagesAll.BGImage}
        resizeMode="cover"
        style={SplashStyles.bgImage}>
        <Text style={SplashStyles.wekezaversion}>V-02</Text>
        <View style={SplashStyles.SplashTxtOut}>
          <Text style={SplashStyles.SplashTxt}>
            Hello,{' '}
            <Image
              style={SplashStyles.handImg}
              resizeMode="contain"
              source={ImagesAll.hand}
            />{'\n'}
            Let’s start{'\n'}Investing!
          </Text>
          <Image
            source={ImagesAll.whitelogo}
            style={[CommonStyles.logoImg, CommonStyles.imgMargingleft]}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <View style={[CommonStyles.btnDarkGreen, SignupStyles.marginTop]}>
              <Text style={CommonStyles.btnTxt}>Get Started</Text>
            </View>
          </TouchableOpacity>

          <View style={CommonStyles.dontAccount}>
            <Text style={SignupStyles.smallTxt}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text
                style={SignupStyles.signLink}
                onPress={() => {
                  navigation.navigate('Signup');
                }}>
                {' '}
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;
