import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

export const EditDocumentStyles = StyleSheet.create({
  attachmentView: {
    width: 45, 
    backgroundColor: ColorSheet.$Gray3,
    height: 45,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    right:0,
    top:0
 
  },
  attachPin: {
    color: ColorSheet.$white,
    fontSize: 22,
  },
  DocName: {
    width: '100%', 
    paddingTop: 11,  
    paddingRight:50
  },
});
