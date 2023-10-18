import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import ImagesAll from '../../../StyleSheet/ImagesAll';
import { AccontLinkedStyles } from '../AccountLinked/AccountLinkedStyle';
import { FundAddedStyles } from './FundAddedStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CommisionFreeStyles } from '../../OnBoardingDesign/CommisionFree/CommisionFreeStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAlpacagetRequest, post_GetAlpacaData } from '../../../Utils/utils';
import Modal from 'react-native-modal';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FundAdded = ({ navigation }: any) => {

  const [amoundisplay, setamoundisplay] = useState('')
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };
  const onLoadfun = async () => {

    let saveamt: any = await AsyncStorage.getItem('amountsend')
    setamoundisplay(saveamt);
    let savealpcaid: any = await AsyncStorage.getItem('alpaca_id')

    try {

      // makeAlpacagetRequest('accounts/' + savealpcaid + '/transfers?limit=1')
      //   .then(async (result: any) => {
      //     AsyncStorage.setItem('fundingstaus', result.data[0].status);
      //   })
      //   .catch(function (error) {
      //     var errmsg = JSON.stringify(error.response.data.message)
      //     seterrortext(errmsg)
      //     setModalCreate(true)
      //   });

      var data = {
        url: 'accounts/' + savealpcaid + '/transfers?limit=1',
      };
      let tokenidstore = await AsyncStorage.getItem('token');
      post_GetAlpacaData('alpaca/getalpacadata', data, tokenidstore)
        .then(async (result: any) => {
          AsyncStorage.setItem('fundingstaus', result.data.data[0].status);
        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error.response.data.message.message)
          seterrortext(errmsg)
          setModalCreate(true)
        });

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    onLoadfun();
  }, []);

  return (
    <View style={[CommonStyles.ContainerWhite, AccontLinkedStyles.center]}>
      <Image source={ImagesAll.Frame4} />
      <Text style={FundAddedStyles.Money}>${amoundisplay}</Text>
      <Text style={CommisionFreeStyles.mainTxt}>Funds Added!</Text>
      <View style={[CommonStyles.sideSpace, CommonStyles.commonBotSP]}>
        <Text style={FundAddedStyles.smallTxt}>
          <FontAwesome name="lock" style={CommonStyles.lockIcon} /> {''} Your
          information is safe with us. The funds will be deducted with in a
          few days from now.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('DashboardStack')}>
          <View style={[CommonStyles.btnCotainer, { marginTop: 40 }]}>
            <Text style={CommonStyles.btnTxt}>Done</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalCreate}>
        <View style={WatchListStyles.ModalView}>
          <TouchableOpacity onPress={toggleModal1}>
            <View style={CommonStyles.closeBtnView}>
              <Ionicons name="close" style={CommonStyles.clodeICon} />
            </View>
          </TouchableOpacity>
          <Text style={WatchListStyles.PopupHeader}>
            {errortext}
          </Text>
          <View style={CommonStyles.commonBotSP}>
            <TouchableOpacity onPress={toggleModal1}>
              <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                <Text style={CommonStyles.btnTxt}>Ok</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FundAdded;
