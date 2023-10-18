import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, { useState,useEffect } from 'react';
import { CommisionFreeStyles } from '../CommisionFree/CommisionFreeStyle';
import { EmployeeInfoStyles } from '../EmployeeInfo/EmployeeInfoStyle';
import { DisclosuresStyles } from './DisclosuresStyle';
import { RadioButton } from 'react-native-paper';

import { IdentityStyles } from '../IdentityDetails/IdentityStyle';
import * as yup from 'yup';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import CheckBox from 'react-native-check-box';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { DocumentStyles } from '../Document/DocumentStyle';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DisclosuresScreen1 = ({ navigation }: any) => {
  const [control_person, setcontrol_person] = useState('second');
  const [is_finra, setis_finra] = useState('second');
  const [is_political, setis_political] = useState('second');
  const [is_family, setis_family] = useState('second');

  const [ContextType, setContextType] = useState('');
  const [CompanyName, setCompanyName] = useState('');
  const [CompanyAddress, setCompanyAddress] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [Country, setCountry] = useState('');
  const [Email, setEmail] = useState('');
  const [Check1, setCheck1] = useState(false);
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [isModalerr, setModalerr] = useState(false);
  const [isyesclick, setisyesclick] = useState(false);
  const [Content, setContent] = useState('');
  const [MimeType, setMimeType] = useState('');
  const [getFilename, setFilename] = useState('');

  let show_person: boolean, show_finra: boolean, show_family: boolean = false;
  //---------------
  let Context_arr: any = [];
  let type: string;
  let is_control_person: boolean, is_affiliated_exchange_or_finra: boolean, is_politically_exposed: boolean, immediate_family_exposed: boolean;

  function setStates(state: string, type: string) {
    console.log('hello',state + " " + type)
    if (type == 'control_person') {
      if (state == 'first') { 
        var errmsg = 'Are you sure to upload'
        seterrortext(errmsg)
        setModalerr(true)
        setcontrol_person('first');
         setis_finra('second'); 
         setis_family('second');
          setis_political('second'); 
          show_person = true;
         }
      else { 
        setcontrol_person('second');
        setisyesclick(false);
         show_person = false; 
        }
    }
    else if (type == 'finra') {
      if (state == 'first') {
        var errmsg = 'Are you sure to upload'
        seterrortext(errmsg)
        setModalerr(true)
         setis_finra('first'); 
         setcontrol_person('second'); 
         setis_family('second');
          setis_political('second');
           show_finra = true;
           }
      else { 
        setisyesclick(false)
        setis_finra('second');
         show_finra = false; 
        }
    }
    else if (type == 'political') {
      if (state == 'first') { setis_political('first'); setis_finra('second'); setcontrol_person('second'); setis_family('second'); show_person = false; show_finra = false; show_family = false; }
      else { setis_political('second'); show_person = false; show_finra = false; show_family = false; }
    }
    else if (type == 'family') {
      if (state == 'first') { setis_family('first'); setis_political('second'); setis_finra('second'); setcontrol_person('second'); show_family = true; }
      else { setis_family('second'); show_family = false; }
    }
  }

  const isFamily = async (values: any) => {

    Context_arr = [];

    let context = {
      "context_type": "IMMEDIATE_FAMILY_EXPOSED",
      "given_name": values.GivenName,
      "family_name": values.FamilyName
    }
    Context_arr.push(context);
  }

  const onFinra_or_person = async (values: any) => {

    Context_arr = [];
    console.log(values.CompanyAddress);
    if (control_person == 'first') {
      type = 'CONTROLLED_FIRM';
    }
    if (is_finra == 'first') {
      type = 'AFFILIATE_FIRM';
    }
    let context = {
      "context_type": type,
      "company_name": values.CompanyName,
      "company_street_address": "[" + values.CompanyAddress + "]",
      "company_city": values.City,
      "company_state": values.State,
      "company_country": values.Country,
      "company_compliance_email": values.Email
    }
    Context_arr.push(context);
  }

  const onSubmit1 = async () => {
    var retrievedData: any = await AsyncStorage.getItem('saveempdata');
    // console.log(retrievedData)
    var finalarr = JSON.parse(retrievedData);
    if(retrievedData==null){
      console.log("in if")
    var jobtitle = ''
    var empname = ''
    var empaddress = ''
    var empstatus = ''
    }else {
      console.log("in else")
     jobtitle = finalarr[0].job_title;
     empname = finalarr[0].current_employer;
     empaddress = finalarr[0].address;
     empstatus = finalarr[0].emp_status;
    }
    console.log(jobtitle)
    console.log(empname)
    // return false;

    if (Check1) {
      if (control_person == 'second') {
       
        is_control_person = false;
        console.log('ggg',is_control_person)
      }
      else { is_control_person = true; }
      if (is_finra == 'second') {
        is_affiliated_exchange_or_finra = false;
      }
      else { is_affiliated_exchange_or_finra = true; }
      if (is_political == 'second') {
        is_politically_exposed = false;
      }
      else { is_politically_exposed = true; }
      if (is_family == 'second') {
        immediate_family_exposed = false;
      }
      else { immediate_family_exposed = true; }

      let bodyform: any = await AsyncStorage.getItem('data');
      console.log(bodyform);
      let jsondata = JSON.parse(bodyform);

      // let arrdoc = [];
      // arrdoc.push({
      //   document_type: 'account_approval_letter',
      //   content: Content,
      //   mime_type: MimeType,
      // });
      if(isyesclick==true &&  control_person== 'first') {
        let arrdoc = {
          document_type: 'account_approval_letter',
            content: Content,
            mime_type: MimeType,
        }
            AsyncStorage.setItem(
              'setdocobject',
              JSON.stringify(arrdoc),
            );
      }
      
      //let arr: any = [];
      let disclosures = {
        "is_control_person": is_control_person,
        "is_affiliated_exchange_or_finra": is_affiliated_exchange_or_finra,
        "is_politically_exposed": is_politically_exposed,
        "immediate_family_exposed": immediate_family_exposed,
        "employment_status":empstatus,
       

        ...(empstatus== 'employee' &&
        {"employer_name": empname,"employer_address":empaddress,"employment_position": jobtitle}),

          ...((isyesclick==true &&  control_person== 'first' ) &&{"document_type": "account_approval_letter"})
      }
      // let doc = {
      //   "document_type": "account_approval_letter",
      //   "content": Content,
      //   "mime_type":  MimeType
      // }
      // let final_obj;
      let dis;
      // if (is_control_person == false && is_affiliated_exchange_or_finra == false && immediate_family_exposed == false && (is_politically_exposed == true || is_politically_exposed == false)) { dis = { ...jsondata, "disclosures": disclosures } }
      // else {
      //   final_obj = { ...disclosures, "context": Context_arr };
      //   dis = { ...jsondata, "disclosures": final_obj };
      // }
      dis = { ...jsondata, "disclosures": disclosures }
      console.log('discl',dis);
      AsyncStorage.setItem('data', JSON.stringify(dis));
      navigation.navigate('Agreement');
      console.log("Obj>> ", dis);
    } else {
      var errmsg = 'Please select sign aggreement'
          seterrortext(errmsg)
          setModalCreate(true)
    }
  };

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };
  
  const toggleModalerr  = () => {
    setModalerr(!isModalerr);
    setisyesclick(false);
  };
  const cancelbtn = async () => {

    setModalerr(false)
    setisyesclick(false);
  };
  const confirmiscontrol = async () => {
    setisyesclick(true);
    setModalerr(false)
  }

  const ChooseFromGalary = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      var storename = res[0].name;
      var storemime: any = res[0].type;
      var storeuri: any = res[0].uri;
      console.log('tttt', storename);
      console.log('mmm', storeuri);

      setFilename(storename);
      setMimeType(storemime);
      RNFS.readFile(storeuri, 'base64').then(resp => {
        setContent(resp);
        // console.log('yyyy', resp);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        var errmsg = 'Canceled from single doc picker'
          seterrortext(errmsg)
          setModalCreate(true)
      } else {
        var errmsg = JSON.stringify(err)
          seterrortext(errmsg)
          setModalCreate(true)
        throw err;
      }
    }
  };
  // const onLoadfun = async () => {
  //   var retrievedData: any = await AsyncStorage.getItem('saveempdata');
  //   var finalarr = JSON.parse(retrievedData);
  //   var job
  //   console.log('ddd get',finalarr[0].job_title)
  // };

  // useEffect(() => {
  //   onLoadfun()
  // }, []);

  return (
    <View style={CommonStyles.ContainerPink}>
      <ScrollView>
        <View style={[CommisionFreeStyles.dotView]}>
          <View style={CommisionFreeStyles.dot} />
          <View style={CommisionFreeStyles.dot} />
          <View
            style={[CommisionFreeStyles.dot, CommisionFreeStyles.longDash]}
          />
          <View style={CommisionFreeStyles.dot} />
          <View style={CommisionFreeStyles.dot} />
          <View style={CommisionFreeStyles.dot} />
        </View>
        <View style={CommonStyles.sideSpace}>
          <Text style={[EmployeeInfoStyles.infoHeading, CommonStyles.nomarBott]}>
            Disclosures
          </Text>
        </View>
        <View style={DisclosuresStyles.optionView}>
          <Text style={DisclosuresStyles.txt1}>Is control person?</Text>
          <Text style={DisclosuresStyles.txt2}>
          A control person is one who: (1) owns or controls 10% or more of the voting stock of a corporation
          </Text>
          <View style={DisclosuresStyles.radiobtn}>
            <View style={CommonStyles.radOut}>
              <RadioButton
                value="second"
                color={ColorSheet.$Green8}
                status={control_person === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setStates('second', 'control_person')} //setcontrol_person('second')
              />
              <Text style={DisclosuresStyles.checkTxt}>False</Text>
            </View>
            <View style={CommonStyles.radOut}>
              <RadioButton
                value="first"
                color={ColorSheet.$Green8}
                status={control_person === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setStates('first', 'control_person')}//setcontrol_person('first')
              />
              <Text style={DisclosuresStyles.checkTxt}>True</Text>
            </View>
          </View>
          <View>
          {(control_person !== 'second' && isyesclick) ? (
            <>
             <Text style={CommonStyles.labelText}>Attach file</Text>
             <View style={CommonStyles.fileOut}>
               <Text
                 style={[CommonStyles.inputField, DocumentStyles.DocName]}>
                 {getFilename}
               </Text>
               <TouchableOpacity onPress={() => ChooseFromGalary()}>
                 <View style={DocumentStyles.attachmentView}>
                   <MaterialCommunityIcons
                     style={DocumentStyles.attachPin}
                     name="attachment"
                   />
                 </View>
               </TouchableOpacity>
             </View>
             </>
          ): null}
          </View>
        </View>

        <View style={DisclosuresStyles.optionView}>
          <Text style={DisclosuresStyles.txt1}>
            Is Affiliated exchange or finra?
          </Text>
          <Text style={DisclosuresStyles.txt2}>
          Affiliated Exchange means, in respect of an Index Component, an exchange, a trading or quotation system on which options and futures contracts on the Index Component in question are traded, as specified by the Calculation Agent.
          </Text>
          <View style={DisclosuresStyles.radiobtn}>
            <View style={CommonStyles.radOut}>
              <RadioButton
                value="second"
                color={ColorSheet.$Green8}
                status={is_finra === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setStates('second', 'finra')}// setis_finra('second')
              />
              <Text style={DisclosuresStyles.checkTxt}>False</Text>
            </View>
            <View style={CommonStyles.radOut}>
              <RadioButton
                value="first"
                color={ColorSheet.$Green8}
                status={is_finra === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setStates('first', 'finra')}//setis_finra('first')
              />
              <Text style={DisclosuresStyles.checkTxt}>True</Text>
            </View>
          </View>
          <View>
          {(is_finra !== 'second'  && isyesclick) ? (
             <>
             <Text style={CommonStyles.labelText}>Attach file</Text>
             <View style={CommonStyles.fileOut}>
               <Text
                 style={[CommonStyles.inputField, DocumentStyles.DocName]}>
                 {getFilename}
               </Text>
               <TouchableOpacity onPress={() => ChooseFromGalary()}>
                 <View style={DocumentStyles.attachmentView}>
                   <MaterialCommunityIcons
                     style={DocumentStyles.attachPin}
                     name="attachment"
                   />
                 </View>
               </TouchableOpacity>
             </View>
             </>
          ): null}
          </View>
          {/* <View>
            {is_finra !== 'second' || control_person !== 'second' ? (
              <Formik
                initialValues={{
                  ContextType: '',
                  CompanyName: '',
                  CompanyAddress: '',
                  City: '',
                  State: '',
                  Country: '',
                  Email: '',
                }}
                onSubmit={onFinra_or_person}
                validationSchema={yup.object().shape({
                  ContextType: yup.string().required(),
                  CompanyName: yup.string().required(),
                  CompanyAddress: yup.string().required(),
                  City: yup.string().required(),
                  State: yup.string().required(),
                  Country: yup.string().required(),
                  Email: yup.string().required(),
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
                    <Text style={DisclosuresStyles.CompTxt}>
                      Company Details
                    </Text>
                    <Text style={CommonStyles.labelText}>Context type</Text>
                    <TextInput
                      placeholder="Context type"
                      placeholderTextColor={ColorSheet.$Gray6}
                      style={CommonStyles.inputField}
                      defaultValue={values.ContextType}
                      onChangeText={handleChange('ContextType')}
                      onChange={() => setContextType(values.ContextType)}
                      onBlur={() => setFieldTouched('Context')}
                    />
                    {touched.ContextType && errors.ContextType && (
                      <Text style={[CommonStyles.errorRed]}>
                        {errors.ContextType}
                      </Text>
                    )}
                    <Text style={CommonStyles.labelText}>Company name</Text>
                    <TextInput
                      placeholder="Company name"
                      placeholderTextColor={ColorSheet.$Gray6}
                      style={CommonStyles.inputField}
                      defaultValue={values.CompanyName}
                      onChangeText={handleChange('CompanyName')}
                      onChange={() => setCompanyName(values.CompanyName)}
                      onBlur={() => setFieldTouched('CompanyName')}
                    />
                    {touched.CompanyName && errors.CompanyName && (
                      <Text style={[CommonStyles.errorRed]}>
                        {errors.CompanyName}
                      </Text>
                    )}
                    <Text style={CommonStyles.labelText}>Company street address</Text>
                    <TextInput
                      placeholder="Company street address"
                      placeholderTextColor={ColorSheet.$Gray6}
                      style={CommonStyles.inputField}
                      defaultValue={values.CompanyAddress}
                      onChangeText={handleChange('CompanyAddress')}
                      onChange={() => setCompanyAddress(values.CompanyAddress)}
                      onBlur={() => setFieldTouched('CompanyAddress')}
                    />
                    {touched.CompanyAddress && errors.CompanyAddress && (
                      <Text style={[CommonStyles.errorRed]}>
                        {errors.CompanyAddress}
                      </Text>
                    )}

                    <View style={CommonStyles.smFild}>
                      <View style={CommonStyles.smFildInn}>
                      <Text style={CommonStyles.labelText}>City</Text>
                        <TextInput
                          placeholder="City"
                          placeholderTextColor={ColorSheet.$Gray6}
                          style={[CommonStyles.inputField]}
                          defaultValue={values.City}
                          onChangeText={handleChange('City')}
                          onChange={() => setCity(values.City)}
                          onBlur={() => setFieldTouched('City')}
                        />
                        {touched.City && errors.City && (
                          <Text style={[CommonStyles.errorRed]}>
                            {errors.City}
                          </Text>
                        )}
                      </View>
                      <View style={CommonStyles.smFildInn}>
                      <Text style={CommonStyles.labelText}>State</Text>
                        <TextInput
                          placeholder="State"
                          placeholderTextColor={ColorSheet.$Gray6}
                          style={[CommonStyles.inputField]}
                          defaultValue={values.State}
                          onChangeText={handleChange('State')}
                          onChange={() => setState(values.State)}
                          onBlur={() => setFieldTouched('State')}
                        />
                        {touched.State && errors.State && (
                          <Text style={[CommonStyles.errorRed]}>
                            {errors.State}
                          </Text>
                        )}
                      </View>
                    </View>
                    <Text style={CommonStyles.labelText}>Country</Text>
                    <TextInput
                      placeholder="Country"
                      placeholderTextColor={ColorSheet.$Gray6}
                      style={CommonStyles.inputField}
                      defaultValue={values.Country}
                      onChangeText={handleChange('Country')}
                      onChange={() => setCountry(values.Country)}
                      onBlur={() => setFieldTouched('Country')}
                    />
                    {touched.Country && errors.Country && (
                      <Text style={[CommonStyles.errorRed]}>
                        {errors.Country}
                      </Text>
                    )}
                    <Text style={CommonStyles.labelText}>Email</Text>
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor={ColorSheet.$Gray6}
                      style={[
                        CommonStyles.inputField,
                        CommonStyles.inputFieldLast,
                      ]}
                      defaultValue={values.Email}
                      onChangeText={handleChange('Email')}
                      onChange={() => setEmail(values.Email)}
                      onBlur={() => setFieldTouched('Email')}
                    />
                    {touched.Email && errors.Email && (
                      <Text style={[CommonStyles.errorRed]}>
                        {errors.Email}
                      </Text>
                    )}
                  </View>
                )}
              </Formik>
            ) : null}
          </View> */}
        </View>

        <View style={DisclosuresStyles.optionView}>
          <Text style={DisclosuresStyles.txt1}>Is politically exposed?</Text>
          <Text style={DisclosuresStyles.txt2}>
          Politically Exposed Person is someone who, through their prominent position or influence, is more susceptible to being involved in bribery or corruption
          </Text>
          <View style={DisclosuresStyles.radiobtn}>
            <View style={CommonStyles.radOut}>
              <RadioButton
                value="second"
                color={ColorSheet.$Green8}
                status={is_political === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setStates('second', 'political')}// setis_political('second')
              />
              <Text style={DisclosuresStyles.checkTxt}>False</Text>
            </View>
            <View style={CommonStyles.radOut}>
              <RadioButton
                value="first"
                color={ColorSheet.$Green8}
                status={is_political === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setStates('first', 'political')}//setis_political('first')
              />
              <Text style={DisclosuresStyles.checkTxt}>True</Text>
            </View>
          </View>
        </View>
        <View style={DisclosuresStyles.optionViewLast}>
          <Text style={DisclosuresStyles.txt1}>Immediate family exposed?</Text>
          <Text style={DisclosuresStyles.txt2}>
          Immediate Family Members who are Considered PEPs – Parents and children of PEPs, Spouse or partner, Siblings, Uncles, and aunts. Even slightly indirect family members (such as in-laws) will be considered as politically exposed persons.
          </Text>
          <View style={DisclosuresStyles.radiobtn}>
            <View style={CommonStyles.radOut}>
              <RadioButton
                value="second"
                color={ColorSheet.$Green8}
                status={is_family === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setStates('second', 'family')}//setis_family('second')
              />
              <Text style={DisclosuresStyles.checkTxt}>False</Text>
            </View>
            <View style={CommonStyles.radOut}>
              <RadioButton
                value="first"
                color={ColorSheet.$Green8}
                status={is_family === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setStates('first', 'family')}//setis_family('first')
              />
              <Text style={DisclosuresStyles.checkTxt}>True</Text>
            </View>
          </View>
          {/* <View>
            {is_family !== 'second' ?
              <Formik
                initialValues={{
                  GivenName: '',
                  FamilyName: '',
                }}
                onSubmit={isFamily}
                validationSchema={yup.object().shape({
                  GivenName: yup.string().required(),
                  FamilyName: yup.string().required(),
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
                    <Text style={DisclosuresStyles.CompTxt}>Company Details</Text>
                    <Text style={CommonStyles.labelText}>Given Name</Text>
                    <TextInput
                      placeholder="Given Name"
                      placeholderTextColor={ColorSheet.$Gray6}
                      style={CommonStyles.inputField}
                      defaultValue={values.GivenName}
                      onChangeText={handleChange('GivenName')}
                      onChange={() => setCompanyName(values.GivenName)}
                      onBlur={() => setFieldTouched('GivenName')}
                    />
                    {touched.GivenName && errors.GivenName && (
                      <Text style={[CommonStyles.error]}>{errors.GivenName}</Text>
                    )}
                    <Text style={CommonStyles.labelText}>Given Name</Text>
                    <TextInput
                      placeholder="Family Name"
                      placeholderTextColor={ColorSheet.$Gray6}
                      style={CommonStyles.inputField}
                      defaultValue={values.FamilyName}
                      onChangeText={handleChange('FamilyName')}
                      onChange={() => setCompanyAddress(values.FamilyName)}
                      onBlur={() => setFieldTouched('FamilyName')}
                    />
                    {touched.FamilyName && errors.FamilyName && (
                      <Text style={[CommonStyles.error]}>
                        {errors.FamilyName}
                      </Text>
                    )}
                    <TouchableOpacity
                      onPress={() => handleSubmit()}                  >
                      <View style={[CommonStyles.btnCotainer, IdentityStyles.marginBtn]}>
                        <Text style={CommonStyles.btnTxt}>Submit Context</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik> : null}
          </View> */}
        </View>
        <View style={[CommonStyles.sideSpace, CommonStyles.commonBotSP]}>
        <View style={CommonStyles.checkBoxOut}>
          <CheckBox
            onClick={() => setCheck1(!Check1)}
            isChecked={Check1}
            checkBoxColor={ColorSheet.$Green8}
            style={CommonStyles.checkBox}
          />
          <Text style={CommonStyles.AgreeTxt}>
            I understand I am signing this agreement electronically, and
            that my electronic signature will have the same effect as
            physically signing and returning the Application Agreement.
          </Text>
        </View>
       
          <TouchableOpacity onPress={() => onSubmit1()}>
            <View style={CommonStyles.btnCotainer}>
              <Text style={CommonStyles.btnTxt}>Next</Text>
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
                <View style={[CommonStyles.btnCotainer, {marginTop: 10}]}>
                  <Text style={CommonStyles.btnTxt}>Ok</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal isVisible={isModalerr}>
          <View style={WatchListStyles.ModalView}>
            <TouchableOpacity onPress={toggleModalerr}>
              <View style={CommonStyles.closeBtnView}>
                <Ionicons name="close" style={CommonStyles.clodeICon} />
              </View>
            </TouchableOpacity>
            <Text style={WatchListStyles.PopupHeader}>
              {errortext}
            </Text>
   
            <View style={CommonStyles.commonBotSP}>
              <TouchableOpacity onPress={confirmiscontrol}>
                <View style={[CommonStyles.btnCotainer, {marginTop: 10}]}>
                  <Text style={CommonStyles.btnTxt}>Yes</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelbtn}>
                <View style={[CommonStyles.btnCotainer, {marginTop: 10}]}>
                  <Text style={CommonStyles.btnTxt}>No</Text>
                </View>
              </TouchableOpacity>
            </View>
     
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default DisclosuresScreen1;
