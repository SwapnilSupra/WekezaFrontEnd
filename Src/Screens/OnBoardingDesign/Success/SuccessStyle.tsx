import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

export const SuccessStyles = StyleSheet.create({
  idMainView: {
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginBottom: 20,
  },
  idView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  accountId: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Lato',
    color: ColorSheet.$Gray6,
    marginRight: 10,
  },
  accountName: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Lato',
    color: ColorSheet.$Green7,
  },
  accountNameGrey: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Lato',
    color: ColorSheet.$Gray10,
  },
  link: {
    marginVertical: 20,
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '700',
    color: ColorSheet.$Gray9,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  vertSpaceTop: {
    height:180,
    width:180,
    marginTop:50
  },
  vertSpaceBottom: {
    marginBottom:50
  },

  
});
