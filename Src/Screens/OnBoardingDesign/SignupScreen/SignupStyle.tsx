import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

export const SignupStyles = StyleSheet.create({
  SignupTxt: {
    fontSize: 25,
    fontFamily: 'Raleway-Bold',
    letterSpacing: 1,
    color: ColorSheet.$white,
    marginBottom: 30,
    alignSelf: 'center',
  },
  marginTop: {
    marginTop: 20,
  },
  forgotBtn: {
    marginTop: 30,
    marginBottom: 70,
  },
  smallTxt: {
    color: ColorSheet.$white,
    fontSize: 15,
    fontFamily: 'Raleway-Regular',
  },

  signLink: {
    color: ColorSheet.$white,
    fontSize: 15,
    fontFamily: 'Raleway-SemiBold',
    textDecorationLine: 'underline',
  },

  bgImage: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },

  continueImg: {
    height: 190,
    width: 190,
    marginBottom: 20,
  },
});
