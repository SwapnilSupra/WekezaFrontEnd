import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import ImagesAll from '../../../StyleSheet/ImagesAll';
import { ConnectBankStyles } from './ConnectBankStyle';
import { CommisionFreeStyles } from '../../OnBoardingDesign/CommisionFree/CommisionFreeStyle';
import { makePostRequest } from '../../../Utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlaidLink, LinkSuccess, LinkExit } from 'react-native-plaid-link-sdk';
import Modal from 'react-native-modal';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

let derived_access_token: any = '';

const ConnectBank = ({ navigation }: any) => {
  const [getToken, setgetToken] = useState('');
  const [isToken, setisToken] = useState(false);
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  const onLoadfun = async () => {

    try {

      var bodyFormData = {
      };

      makePostRequest('auth/getPlaidlinktoken', bodyFormData)
        .then(async (result: any) => {
          setgetToken(result.data.data['link_token'])
          setisToken(true);
          AsyncStorage.setItem('plaidtoken', result.data.data['link_token']);
        })
        .catch(function (error) {

          var errmsg = JSON.stringify(error.response.data.message)
          seterrortext(errmsg)
          setModalCreate(true)
          console.log(error);
        });

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    onLoadfun();
  }, []);

  return (
    <View style={CommonStyles.ContainerWhite}>
      <ScrollView>
        <ImageBackground
          source={ImagesAll.BGCashsm}
          style={ConnectBankStyles.topImg}>
          <Image source={ImagesAll.BankAcc} />
        </ImageBackground>
        <View style={ConnectBankStyles.mainTextView}>
          <View style={[CommonStyles.sideSpace, CommonStyles.commonBotSP]}>
            <Text
              style={[CommisionFreeStyles.mainTxt, ConnectBankStyles.mainHead]}>
              Let’s Connect{'\n'}Your Bank Account
            </Text>
            <Text style={ConnectBankStyles.SmallTxt}>
              Wekeza uses Plaid to verify your bank account information
            </Text>
            <View style={ConnectBankStyles.powerBy}>
              <Text
                style={[
                  ConnectBankStyles.SmallTxt,
                  ConnectBankStyles.plaidTxtmarg,
                ]}>
                Powered by
              </Text>
              <Image source={ImagesAll.Plaid} />
            </View>
          </View>
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
      </ScrollView>
      <View style={CommonStyles.commonBotSm}>
        {(isToken) ?
          <PlaidLink
            tokenConfig={{
              token: getToken,
              noLoadingState: false,
            }}
            onSuccess={(success: LinkSuccess) => {

              var bodyFormData = {
                public_token: success.publicToken,
              };
              makePostRequest('auth/set_access_token', bodyFormData)
                .then(async (result: any) => {
                  AsyncStorage.setItem(
                    'access_token',
                    JSON.stringify(result.data.token),
                  );
                  navigation.navigate('AccountLinked');
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
            onExit={(exit: LinkExit) => {
              console.log(exit);
            }}>
            <View style={CommonStyles.btnCotainer}>
              <Text style={CommonStyles.btnTxt}>Add Account</Text>
            </View>
          </PlaidLink>
          : null}
      </View>
    </View>
  );
};

export default ConnectBank;
