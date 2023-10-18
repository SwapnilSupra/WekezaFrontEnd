import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';
export const WatchLSearchStyles = StyleSheet.create({
  name: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Raleway-SemiBold',
    color: ColorSheet.$DarkGreen,
    marginTop: 15,
  },
  selected: {
    borderColor: ColorSheet.$DarkGreen,
    borderWidth: 2,
  },
});
