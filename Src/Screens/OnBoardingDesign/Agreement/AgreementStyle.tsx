import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const AgreementStyle = StyleSheet.create({
  optiontxtMargin: {
    marginHorizontal: 25,
    marginBottom: 20,
  },
  agreeTxtBot: {
    fontWeight: '600',
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 40,
    color: ColorSheet.$black,
    fontSize: 16,
    marginTop: 25,
    marginBottom: 35,
  },
  marginBtn: {
    marginTop: 50,
  },
  AgreementPdf: {
    height: 280,
    width: '100%',
    alignSelf: 'center',
  },
  AgreeTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: ColorSheet.$black,
  },
  ModalView: {
    backgroundColor: ColorSheet.$white,
    borderRadius: 10,  
    height: hp('94%'), // 70% of height device screen
    width: wp('90%')   // 80% of width device screen
  },
});
