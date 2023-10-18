import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

export const SplashStyles = StyleSheet.create({
  SplashTxtOut: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: 35,
    paddingHorizontal: 20, 
    width:'100%'
  },
  wekezaversion: {
    position:'absolute',
    fontSize: 14,
    right:12,
    top:9,
    fontWeight: '600',
    fontFamily: 'lato',
    color: ColorSheet.$white,
  },
  SplashTxt: {
    color: ColorSheet.$white,
    marginTop: 0,
    fontSize: 28,   
    fontFamily: 'Raleway-Bold', 
  },

  handImg: {height: 42, width: 35},
  btnContainer: {
    backgroundColor: 'rgba(0, 114, 38, 0.7)',
    /* opacity: 0.6, */
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 0,
    borderColor: 'transperent',
    marginTop: 10,
  },
  bgImage: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
});
