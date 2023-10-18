import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

export const DisclosuresStyles = StyleSheet.create({
  txt1: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Lato',
    color: ColorSheet.$black,
  },
  txt2: {
    fontSize: 13,
    fontWeight: '300',
    fontFamily: 'Lato',
    color: ColorSheet.$Gray7,
    marginTop: 4,
  },
  radiobtn: {
    flexDirection: 'row',
    marginTop: 5,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems:'center',
    marginBottom: -4,
  },
  checkTxt: {
    marginTop: 0,
    marginLeft: -2,
    fontSize: 17,
    fontFamily: 'Lato',
    fontWeight: '300',
    color: ColorSheet.$Gray9,
  },
  CompTxt: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: ColorSheet.$black,
    marginVertical: 15,
  },
  optionView: {
    paddingVertical: 15,
    borderBottomColor: ColorSheet.$GrayBorder,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  optionViewLast: {
    paddingVertical: 11,
    borderBottomColor: ColorSheet.$GrayBorder,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});
