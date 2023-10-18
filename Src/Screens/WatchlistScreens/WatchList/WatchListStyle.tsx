import { BottomTabView } from '@react-navigation/bottom-tabs';
import {Dimensions, StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export const WatchListStyles = StyleSheet.create({
  btnContainer: {
    width: 134,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: ColorSheet.$DarkGreen,
    alignSelf: 'flex-end',
    justifyContent:'center',
    marginTop: 15,
  },
  btnContainerSM: {
    width: 120,
    height: 35,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ColorSheet.$DarkGreen,
    alignSelf: 'flex-end',
    justifyContent:'center', 
  },
  CreateBtnTxt: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Releway-Medium',
    color: ColorSheet.$DarkGreen, 
    alignItems:'center',
    justifyContent:'center',
    textAlign: 'center',
  },
  listMainTxt: {
    fontSize: 18,
    color: ColorSheet.$DarkGreen,
    fontFamily: 'Raleway-Bold',
    letterSpacing: 0.2,
    marginTop: 12,
    marginBottom: 10,
    lineHeight: 32,
  },
  listMainDetails:{ 
    marginBottom: 0,
  },
  listName: {
    fontSize: 16,
    color: ColorSheet.$Gray10,
    fontFamily: 'Raleway-Bold',
    letterSpacing: 0.2, 
    flexWrap:'nowrap',
  },
  nameSection:{ 
    width:'78%',
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconViewDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:20,
    marginRight:-7
  },
  qtyTxt: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Releway-Regular',
    color: ColorSheet.$black,
    marginTop: 7,
  },
  ModalView: {
    backgroundColor: ColorSheet.$white,
    borderRadius: 10,
    height: 'auto',
    paddingHorizontal: 30,
    paddingTop: 5,
  },
  ModalViewChart: {
    backgroundColor: ColorSheet.$white,
    borderRadius: 10,
    height: 'auto',
    paddingHorizontal: 5,
    paddingTop: 5, 
  },
  ModalViewSideSpace: { 
    paddingHorizontal: 25,
    paddingTop: 0,
  },
  closeBtnView: {
    height: 27,
    width: 27,
    borderRadius: 15,
    backgroundColor: ColorSheet.$Gray2,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: -7,
    marginRight: -5,
  },
  ModalCloseBtn: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    fontWeight: '700',
    color: ColorSheet.$Gray7,
  },
  createdOn:{
    flexDirection:'row',
    marginTop:-5,
    marginBottom:10
  },
  PopupHeader: {
    fontSize: 18, 
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$black,
    alignSelf: 'center',
    textAlign:'center',
    marginTop: 20,
    marginBottom:15,
  },
  noDataPop: {
    fontSize: 17, 
    fontFamily: 'Raleway-Medium',
    color: ColorSheet.$black,
    alignSelf: 'center',
    textAlign:'center',
    marginTop: 70,
    marginBottom:70,
  },
  chartHead: {
    fontSize: 18, 
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$black,
    alignSelf: 'center',
    textAlign:'center',
    marginTop: 10,
    marginBottom:10,
  },
  AsenDsenTxt: {
    fontSize: 16, 
    fontFamily: 'Raleway-Medium',
    color: ColorSheet.$black,
  },
  CheckBoxView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  CheckBoxViewIdent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 11,
  },
  CheckBoxViewIdentTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom:5,
  },
  deleteIcon: {
    fontSize: 20,
    color: ColorSheet.$Gray4,
    padding: 6,
    marginRight:-3, 
  },
  editIcon: {
    fontSize: 16,
    color: ColorSheet.$Gray4,
    padding: 8,
    marginRight: 1, 
  },
  listCard: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems:'center',
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 12,
    backgroundColor: ColorSheet.$white,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 13,
  },
  notificationLineOut:{
    marginBottom:15
  },
  notificationLine:{
   marginBottom:10,
   paddingLeft:16,
   position:'relative',
   flexDirection:'row',
  },
  notificationBox:{
   backgroundColor:ColorSheet.$white,
   paddingHorizontal:15,
   paddingTop:15,
   borderRadius:10, 
   paddingBottom: 15,
   marginBottom: 10,
  },
  notiText:{
   color:ColorSheet.$black,
   marginBottom:5
  },
  notiTextID:{
    color:ColorSheet.$Green8,
    borderBottomColor:ColorSheet.$GrayBorder,
    borderBottomWidth:0.5,
    paddingBottom:15,
   },
   hideText: {
    opacity: 0.4, 
    color: ColorSheet.$black,
   },
  bullet:{
    color:ColorSheet.$DarkGreen,
    fontSize:16,
    display:'flex', 
    left:0,
    top:2,
    position:'absolute',
  },
});
