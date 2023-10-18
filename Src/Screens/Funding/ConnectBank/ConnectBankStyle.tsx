import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

export const ConnectBankStyles = StyleSheet.create({
  mainTextView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainTxt: {
    fontSize: 26,
    fontFamily: 'Raleway',
    fontWeight: '700',
    color: ColorSheet.$black,
  },
  mainHead:{
    textAlign:'center',
    marginTop:35,
    marginBottom:25, 
  },
  SmallTxt: {
    fontSize: 16,
    fontFamily: 'Raleway',
    fontWeight: '500',
    color: ColorSheet.$black, 
    textAlign: 'center',
    marginBottom: 5,
    lineHeight:22,
  },
  topImg:{
    height: 280,
    width: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  plaidTxtmarg: {
    marginHorizontal: 10, 
    marginTop: 2
  },
  powerBy:{
    justifyContent: 'center',
    flexDirection:'row',
    marginBottom:30,
  },
});
