import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

export const AddFundStyles = StyleSheet.create({
  addmonyBx:{
   width:'25%',
  },
  Moneyadd: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$Gray9,
    paddingVertical:22, 
    textAlign:'center'
  },
  MoneyaddSelected:{
    backgroundColor:'#eafef0',
    color: ColorSheet.$DarkGreen,
  },
  Moneyadded:{
    fontSize: 21,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$DarkGreen,
    marginBottom:6,
  },
  MoneyView: {
    flexDirection: 'row',
    backgroundColor: ColorSheet.$white,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 2,
    marginTop:5,
    overflow:'hidden'
  },
  BalanceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 0,
    marginBottom:35,
  },
  BalanceViewWithdraw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    marginBottom:20,
  },
  plaidCheckView: {
    backgroundColor: 'rgba(0, 114, 38, 0.05)',
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '55%',
  },
  BalanceTxt: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Lato',
    color: ColorSheet.$black,
  },
  plaidCheckTxt: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Lato',
    color: ColorSheet.$black,
  },
  ChangeTxt: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$DarkGreen,
    paddingTop:7,
  },
  VerticalDivider: {
    height: '100%',
    width: 1,
    backgroundColor: ColorSheet.$GrayBorder,
  },
});
