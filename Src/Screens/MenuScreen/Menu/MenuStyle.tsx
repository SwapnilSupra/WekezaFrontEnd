import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

export const MenuStyles = StyleSheet.create({
  backImage: {
    width: '100%',
    paddingBottom: 50,
  },
  ProfileImageView: {
    flexDirection: 'row',
    marginHorizontal: 13,
    marginTop: 16,
    marginBottom: 11,
    paddingBottom: 15,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    borderBottomWidth: 1,
  },
  NameView: {justifyContent: 'center', marginLeft: 15},
  UserName: {
    color: ColorSheet.$white,
    fontSize: 15,
    fontWeight: '700',     
    fontFamily: 'Lato',
  },
  UserImage: {
    height: 60, 
    width: 60, 
    borderRadius: 60
  },
  Gmail: {
    fontSize: 14,
    marginTop:2,
    fontWeight: '500',
    fontFamily: 'Lato',
    color: ColorSheet.$white,
  },
  StatusTxt: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Lato',
    color: ColorSheet.$white,
    marginBottom: 3,
    marginLeft: 13,
  },
  Status: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$white,
    marginLeft: 13,
  },
  mainTxt: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Raleway',
    color: ColorSheet.$Green7,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom:4,
  },
  divider: {
    alignSelf: 'center',
    backgroundColor: ColorSheet.$GrayBorder,
    marginTop: 15,
  },
  FormView: {
    backgroundColor: ColorSheet.$geyBg,
    marginTop: -30,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  mainHeader: {
    fontSize: 19,
    fontWeight: '600',
    fontFamily: 'Raleway-SemiBold',
    color: ColorSheet.$black,
    marginVertical: 15,
  },
  menuName: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Raleway-SemiBold',
    color: ColorSheet.$black,
    marginLeft: 37,
  },
  MenuView: {
    flexDirection: 'row',
    backgroundColor: ColorSheet.$geyBg,
    height:66,
    alignItems:'center',
    borderBottomColor: ColorSheet.$GrayBorder,
    borderBottomWidth: 0.5,
    position:'relative', 
  },
  Btn: {
    backgroundColor: ColorSheet.$Gray8,
    flexDirection: 'row',
    width: '100%',
  },
  BtnDn: {
    backgroundColor: ColorSheet.$Gray8,
    flexDirection: 'row', 
    width:'auto',
    paddingHorizontal:20,
    justifyContent:'center',
    alignItems:'center',
  },
  BtnDownload: { 
    flexDirection: 'row',
    width: '100%',
  },
  logOutButOut: {
    position: 'relative',
    paddingBottom: 70,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    display: 'flex',
  },
  logOutBut: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 30,
    width: '100%',
    paddingHorizontal: '15%',
  },
  menuIcon:{
    position:'absolute',
    top:'50%',
    marginTop:-10,
  },
  subMenuspace:{
    paddingLeft:38,
    backgroundColor: ColorSheet.$white,
    borderRadius:8,
    width:'100%',
    overflow:'hidden',
  },
  subMenyWht:{
    backgroundColor: ColorSheet.$white,
  },
  dropArrow:{
    position:'absolute',
    right:0,
    top:0,
    width:27,
    height:66, 
    paddingBottom:5
  }
});
