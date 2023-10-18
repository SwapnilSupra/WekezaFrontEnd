import { StyleSheet } from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

export const SigninStyles = StyleSheet.create({

  forgotPassTxt: {
    fontFamily: 'lato',
    fontSize: 16,
    marginBottom: 11,
    marginTop: -3,
    alignSelf: 'flex-end',
    color: ColorSheet.$white,
    height: 50,
    paddingTop: 5,
    textAlign:'right',
    width: '100%', 
  },

  paddRight: {
    paddingRight: 45,
  },
});
