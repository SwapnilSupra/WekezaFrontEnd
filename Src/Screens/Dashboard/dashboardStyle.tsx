import { StyleSheet } from 'react-native';
import ColorSheet from '../../StyleSheet/ColorSheet';

export const DashboardStyles = StyleSheet.create({
  topSearchView: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10,
    justifyContent: 'center',
  },

  dashTxt: {
    fontSize: 22,
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$white,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  UserImage: {
    height: 47,
    width: 47,
    borderRadius: 30,
  },
  hi: {
    fontSize: 14,
    fontFamily: 'Raleway-Regular',
    color: ColorSheet.$white,
    marginRight: 7,
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$white,
  },
  greenUserView: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center'
  },
  checkUser: {
    marginRight: 2,
    alignSelf: 'center',
  },
  statusPro: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$white,
  },
  userNameGreen: {
    fontSize: 14,
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$white,
  },
  statusBox: {
    flexDirection: 'row'
  },
  accNo: {
    fontSize: 14,
    fontFamily: 'Lato',
    color: ColorSheet.$white,
    marginRight: 10,
  },
  DollarValue: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$black,
  },
  rowLine: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  PriceTxt: {
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
    color: ColorSheet.$Gray8,
    marginTop: 4,
  },

  DollarValueTop: {
    fontSize: 11.5,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$black,
  },
  arrowSP: {
    paddingRight: 10,
  },
  PriceTxtTop: {
    fontSize: 11,
    fontFamily: 'Raleway-Medium',
    color: ColorSheet.$Gray8,
    marginTop: 4,
    paddingBottom: 1,
  },

  tradeValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 17,
    paddingVertical: 5,
  },
  bgCashOut: {
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'column',
    position: 'relative',
  },
  BgCash: {
    flexDirection: 'column',
    padding: 12,
    justifyContent: 'flex-start',
    position: 'relative',
  },
  CashImgView: {
    backgroundColor: ColorSheet.$white,
    height: 45,
    width: 45,
    borderRadius: 35,
    position: 'absolute',
    left: 13,
    top: 13,
  },
  CashImg: {
    height: 45,
    width: 45,
  },
  flexCol: {
    flexDirection: 'column',
    paddingLeft: 58,
    justifyContent: 'space-between',
    width: '100%',
  },
  moneyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  CashTxt: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$white,
  },
  plusAddView: {
    flexDirection: 'row',
    backgroundColor: ColorSheet.$white,
    borderRadius: 20,
    height: 26,
    paddingLeft: 2,
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  plusView: {
    backgroundColor: ColorSheet.$Green7,
    borderRadius: 22,
    height: 22,
    width: 22,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  plus: {
    fontSize: 20,
    fontWeight: '700',
    color: ColorSheet.$white,
  },
  plusViewGr: {
    backgroundColor: ColorSheet.$white,
    borderRadius: 22,
    height: 22,
    width: 22,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  plusGr: {
    fontSize: 20,
    fontWeight: '700',
    color: ColorSheet.$DarkGreen,
  },
  addMoneyTxt: {
    fontSize: 11,
    fontFamily: 'Lato',
    fontWeight: '700',
    color: ColorSheet.$Green7,
    marginLeft: 5,
  },
  addMoneyTxtGr: {
    fontSize: 12,
    fontFamily: 'Lato',
    fontWeight: '700',
    color: ColorSheet.$white,
    marginLeft: 6,
    marginRight: 7,
    marginTop: -1,
  },
  labelCash: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Raleway-Medium',
    color: ColorSheet.$white,
    marginTop: -3,
  },
  lastFunding: {
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
    color: ColorSheet.$white,
    marginTop: 5,
  },
  lastFundingStatus: {
    fontFamily: 'Lato',
    fontWeight: '700',
  },
  portfolioView: {
    width: 115,
    borderRadius: 8,
    marginTop: 15,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  portfolioBott: {
    backgroundColor: ColorSheet.$geyBg,
    width: '100%',
    flexDirection: 'column',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    elevation: 3,
    marginBottom: 3,
    paddingVertical: 12,
  },
  greyBox: {
    backgroundColor: ColorSheet.$Gray1,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    marginTop: 0,
  },
  BoxHeading: {
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$black,
    marginTop: 17,
  },
  BoxHeadingSub: {
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$DarkGreen,
    marginTop: 11,
  },
  stockBg: {
    width: '100%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    paddingVertical: 9,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  stockBgLeftsp: {
    marginLeft: 9,
  },
  stockTxt: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$white,

  },
  qtyTxt: {
    fontSize: 9,
    fontWeight: '400',
    fontFamily: 'Lato',
    color: ColorSheet.$white,
    marginRight: 4,
  },
  qtyValue: {
    fontSize: 9,
    fontWeight: '600',
    fontFamily: 'Lato',
    color: ColorSheet.$white,
  },
  stockPrice: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$black,
    marginTop: 10,
    marginBottom: 2,
  },
  portTileInnProfit: {
    padding: 7,
    borderRadius: 5,
    width: '78%',
    fontSize: 13,
    backgroundColor: ColorSheet.$DarkGreen,
    color: ColorSheet.$white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  portTileInnLoss: {
    padding: 7,
    borderRadius: 5,
    width: '78%',
    fontSize: 13,
    backgroundColor: ColorSheet.$RedBtn,
    color: ColorSheet.$white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stockUpDown: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$white,
    alignSelf: 'center',
  },
  MarketViewOut: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  portValOut: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'column',

  },
  linkBankTxt: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$black,
  },
  linkBankTxtTopSP: {
    marginTop: 10,
  },
  MarketView: {
    borderRadius: 8,
    marginTop: 15,
    marginBottom: 3,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorSheet.$white,
    paddingVertical: 17,
    paddingHorizontal: 15,
    elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: {width: -2, height: 4},
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
  },
  namePropic: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
    height: 50
  },
  userLeft: {
    position: 'absolute',
  },
  userRight: {
    paddingLeft: 60,
    width: '100%'
  },
  welcomName: {
    flexDirection: 'row',
  },
  tradeTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: ColorSheet.$black,
    marginVertical: 12,
  },
  plusMinusValue: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$Green6,
    marginVertical: 8,
  },
  shareValue: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$black,
  },
  marketOpen:{
   backgroundColor:ColorSheet.$Green6,
   color:ColorSheet.$white,
   display:'flex',
   borderRadius:10,
   paddingHorizontal:12,
   paddingVertical:4,
   fontSize:10,
   marginTop:15,
   marginBottom:-4,
   fontFamily: 'Raleway-SemiBold',
  },
  marketClose:{
    backgroundColor:ColorSheet.$RedBtn,
   },
  newsWrapper:{
   paddingHorizontal:15,
   width:'100%'
  },
  newsWrapperOut: {
    backgroundColor: ColorSheet.$white,
    paddingBottom: 20,
  },
  newsMainTxtOut: {
    padding: 15,
    borderRadius: 8,
    width: 340,
    marginRight: 15,
    overflow: 'hidden'
  },
  newsMainTxt: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$black,
    flexWrap: 'wrap',
  },
  newsHeadingTxt: {
    fontSize: 19,
    fontWeight: '600',
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$black,
    flexWrap: 'wrap',
    marginBottom: 8
  },
  newsSmallTxt: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Lato',
    color: ColorSheet.$black,
    marginVertical: 5,
  },
  readMore: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$DarkGreen,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: ColorSheet.$DarkGreen,
  },
  watchListView: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  watchListViewNew: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  newWatchlist: {
    marginBottom: 5,
    marginTop: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: -5,
    marginRight: -5
  },
  newWatchlistInn: {
    width: '33.33%',
    padding: 5
  },
  newWatchBox: {
    backgroundColor: ColorSheet.$white,
    paddingHorizontal: 6,
    paddingTop: 9,
    paddingBottom: 10,
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderWidth: 2,
    borderColor: ColorSheet.$white,
  },
  newWatchBoxSelected: {
    elevation: 10,
    borderWidth: 2,
    borderColor: ColorSheet.$DarkGreen,
  },
  newWatchSymbol: {
    fontFamily: 'Raleway-SemiBold',
    marginBottom: 10,
    marginTop: 10,
    letterSpacing: 1,
    fontSize: 14,
  },
  newWatchValue: {
    padding: 5,
    borderRadius: 5,
    width: '80%',
    textAlign: 'center',
    fontSize: 13,
    backgroundColor: ColorSheet.$DarkGreen,
    color: ColorSheet.$white,
    height: 30,
  },
  minusValue: {
    backgroundColor: ColorSheet.$RedBtn,
  },

  newWatchNoValue: {
    backgroundColor: ColorSheet.$white,
    color: ColorSheet.$white,
    height: 30,
  },
  wishlistTxt: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$black,
  },
  wishlistTxtSP: {
    marginBottom: 15,
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: ColorSheet.$DarkGreen,
    padding: 2,
    borderRadius: 20,
    height: 26,
    paddingLeft: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 16,
  },
  educationVIew: {
    paddingVertical: 17,
    paddingHorizontal: 15,
  },
  plusbtnView: {
    height: 22,
    width: 22,
    borderRadius: 20,
    backgroundColor: ColorSheet.$white,
    alignItems: 'center',
  },
  plusTxt: {
    fontSize: 15,
    fontWeight: '700',
    color: ColorSheet.$DarkGreen,
  },
  addTxt: {
    fontSize: 12,
    fontWeight: '700',
    color: ColorSheet.$white,
    marginRight: 10,
    marginTop: 2,
    marginLeft: 3,
  },
  wishListAddView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  watchTxt: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Raleway-SemiBold',
    color: ColorSheet.$DarkGreen,
  },
  barLineRed: {
    borderLeftWidth: 4,
    borderLeftColor: ColorSheet.$RedBtn,
    paddingLeft: 7,
  },
  barLineGreen: {
    borderLeftWidth: 4,
    borderLeftColor: ColorSheet.$DarkGreen,
    paddingLeft: 7,
  },
  stockNo: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Lato',
    color: ColorSheet.$Gray6,
    marginTop: 5,
  },
  WishListView: {
    backgroundColor: ColorSheet.$white,
    borderWidth: 1,
    borderColor: ColorSheet.$Green5,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 14,
    marginRight: 10,
    // elevation: 2,
  },
  EduVideoTxt: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$black,
    marginLeft: 10,
  },
  VideoDescription: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Lato',
    color: ColorSheet.$Gray6,
    marginTop: 7,
  },
  videoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TrandinStockView: {
    flexDirection: 'row',
    backgroundColor: ColorSheet.$white,
    borderRadius: 12,
    padding: 15,
    margin: 5,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TrandinStockName: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Raleway',
    color: ColorSheet.$black,
  },
  exchageTxt: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Lato',
    color: ColorSheet.$Gray4,
  },
  Percent: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$Errorred,
  },
  TrandingPriceTxt: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$black,
  },
  plusMinusPercent: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Lato',
    color: ColorSheet.$black,
  },
  linkAcc: {
    marginTop: 15,
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  // Kailas css
  qutBox: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: 'center',
    alignItems: 'center',
  },
  whiteText:{
    color:ColorSheet.$white
  },
  // upDownArrow:{
  //   position:'absolute',
  //   right: 5,
  //   top:'50%',
  //   marginTop:-15
  // }
  greenArrow: {
    position: 'absolute',
    right: 0,
    top: 4,
    width: 15,
  },
  redArrow: {
    position: 'absolute',
    right: 0,
    top: 3,
    width: 13,
  },
  redArrowPort: {
    width: 12,
    marginLeft: 2,
  },
  fontcls: {
    fontFamily: 'Lato',
    fontWeight: '500',
    marginLeft: 10
  }
});
