import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet'; 

export const CommisionFreeStyles = StyleSheet.create({
  txt: {
    color: ColorSheet.$black,
    fontSize: 18,
    fontFamily: 'Raleway-SemiBold',
    letterSpacing: 0.3,
    marginLeft: 20,
  },
  mainTxt: {
    fontSize: 20,
    color: ColorSheet.$Gray10,
    fontFamily: 'Raleway-Bold',
    letterSpacing: 0.2,
    marginTop: 15,
    marginBottom: 17,
    lineHeight:32, 
  },
  centerTxt: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%',
    marginTop: 20,
    marginBottom: 20,
  },
  centerTxtSucess: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%',
    marginTop: 20,
    marginBottom: 20,
  },
  centerTxtHead: {
    textAlign: 'center',
  },
  stockTxt: {
    flexDirection: 'row',
    marginBottom: 32,
    alignItems: 'center',
  },
  iconBorder: {
    borderRadius: 80,
    borderColor: 'rgba(61, 222, 114, 0.3)',
    borderWidth: 10,
    height: 85,
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconView: {
    backgroundColor: ColorSheet.$Green7,
    height: 65,
    width: 65,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotView: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 35,
  },
  dashDotView:{ 
    marginTop: 20,
    marginBottom: 5, 
  },
  dot: {
    borderWidth: 3.5,
    borderColor: ColorSheet.$Green7,
    height: 7,
    width: 7,
    borderRadius: 10,
    marginHorizontal:4,
  },
  longDash: {
    width: 20,
    backgroundColor: ColorSheet.$Green7,
  },
});
