import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

export const FewQueStyles = StyleSheet.create({
  helpText: {
    fontSize: 15,
    fontWeight: '300',
    fontFamily: 'lato',
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%',
    color: ColorSheet.$Gray10,
    marginBottom: 60,
    letterSpacing: 0.2,
    lineHeight:22
  },
  contuneSub: {
    fontSize: 16,
    fontWeight: '300',
    fontFamily: 'lato',
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%',
    color: ColorSheet.$white,
    marginBottom: 45,
    letterSpacing: 0.2,
  },
});
