import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

export const ProfileStyles = StyleSheet.create({
  EditImage: {
    fontSize: 10,
    color: ColorSheet.$DarkGreen,
  },
  EditIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: -2,
    right: -4,
    height: 23,
    width: 23,
    backgroundColor: ColorSheet.$white,
    borderRadius: 15,
    borderColor: ColorSheet.$DarkGreen,
    borderWidth: 1,
  },
});
