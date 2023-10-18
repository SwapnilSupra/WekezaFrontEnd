import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

export const QueMarkStyles = StyleSheet.create({
  imageTxt: { 
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Lato', 
    color: ColorSheet.$Gray10,
  },

  imageBack: {
    backgroundColor: 'rgba(229,229,229,0.5)', 
    width: '47.7%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    textAlign: 'center',
    color: ColorSheet.$Gray10,
    paddingVertical:10,
  },
  centerText: {
    textAlign: 'center', 
    marginTop:5,
    marginBottom:7,
    justifyContent: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  centerImg: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 110,
    width:110,
  },
  iconImg:{
    height: 110,
    width:110,
  },
  imageView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '100%',
  },
  imageViewInn: {
    width: '47.7%',
    display: 'flex',
  },
  mainTextMargin: {marginTop: 0, marginLeft: 0, marginBottom: 50},
  selected: {
    backgroundColor: ColorSheet.$Green5,
    color: ColorSheet.$white,
    textAlign: 'center',
  },
});
