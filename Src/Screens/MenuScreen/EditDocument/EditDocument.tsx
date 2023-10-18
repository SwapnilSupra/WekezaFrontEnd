import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';

import * as yup from 'yup';
import { Formik } from 'formik';

import SelectDropdown from 'react-native-select-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DocumentPicker from 'react-native-document-picker';

import { CommisionFreeStyles } from '../../OnBoardingDesign/CommisionFree/CommisionFreeStyle';
import { EmployeeInfoStyles } from '../../OnBoardingDesign/EmployeeInfo/EmployeeInfoStyle';
import { EditDocumentStyles } from './EditDocumentStyle';
import { RadioButton } from 'react-native-paper';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

var document_arr: any = [];
const EditDocument = ({ navigation }: any) => {
  var Documenttype = [
    'identity_verification',
    'address_verification',
    'date_of_birth_verification',
    // 'tax_id_verification',
    // 'account_approval_letter',
    // 'w8ben',
  ];
  const [DocumentType, setDocumentType] = useState('');
  //const [DocumentSubtype, setDocumentSubtype] = useState('');
  const [Content, setContent] = useState('');
  const [MimeType, setMimeType] = useState('');
  const [getFilename, setFilename] = useState('');
  const [singleFile, setSingleFile] = useState('');
  const [value, setValue] = React.useState('Passport');
  const [Passport, setPass] = useState(false);
  const [driving, setDriving] = useState(false);
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  //-------------------

  let documents;
  let documents_edit;

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  const onSubmit = async (values: any) => {
    if (
      DocumentType !== '' &&
      Content !== '' &&
      MimeType !== '' &&
      value !== ''
    ) {
      if ((await AsyncStorage.getItem('setflagidentity')) == 'editidentity') {
        let bodyform: any = await AsyncStorage.getItem('data');
        let jsondata = JSON.parse(bodyform);

        jsondata.documents = null;
        documents_edit = {
          document_type: DocumentType,
          document_sub_type: value,
          content: Content,
          mime_type: MimeType,
        };
        document_arr.push(documents_edit);
        let dis = { ...jsondata, documents: document_arr };
        AsyncStorage.setItem('data', JSON.stringify(dis));
        AsyncStorage.removeItem('setflagidentity');
      } else {

        documents = {
          document_type: DocumentType,
          document_sub_type: value,
          content: Content,
          mime_type: MimeType,
        };
        document_arr.push(documents);
        let bodyform: any = await AsyncStorage.getItem('data');
        let jsondata = JSON.parse(bodyform);
        let dis = { ...jsondata, documents: document_arr };
        AsyncStorage.setItem('data', JSON.stringify(dis));
        var errmsg = 'Document submitted successfully';
        seterrortext(errmsg);
        setModalCreate(true);
      }
    } else {
      var errmsg = 'Please select all fields'
      seterrortext(errmsg)
      setModalCreate(true)
    }
  };

  let path: any;
  const ChooseFromGalary = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      //Printing the log realted to the file
      //Setting the state to show single file attributes
      var storename = res[0].name;
      var storemime: any = res[0].type;
      var storeuri: any = res[0].uri;

      setFilename(storename);
      setMimeType(storemime);
      RNFS.readFile(storeuri, 'base64').then(resp => {
        setContent(resp);
      });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        // Alert.alert('Canceled from single doc picker');
        var errmsg = 'Canceled from single doc picker'
        seterrortext(errmsg)
        setModalCreate(true)
      } else {
        //For Unknown Error
        // Alert.alert('Unknown Error: ' + JSON.stringify(err));
        var errmsg = JSON.stringify(err)
        seterrortext(errmsg)
        setModalCreate(true)
        throw err;
      }
    }
  };

  const clckradio = async (val: any) => {
    if (val == 'Passport') {
      setValue('Passport');
      setPass(true);
      setDriving(false);
      // setDocumentSubtype('passport')

    } else {
      setValue('Driving Licence');
      setPass(false);
      setDriving(true);
      // setDocumentSubtype('driving')
    }
  }

  return (
    <ScrollView>
      <View style={[CommonStyles.sideSpace, CommonStyles.commonBotSP]}>
        <View style={CommonStyles.ContainerPink}>
          <View style={[CommisionFreeStyles.dotView]}>
            <View style={CommisionFreeStyles.dot} />
            <View style={CommisionFreeStyles.dot} />
            <View style={CommisionFreeStyles.dot} />
            <View style={CommisionFreeStyles.dot} />
            <View
              style={[CommisionFreeStyles.dot, CommisionFreeStyles.longDash]}
            />
            <View style={CommisionFreeStyles.dot} />
          </View>
          <Text
            style={[
              EmployeeInfoStyles.infoTxt,
              EmployeeInfoStyles.marginBotMore,
            ]}>
            Upload Documents
          </Text>
          <Formik
            enableReinitialize
            initialValues={{
              DocumentSubtype: '',
            }}
            onSubmit={onSubmit}
            validationSchema={yup.object().shape({
            })}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <View>
                <Text style={CommonStyles.labelText}>Select verification</Text>
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
                    setDocumentType(selectedItem);
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
                <Text style={CommonStyles.labelText}>Attach file</Text>
                <View style={CommonStyles.fileOut}>
                  <Text
                    style={[
                      CommonStyles.inputField,
                      EditDocumentStyles.DocName,
                    ]}>
                    {getFilename}
                  </Text>
                  <TouchableOpacity onPress={() => ChooseFromGalary()}>
                    <View style={EditDocumentStyles.attachmentView}>
                      <MaterialCommunityIcons
                        style={EditDocumentStyles.attachPin}
                        name="attachment"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text>select document type for uploading</Text>
                  <RadioButton.Group onValueChange={clckradio} value={value}>
                    <View style={WatchListStyles.CheckBoxViewIdentTop}>
                      <Text style={WatchListStyles.AsenDsenTxt}>Passport</Text>
                      <RadioButton value="Passport" color={ColorSheet.$DarkGreen} />
                    </View>
                    <View style={WatchListStyles.CheckBoxViewIdent}>
                      <Text style={WatchListStyles.AsenDsenTxt}>Driver's License</Text>
                      <RadioButton value="Driving Licence" color={ColorSheet.$DarkGreen} />
                    </View>
                  </RadioButton.Group>
                </View>
                <TextInput
                  placeholder="Document Sub Type"
                  placeholderTextColor={ColorSheet.$Gray6}
                  style={CommonStyles.inputField}
                  editable={false}
                  value={value}
                />
                {touched.DocumentSubtype && errors.DocumentSubtype && (
                  <Text style={[CommonStyles.error]}>
                    {errors.DocumentSubtype}
                  </Text>
                )}

                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  disabled={!isValid}>
                  <View
                    style={[CommonStyles.btnCotainer, CommonStyles.whiteBtn]}>
                    <Text
                      style={[
                        CommonStyles.btnTxt,
                        { color: ColorSheet.$Green8 },
                      ]}>
                      Submit
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
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
              <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                  <Text style={CommonStyles.btnTxt}>Ok</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default EditDocument;
