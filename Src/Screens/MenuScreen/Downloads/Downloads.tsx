import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  PermissionsAndroid
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import { makeAlpacagetRequest, post_GetAlpacaData } from '../../../Utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import SelectDropdown from 'react-native-select-dropdown';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import DateTimePicker, {
} from '@react-native-community/datetimepicker';
import { SummaryStyles } from '../../OnBoardingDesign/Summary/SummaryStyle';
import { MenuStyles } from '../Menu/MenuStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import RNFS from 'react-native-fs';

let path = '';

const Downloads = () => {

  var Documenttype = [
    'account_statement',
    // 'identity_verification',
  ];
  const [DocumentType, setDocumentType] = useState('');
  const [load, getLoad] = useState(false);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [iddoc, setiddoc] = useState('');
  const [showlist, setshowlist] = useState(false);
  const [flg, setflg] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [enddate, setendDate] = useState(new Date());
  const [endmode, setendMode] = useState('date');
  const [endshow, setendShow] = useState(false);
  const [downloaddata, setdownloaddata] = useState([]);
  const [viewflag, setviewflag] = useState(false);
  const [holdingsdata, setholdingsdata] = useState([]);
  const [transactionsdata, settransactionsdata] = useState([]);
  const [isModalData, setModalData] = useState(false);


  const searchfun = async () => {

    setLoading(true);
    setflg(true);

    try {

      if (DocumentType !== '') {

        let idalpca: any = await AsyncStorage.getItem('alpaca_id');
        // makeAlpacagetRequest('accounts/' + idalpca + '/documents?type=' + DocumentType + '')
        //   .then(async (result: any) => {
        //     var tt = result.data[0].type;
        //     var did = result.data[0].id;
        //     setData(tt);
        //     setiddoc(did)
        //     getLoad(true);
        //     setLoading(false);
        //     // setflg(false);
        //   })
        //   .catch(function (error) {
        //     var errmsg = JSON.stringify(error)
        //     seterrortext(errmsg)
        //     setModalCreate(true)
        //     setLoading(false);
        //     setflg(false);
        //   });
        var data = {
          url: 'accounts/' + idalpca + '/documents?type=' + DocumentType + '',
        };
        let tokenidstore = await AsyncStorage.getItem('token');
        post_GetAlpacaData('alpaca/getalpacadata', data, tokenidstore)
          .then(async (result: any) => {
            setData(result.data.data[0].type);
            setiddoc(result.data.data[0].id)
            getLoad(true);
            setLoading(false);
          })
          .catch(function (error) {
            var errmsg = JSON.stringify(error.response.data.message.message)
            seterrortext(errmsg)
            setModalCreate(true)
            setLoading(false);
            setflg(false);
          });

      } else {
        var errmsg = 'Please select one option'
        seterrortext(errmsg)
        setModalCreate(true)
        setflg(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setflg(false);
    }
  };

  const downloadfun = async (data: any) => {

    try {

      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);
      } catch (err) {
        console.warn(err);
      }

      const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (!readGranted || !writeGranted) {
        console.log('Read and write permissions have not been granted');
        return;
      }

      let idalpca: any = await AsyncStorage.getItem('alpaca_id');
      let docid = data

      // makeAlpacagetRequest('accounts/' + idalpca + '/documents/' + docid + '/download?document_type=' + DocumentType + '&start=' + date + '&end=' + enddate + '')
      //   .then(async (result: any) => {
      //     setdownloaddata(result.data.deposits_and_withdrawals);
      //     setholdingsdata(result.data.holdings);
      //     settransactionsdata(result.data.transactions);
      //     setviewflag(true)
      //     setModalData(true)
      //     path = RNFS.DownloadDirectoryPath + '/Account_Statement' + date + "_" + enddate + '.txt';
      //     await RNFS.writeFile(path, JSON.stringify(result.data.deposits_and_withdrawals) + JSON.stringify(result.data.holdings) + JSON.stringify(result.data.holdings) + JSON.stringify(result.data.transactions), 'utf8');
      //   })
      //   .catch(function (error) {
      //     var errmsg = JSON.stringify(error.result.data.message)
      //     seterrortext(errmsg)
      //     setModalCreate(true)
      //     console.log(error);
      //   });

      var uridata = {
        url: 'accounts/' + idalpca + '/documents/' + docid + '/download?document_type=' + DocumentType + '&start=' + date + '&end=' + enddate + '',
      };
      let tokenidstore = await AsyncStorage.getItem('token');
      post_GetAlpacaData('alpaca/getalpacadata', uridata, tokenidstore)
        .then(async (result: any) => {
          setdownloaddata(result.data.data.deposits_and_withdrawals);
          setholdingsdata(result.data.data.holdings);
          settransactionsdata(result.data.data.transactions);
          setviewflag(true)
          setModalData(true)
          path = RNFS.DownloadDirectoryPath + '/Account_Statement' + date + "_" + enddate + '.txt';
          await RNFS.writeFile(path, JSON.stringify(result.data.data.deposits_and_withdrawals) + JSON.stringify(result.data.data.holdings) + JSON.stringify(result.data.data.holdings) + JSON.stringify(result.data.data.transactions), 'utf8');

        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error.response.data.message.message)
          seterrortext(errmsg)
          setModalCreate(true)
          setLoading(false);
          setflg(false);
        });


    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  const toggleModalData = () => {
    setModalData(!isModalData);
  };

  const setelement = async (item: any, index: any) => {

    setDocumentType(item);
    if (index == 0) {
      setshowlist(true);
      setshowlist(false)
    }
    else {
      setshowlist(false);
      setshowlist(true)
    }
  }

  const onChange = (event: any, selectedDate: any) => {

    var currentDate = selectedDate;

    var datestr: any = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, "0") + '-' + currentDate.getDate().toString().padStart(2, "0");
    setShow(false);
    setDate(datestr);
  };
  const showDatepicker = () => {
    setDate(new Date())
    showMode('date');
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
    console.log('mode', currentMode);
  };

  const onChangedtend = (event: any, selectedDate: any) => {

    var currentDate = selectedDate;

    var datestr: any = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, "0") + '-' + currentDate.getDate().toString().padStart(2, "0")

    setendShow(false);
    setendDate(datestr);
  };

  const showendDatepicker = () => {
    setendDate(new Date())
    showendMode('date');
  };

  const showendMode = (currentMode: any) => {
    setendShow(true);
    setendMode(currentMode);
  };

  useEffect(() => {
    if (!load) {
      // onLoadfun();
    }
  }, []);

  return (

    <View style={CommonStyles.ContainerPink}>
      <View style={[CommonStyles.sideSpace, CommonStyles.commonTopSP]}>
      </View>

      <View style={CommonStyles.sideSpace}>
        <Text style={CommonStyles.labelText}>Select Document</Text>
        <SelectDropdown
          data={Documenttype}
          renderDropdownIcon={(selectedItem: any, index: number) => (
            <Fontisto
              name="angle-down"
              style={CommonStyles.DropdownIcon}
            />
          )}
          dropdownIconPosition="right"
          onSelect={(selectedItem, index) => {
            setelement(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={CommonStyles.inputField}
          buttonTextStyle={CommonStyles.DropdownTxt}
          defaultButtonText={'Select Option'}
        />
        <View>
          <Text style={CommonStyles.labelText}>Start Date</Text>
          <View style={CommonStyles.calOut}>

            <Text
              style={[CommonStyles.inputField, CommonStyles.calInput]}>
              {date.toLocaleString()}
            </Text>
            <TouchableOpacity
              onPress={showDatepicker}
              style={CommonStyles.calIcon}>
              <FontAwesome
                name="calendar-o"
                size={20}
                color={ColorSheet.$Gray6}
              />
            </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              dateFormat="shortdate"
              value={date}
              // mode="date"
              is24Hour={false}
              onChange={onChange}
            />
          )}
        </View>
        <View>
          <Text style={CommonStyles.labelText}>End Date</Text>
          <View style={CommonStyles.calOut}>

            <Text
              style={[CommonStyles.inputField, CommonStyles.calInput]}>
              {enddate.toLocaleString()}
            </Text>
            <TouchableOpacity
              onPress={showendDatepicker}
              style={CommonStyles.calIcon}>
              <FontAwesome
                name="calendar-o"
                size={20}
                color={ColorSheet.$Gray6}
              />
            </TouchableOpacity>
          </View>
          {endshow && (
            <DateTimePicker
              testID="dateTimePicker"
              dateFormat="shortdate"
              value={enddate}
              // mode="date"
              is24Hour={false}
              onChange={onChangedtend}
            />
          )}
        </View>
        <View>
          <TouchableOpacity onPress={() => searchfun()}>
            <View style={[CommonStyles.btnCotainer, MenuStyles.BtnDownload]}>
              <Text style={CommonStyles.tradeBut}>Search</Text>
            </View>
          </TouchableOpacity>
        </View>
        {(DocumentType !== '' && flg == true) ?
          <TouchableOpacity>
            <View style={CommonStyles.downloadTop}>
              <Text style={CommonStyles.downloadTopLine}>{data}</Text>
              <TouchableOpacity onPress={() => downloadfun(iddoc)}>
                <View style={[CommonStyles.btnCotainer, MenuStyles.BtnDn]}>
                  {/* <MaterialIcons name="logout" size={20} color={ColorSheet.$white} /> */}
                  <Text style={CommonStyles.btnTxt}>Download</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          : null}
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

      <Modal isVisible={isModalData}>
        <View style={[WatchListStyles.ModalView, WatchListStyles.ModalViewSideSpace]}>
          <TouchableOpacity onPress={toggleModalData}>
            <View style={CommonStyles.closeBtnView}>
              <Ionicons name="close" style={CommonStyles.clodeICon} />
            </View>
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            {(downloaddata !== [] && viewflag == true) ?
              <View>
                <View style={[SummaryStyles.editViewHeadDN]}>
                  <Text style={SummaryStyles.dwonloadPophead}>Deposits and withdrawals Details</Text>
                  <TouchableOpacity>
                  </TouchableOpacity>
                </View>

                {downloaddata.map((key: any, index: any) => (
                  <>
                    <View key={index.key} style={CommonStyles.downloadDivider}>
                      <View style={SummaryStyles.editViewDN}>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>Account no.</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.account_no}</Text>
                        </View>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>Description</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.description}</Text>
                        </View>
                      </View>
                      <View style={SummaryStyles.editViewDN}>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>Entry type</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.entry_type}</Text>
                        </View>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>Net amount</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.net_amount}</Text>
                        </View>
                      </View>
                      <View style={SummaryStyles.editViewDN}>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>System date</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.system_date}</Text>
                        </View>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>Trade date</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.trade_date}</Text>
                        </View>
                      </View>
                    </View>
                  </>
                ))}
              </View> : null}
            {(holdingsdata !== [] && viewflag == true) ?
              <View  >
                <View style={[SummaryStyles.editViewDNHead]}>
                  <Text style={SummaryStyles.dwonloadPophead}>Holdings</Text>
                  <TouchableOpacity>
                  </TouchableOpacity>
                </View>

                {holdingsdata.map((key: any, index: any) => (
                  <>
                    <View key={index.key} style={CommonStyles.downloadDivider}>
                      <View style={SummaryStyles.editViewDN}>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>cost price</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.cost_price}</Text>
                        </View>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>Description</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.description}</Text>
                        </View>
                      </View>
                      <View style={SummaryStyles.editViewDN}>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>market_price</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.market_price}</Text>
                        </View>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>market_value</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.market_value}</Text>
                        </View>
                      </View>
                      <View style={SummaryStyles.editViewDN}>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>quantity</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.quantity}</Text>
                        </View>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>td_cost_basis</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.td_cost_basis}</Text>
                        </View>
                      </View>
                    </View>
                  </>
                ))}
              </View> : null}
            {(transactionsdata !== [] && viewflag == true) ?
              <View >
                <View style={[SummaryStyles.editViewDNHead]}>
                  <Text style={SummaryStyles.dwonloadPophead}>Transactions</Text>
                  <TouchableOpacity>
                  </TouchableOpacity>
                </View>

                {transactionsdata.map((key: any, index: any) => (
                  <>
                    <View key={index.key} style={CommonStyles.downloadDivider}>
                      <View style={SummaryStyles.editViewDN}>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>Amount</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.amount}</Text>
                        </View>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>Commission</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.commission}</Text>
                        </View>
                      </View>
                      <View style={SummaryStyles.editViewDN}>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>Entry type</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.entry_type}</Text>
                        </View>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>Price</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.price}</Text>
                        </View>
                      </View>
                      <View style={SummaryStyles.editViewDN}>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>Quantity</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.quantity}</Text>
                        </View>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>Side</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.side}</Text>
                        </View>
                      </View>
                      <View style={SummaryStyles.editViewDN}>
                        <View style={SummaryStyles.editField}>
                          <Text style={SummaryStyles.txt}>Trade date</Text>
                          <Text style={SummaryStyles.mainTxtDN}>{key.trade_date}</Text>
                        </View>
                      </View>
                    </View>
                  </>
                ))}
              </View> : null}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

export default Downloads;
