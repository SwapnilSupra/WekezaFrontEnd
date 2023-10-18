import { StyleSheet } from 'react-native';
import ColorSheet from './ColorSheet';

export const CommonStyles = StyleSheet.create({
  ContainerWhite: {
    flex: 1,
    backgroundColor: ColorSheet.$white,
    justifyContent: 'space-between',
  },
  ContainerPink: {
    flex: 1,
    backgroundColor: ColorSheet.$geyBg,
  },
  ContainerTemp: {
    flex: 1,
    backgroundColor: ColorSheet.$white,
  },
  ContainerGreen: {
    flex: 1,
    backgroundColor: '#f00',
    width: '100%',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: {
    marginTop: 0,
    alignSelf: 'flex-end',
  },
  logoImgCenter: {
    marginBottom: 40,
    alignSelf: 'center',
  },
  logoImgCenterDashlogo: {
    width: 28,
    height: 21,
    marginRight: 1,
  },
  chartBox: {
    backgroundColor: '#00f',
    height: 400,
    minHeight: 400,
  },
  imgMargingleft: {
    marginLeft: 20,
  },
  searchFild: {
    position: 'absolute',
    marginTop: 15,
    marginLeft: 14,
  },
  buySellBut: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buySellButCotainer: {
    height: 45,
    width: '47.5%',
    backgroundColor: ColorSheet.$DarkGreen,
    // borderColor: ColorSheet.$white,
    // borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnCotainer: {
    height: 45,
    width: '80%',
    backgroundColor: ColorSheet.$DarkGreen,
    // borderColor: ColorSheet.$white,
    // borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  lightbtnCotainer: {
    height: 50,
    width: '80%',
    borderColor: ColorSheet.$white,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  whiteBtn: {
    backgroundColor: ColorSheet.$geyBg,
    borderColor: ColorSheet.$Green8,
    borderWidth: 2,
    marginTop: 30,
  },
  geryCurve: {
    paddingTop: 30,
    paddingBottom: 35,
    marginTop: -20,
  },
  dontAccount: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 35,
  },
  smFild: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smFildInn: {
    width: '47.5%',
  },
  btnDarkGreen: {
    height: 50,
    width: '80%',
    backgroundColor: ColorSheet.$DarkGreen,
    borderColor: ColorSheet.$DarkGreen,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnTxt: {
    color: ColorSheet.$white,
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
    letterSpacing: 0.3,
  },
  inputField: {
    height: 50,
    borderRadius: 8,
    backgroundColor: ColorSheet.$white,
    color: ColorSheet.$Gray8,
    width: '100%',
    alignSelf: 'center',
    fontSize: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    display: 'flex',
  },
  inputFieldPhone: {
    paddingHorizontal: 35,
  },
  prefixOut: {
    position: 'relative'
  },
  prefix: {
    position: 'absolute',
    top: 34,
    left: 10,
  },
  inputFieldDrop: {
    height: 45,
    borderRadius: 8,
    backgroundColor: ColorSheet.$white,
    color: ColorSheet.$Gray8,
    width: '100%',
    alignSelf: 'center',
    fontSize: 14,
    paddingHorizontal: 12,
    marginBottom: 15,
    display: 'flex',
    borderColor: ColorSheet.$GrayBorder,
    borderWidth: 1,
  },
  inputFieldSearch: {
    marginBottom: 5,
    paddingLeft: 45,
  },
  inputFieldLast: {
    marginBottom: 10,
  },
  inputShadow: {
    shadowColor: '#bbb',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1.46,
    elevation: 9,
  },
  calOut: {
    flexDirection: 'row',
  },
  calInput: {
    paddingTop: 14,
  },
  calIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newsDetailsWrap: {
    paddingTop: 15,
  },
  newsDetailsLine: {
    borderTopWidth: 0.5,
    borderBottomColor: ColorSheet.$GrayBorder,
    marginBottom: 20,
    marginTop: 10,
  },
  newsDetailsRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  newsDetName: {
    fontSize: 14,
    minWidth: 97,
    color: ColorSheet.$Gray8
  },
  newsDetailsText: {
    fontSize: 14,
    lineHeight: 21,
    color: ColorSheet.$Gray8
  },
  newsDetailsImg: {
    maxWidth: 70,
    maxHeight: 70,
    height: 70,
    width: 70,
    marginVertical: 15,
  },
  newsDetailsHead: {
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
    color: ColorSheet.$black,
    marginBottom: 5,
    marginTop: 15
  },
  flexRowNew: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sideSpace: {
    paddingHorizontal: 16,
    display: 'flex',
    width: '100%',
  },
  sideSpaceDashBoard: {
    paddingHorizontal: 15,
    display: 'flex',
    position: 'relative',
  },
  commonBotSP: {
    paddingBottom: 35,
  },
  commonBotSPDetails: {
    paddingBottom: 20,
  },
  commonVerticalSP: {
    paddingTop: 20,
    paddingBottom: 35,
  },
  cartPriceOpen: {
    marginTop: 11,
    paddingTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderColor: ColorSheet.$GrayBorder
  },
  cartPriceOpens: {
    backgroundColor: '#ff0',
  },
  dateTme: {
    marginTop: 8,
    flexDirection: 'row',

  },
  dateInner: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'lato',
    color: ColorSheet.$DarkGreen,
  },
  TimeInner: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'lato',
    color: ColorSheet.$DarkGreen,
    marginLeft: 5,
  },
  commonTopSP: {
    paddingTop: 20,
  },
  commonBotSm: {
    paddingBottom: 20,
  },
  sideSpaceLogin: {
    paddingHorizontal: 20,
    display: 'flex',
    width: '100%',
    paddingTop: 0,
  },
  sideLessSpace: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    display: 'flex',
    width: '100%',
  },
  logoTopSpace: {
    marginTop: 50,
  },
  eyeIconOut: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
  },
  sortTopsp: {
    marginTop: 10
  },
  DropdownTxt: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Lato',
    textAlign: 'left',
    color: ColorSheet.$Gray8,
    marginLeft: 0,
  },
  DropdownIcon: {
    fontSize: 15,
    color: ColorSheet.$Gray4,
  },
  secureIcon: {
    position: 'absolute',
    right: 15,
    top: 14,
  },
  error: {
    fontSize: 14,
    color: ColorSheet.$Yellow5,
    marginLeft: 15,
    marginTop: -10,
    marginBottom: 15,
  },
  errorRed: {
    fontSize: 14,
    color: ColorSheet.$RedBtn,
    marginLeft: 15,
    marginTop: -10,
    marginBottom: 15,
  },
  error2: {
    fontSize: 14,
    color: ColorSheet.$Yellow5,
    marginLeft: 0,
    marginTop: -20,
    marginBottom: 15,
    width: '95%',
  },
  divider: {
    height: 1,
    marginVertical: 8,
    backgroundColor: ColorSheet.$GrayBorder,
    width: '100%',
  },
  dividersm: {
    height: 1,
    marginTop: 12,
    marginBottom: -5,
    backgroundColor: ColorSheet.$GrayBorder,
    width: '100%',
  },
  TwoInputView: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  radOut: {
    flexDirection: 'row',
    marginLeft: -7,
    alignItems: 'center',
    width: '40%',
  },
  fileOut: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    position: 'relative'
  },
  lessThan: {
    color: ColorSheet.$Gray7,
    fontSize: 17,
  },
  editIcon: {
    color: ColorSheet.$Green4,
    fontSize: 14,
    paddingTop: 7,
    textAlign: 'center',
    marginTop: 3,
    marginBottom: -3,
    marginRight: -5,
    width: 30,
    height: 30,
    borderRadius: 4,
    backgroundColor: ColorSheet.$lgtGreen,
  },
  lockIcon: {
    fontSize: 15,
  },
  navIcon: {
    fontSize: 20,
    marginTop: 5,
  },
  AgreeTxt: {
    fontSize: 14,
    fontWeight: '600',
    color: ColorSheet.$black,
    lineHeight: 21,
    width: '92%',
  },
  checkBoxOut: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
    width: '100%',
  },
  checkBox: {
    marginRight: 10,
  },
  clodeICon: {
    fontSize: 24,
    color: ColorSheet.$Gray5,
  },
  closeBtnView: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -0,
    right: -25,
  },
  closeBtnViewChart: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -0,
    right: 5,
  },
  chartMargin: {
    marginBottom: 15
  },
  ModalCloseBtn: {
    fontSize: 22,
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$Gray7,
  },
  agreeTxt: {
    fontSize: 15,
    marginBottom: 15,
    lineHeight: 22,
    width: '92%',
    fontFamily: 'Raleway-Medium',
    color: ColorSheet.$Gray7,
  },
  agreeTxtFullWidth: {
    width: '100%',
  },
  deleteBtn: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -28,
    height: 56,
    width: 56,
    borderRadius: 50,
    backgroundColor: ColorSheet.$RedBtn,
    elevation: 7,
  },
  deleteBtnIcon: {
    color: ColorSheet.$white,
    fontSize: 24,
  },
  deleteBtnDashboard: {
    bottom: -15
  },
  linkText: {
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$DarkGreen,
    borderColor: ColorSheet.$DarkGreen,
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center',
    paddingVertical: 7,
    fontSize: 14,
    width: 105,
    marginBottom: 15,
  },
  cardHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth:1,
    // borderBottomColor:ColorSheet.$GrayBorder,
    // paddingBottom:10,
  },
  portLogoOutRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  portLogoOut: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  halfBox: {
    width: '60%',
  },
  halfBoxRight: {
    width: '40%',
  },
  halfMiniBox: {
    width: '30%',
  },
  leftText: {
    textAlign: 'left'
  },
  stLeft: {
    flexDirection: 'row',
    width: '80%',
  },
  stdetailsLogo: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  stLeftSm: {
    flexDirection: 'row',
    width: '86%',
  },
  StockView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
    paddingVertical: 10,
    backgroundColor: ColorSheet.$white,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: ColorSheet.$white,
  },
  StockViewSelected: {
    elevation: 10,
    borderWidth: 2,
    borderColor: ColorSheet.$DarkGreen,
  },
  StockViewPort: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 14,
    paddingVertical: 15,
    backgroundColor: ColorSheet.$white,
    borderRadius: 8,
    elevation: 4,
    marginTop: 16,
  },
  availableBal: {
    backgroundColor: ColorSheet.$lightCard,
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: ColorSheet.$lightCard,
    borderWidth: 1,
    paddingVertical: 14
  },
  portfolioTop: {
    backgroundColor: ColorSheet.$lightCard,
    flexDirection: 'column',
    marginTop: 10,
    borderColor: ColorSheet.$lightCard,
    borderWidth: 1,
    paddingVertical: 12
  },
  portData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1,
  },
  stockViewDetails: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  stockViewDetailsOrd: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  StockDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  stockName: {
    fontSize: 15,
    fontFamily: 'Raleway-SemiBold',
    color: ColorSheet.$black,
  },
  StockCode: {
    fontSize: 13,
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$Gray4,
  },
  compName: {
    fontSize: 13,
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$black,
  },
  bellIcon: {
    color: ColorSheet.$DarkGreen,
    paddingHorizontal: 7,
    paddingBottom: 7,
    fontSize: 20,
    width: 46,
    textAlign: 'center',
    marginTop: -2,
    marginBottom: 3,
  },
  bellIconSm: {
    color: ColorSheet.$DarkGreen,
    paddingHorizontal: 7,
    paddingBottom: 7,
    fontSize: 20,
    width: 32,
    textAlign: 'center',
    marginTop: -2,
  },
  addIcon: {
    color: ColorSheet.$white,
    fontSize: 19,
  },
  StockDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  StckPrice: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'lato',
    color: ColorSheet.$black,
  },
  StckPricePort: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'lato',
  },
  StckPriceTxt: {
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Relaway-Bold',
    color: ColorSheet.$Gray7,
  },
  StckPriceTopSP: {
    paddingTop: 8
  },
  StockDiffrence: {
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$LightRed,
    marginTop: 10,
  },
  tradeBut: {
    fontSize: 11,
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$white,
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: ColorSheet.$DarkGreen,
    borderRadius: 6,
    textAlign: 'center',
  },
  addBut: {
    borderRadius: 6,
    height: 30,
    width: 32,
    marginTop: 1,
    backgroundColor: ColorSheet.$DarkGreen,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  bellOut: {
    flexDirection: 'column',
    width: '20%',
    alignItems: 'flex-end',
  },
  bellOutSm: {
    flexDirection: 'column',
    width: '14%',
    alignItems: 'flex-end',
  },
  stNamOutSm: {
    flexDirection: 'column',
    width: '76%',
  },
  stNamOut: {
    flexDirection: 'column',
    width: '80%',
  },
  floteButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  miniBotSp: {
    marginBottom: 20,
  },
  stocklogo: {
    borderColor: ColorSheet.$GrayBorder,
    borderWidth: 0.5,
    backgroundColor: ColorSheet.$white,
    marginRight: 10,
    width: 52,
    height: 52,
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stocklogoImg: {
    maxHeight: 52,
    maxWidth: 52,
    width: 52,
    height: 52,
    resizeMode: 'contain'
  },
  stocklogoImgWtclist: {
    maxHeight: 43,
    maxWidth: 52,
    width: 52,
    height: 43,
    resizeMode: 'contain'
  },
  noBorder: {
    borderWidth: 0,
    marginRight: 0,
    borderRadius: 0,
    height: 43,
  },
  stocklogosm: {
    borderColor: ColorSheet.$GrayBorder,
    borderWidth: 0.5,
    backgroundColor: ColorSheet.$white,
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stocklogoImgsm: {
    maxHeight: 30,
    maxWidth: 30,
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  rightText: {
    textAlign: 'right'
  },
  lossText: {
    color: ColorSheet.$RedBtn,
  },
  lossTextPort: {
    color: ColorSheet.$RedBtn,
  },
  profitText: {
    color: ColorSheet.$DarkGreen,
  },
  profitTextPort: {
    color: ColorSheet.$DarkGreen,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 0,
    top: 5,
  },
  bubbleCounter: {
    height: 18,
    minWidth: 18,
    borderRadius: 20,
    width: 'auto',
    position: 'absolute',
    color: ColorSheet.$white,
    left: 22,
    top: 3,
    padding: 1,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Lato',
    backgroundColor: ColorSheet.$RedBtn,
  },
  bellIconWiite: {
    color: ColorSheet.$white,
    paddingHorizontal: 7,
    paddingVertical: 9,
    fontSize: 22,
    textAlign: 'center',
  },
  labelText: {
    color: ColorSheet.$DarkGreen,
    fontSize: 13,
    marginBottom: 7,
    fontFamily: 'Raleway-SemiBold',
  },
  orText: {
    marginVertical: 15,
  },
  nomarBott: {
    marginBottom: 0
  },
  downloadDivider: {
    borderBottomColor: ColorSheet.$GrayBorder,
    borderBottomWidth: 1,
    marginBottom: 6,
    paddingBottom: 6,
  },
  downloadTop: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  downloadTopLine: {
    fontSize: 14,
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$Gray6,
    marginBottom: 10
  },
  detailsScroll: {
    flexDirection: 'column',
    height: '100%',
    display: 'flex',
    paddingBottom: 155
  },
  detailsScrollTop: {
    marginBottom: 15
  },
  aaa: {
    backgroundColor: '#f00'
  }

});
