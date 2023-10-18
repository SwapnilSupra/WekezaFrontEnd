import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

export const EmployeeInfoStyles = StyleSheet.create({
  numberView: {
    backgroundColor: ColorSheet.$Green7,
    height: 30,
    width: 30,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberTxt: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$white,
  },
  infoTxt: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$Gray9,
    marginTop: 17,
  },
  infoHeading: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    color: ColorSheet.$Gray9,
    marginTop: 20,
    marginBottom: 15,
  },

  margin: {fontSize: 20, marginBottom: 20},
  marginBot: {
    marginBottom:5,
  },
  marginBotMore: {
    marginBottom: 20,
  },
  optionTxt: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Lato',
    color: ColorSheet.$Gray7,
    marginTop: 7,
    marginBottom: 20,
  },
  agreeTxt: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Lato',
    color: ColorSheet.$Gray7,
    marginTop: 1,
    marginBottom: 15,
  },
  optiontxtMargin: {
    marginHorizontal: 25,
    marginBottom: 50,
  },
  marginTop: {
    marginTop: 20,
  },
  numberStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 21,
    width: '100%',
    alignSelf: 'center',
    position: 'relative',
  },
  stepLine: {
    backgroundColor: ColorSheet.$LightGreen,
    height: 3,
    width: '100%',
    position: 'absolute',
    top: 13,
  },
  stepLineInn1: {
    backgroundColor: ColorSheet.$Green7,
    height: 3,
    width: '25%',
  },
  stepLineInn2: {
    backgroundColor: ColorSheet.$Green7,
    height: 3,
    width: '50%',
  },
  stepLineInn3: {
    backgroundColor: ColorSheet.$Green7,
    height: 3,
    width: '75%',
  },
  stepLineInn4: {
    backgroundColor: ColorSheet.$Green7,
    height: 3,
    width: '100%',
  },
  checkLabel: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: 'Lato',
    color: ColorSheet.$Gray7,
  },
});
