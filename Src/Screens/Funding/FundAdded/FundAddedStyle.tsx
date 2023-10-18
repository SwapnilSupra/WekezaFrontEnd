import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

export const FundAddedStyles = StyleSheet.create({
  Money: {
    fontSize: 35,
    fontWeight: '600', 
    color: ColorSheet.$DarkGreen,
    marginTop: 20,
  },
  smallTxt: {
    fontSize: 13,
    fontWeight: '300',
    fontFamily: 'Raleway',
    color: ColorSheet.$Gray6, 
    marginHorizontal: 30,
    textAlign: 'center',
    lineHeight:22,
  },
  smallTxtWithDraw: {
    fontSize: 13,
    fontWeight: '300',
    fontFamily: 'Raleway',
    color: ColorSheet.$Gray6, 
    marginHorizontal: 30,
    textAlign: 'center',
    lineHeight:22,
    marginTop:30
  },
});
