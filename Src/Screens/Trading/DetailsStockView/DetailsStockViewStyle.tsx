import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

export const DetailsStockViewStyles = StyleSheet.create({
  DetailsView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 1,
  },
  StockName: {
    fontSize: 16, 
    fontFamily: 'Raleway-SemiBold',
    color: ColorSheet.$black,
  },
  StockSub: {
    fontSize: 13, 
    fontFamily: 'Raleway-Medium',
    color: ColorSheet.$Gray7,
    marginTop:5,
  },
  StockTxt: {
    fontSize: 20,
    marginBottom:2,
    fontWeight: '700',
    fontFamily: 'Raleway-SemiBold',
    color: ColorSheet.$DarkGreen,
  },
  PriceTxt: {
    fontSize: 11, 
    fontFamily: 'Raleway-Medium',
    color: ColorSheet.$Gray7,
    marginRight: 5
  },
  Priceavail: {
    fontSize: 16,
    marginTop:3, 
    fontFamily: 'Raleway-Medium',
    color: ColorSheet.$black,
  },
  DetailsPrice: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'lato',
    color: ColorSheet.$black,
  },
  chart: {
    flex: 1,
    height: 400,
    width: 350,
  },
  stockData:{
    backgroundColor:ColorSheet.$white,
    paddingTop:10,
    paddingBottom:10, 
  },
  stockNameOut:{
    width:'76%', 
  },
  tabsOut:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  tabsText:{
   padding:15,
   fontFamily:'lato',
   fontWeight:'700',
   fontSize:14,
   color:ColorSheet.$Gray8,
   marginBottom:15, 
   textDecorationLine:'underline'
  },
  tabsTextActive:{
    color:ColorSheet.$DarkGreen,
  },
  currentPrice:{
    fontSize: 15, 
    fontFamily: 'lato',
    fontWeight:'700',
    marginBottom:1,
    color: ColorSheet.$DarkGreen,
  },
  currstyle: {
    flexDirection:'row',
    justifyContent: 'flex-end'
  },
  topOut:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  topInner:{
    flexDirection:'row',
    alignItems:'center'
  },
});
