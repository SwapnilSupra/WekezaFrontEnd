import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';
ColorSheet;
export const SummaryStyles = StyleSheet.create({
  paper: {
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: ColorSheet.$white,
    borderRadius: 8,
    padding: 0,
    paddingBottom: 10,
    elevation: 2, 
    shadowColor: '#999', 
    shadowOpacity: 0.5,
    shadowRadius: 10,
    
  },
  paperLast: {
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: ColorSheet.$white,
    borderRadius: 10, 
    paddingBottom: 10,
  },
  editViewHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 9,
    marginTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: ColorSheet.$GrayBorder,
    paddingBottom: 15,
    paddingTop: 2,
  },
  editViewHeadDN: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 0,
    marginBottom: 9,
    marginTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: ColorSheet.$GrayBorder,
    paddingBottom: 15,
    paddingTop: 2,
  },
  editView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 13,
    marginBottom: 7,
    marginTop: 4,
  },
  editViewDN: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 0,
    marginBottom: 7,
    marginTop: 4,
  },
  editField: {
    width: '50%'
  },
  editFieldBig: {
    width: '100%'
  },
  divider: {
    height: 1,
    backgroundColor: ColorSheet.$GrayBorder,
    marginBottom: 8,
    marginTop: 6,
    marginHorizontal: 13,
  },
  mainTxtHead: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Lato',
    color: ColorSheet.$black,
    width:'90%',
    marginTop:7,
  },
  dwonloadPophead: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Lato',
    color: ColorSheet.$DarkGreen,
    width:'90%',
    marginTop:5,
    marginBottom:5
  },
  mainTxt: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Lato',
    color: ColorSheet.$black,
    width:'90%'
  },
  mainTxtDN: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Lato',
    color: ColorSheet.$black,
    width:'90%'
  },
  valueTxt: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Lato',
    color: ColorSheet.$black,
    width:'100%'
  },
  txt: {
    fontSize: 13,
    fontFamily: 'Lato',
    fontWeight: '400',
    color: ColorSheet.$Gray6, 
    marginBottom: 2,
  },
  txtEror:{
     textAlign:'center',
     paddingVertical:10,
  }
});
