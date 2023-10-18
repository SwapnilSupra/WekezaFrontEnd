import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

export const DocumentStyles = StyleSheet.create({
  attachmentView: {
    width: 45,
    alignSelf: 'flex-end',
    backgroundColor: ColorSheet.$Gray2,
    height: 45,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center', 
    marginBottom: 20,
    position:'absolute',
    right:0,
    top:0
  },
  attachPin:{
    color: ColorSheet.$white,
    fontSize:22,
  },
  DocName: {
    width: '100%', 
    paddingTop: 14,
  },
});
