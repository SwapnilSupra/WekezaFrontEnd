import {StyleSheet} from 'react-native';
import ColorSheet from '../../../StyleSheet/ColorSheet';

export const WatchListDetailsStyles = StyleSheet.create({
  stockHeader: {
    backgroundColor: ColorSheet.$geyBg,
    elevation: 0,
    paddingHorizontal: 0,
    borderBottomWidth: 0.5,
    borderColor: ColorSheet.$Gray4,
  },
  SearchIcon: {},
  createdTxt: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Lato',
    color: ColorSheet.$Gray4,
    marginTop: 4,
  },
  sortIconView: {
    padding: 3,
    backgroundColor: ColorSheet.$white,
    height: 35,
    width: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortIcon: {
    fontSize: 22,
    color: ColorSheet.$DarkGreen,
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  BtnContain: {marginTop: 0, width: 70, height: 30},

  botSp:{
    marginBottom:15,
  },
  

});
