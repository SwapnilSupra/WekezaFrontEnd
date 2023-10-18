import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommisionFreeStyles } from '../CommisionFree/CommisionFreeStyle';
import { EmployeeInfoStyles } from '../EmployeeInfo/EmployeeInfoStyle';
import DateTimePicker, {
} from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import { Formik } from 'formik';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CheckBox from 'react-native-check-box';
import Modal from 'react-native-modal';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';

const IdentityDetails = ({ navigation }: any) => {

  const [Gname, setGname] = useState('');
  const [Mname, setMname] = useState('');
  const [Fname, setFname] = useState('');
  const [SSN, setSSN] = useState('');
  const [Tax, setTax] = useState('');
  const [FundSource, setFundSource] = useState('');
  const [date, setDate]: any = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [Check1, setCheck1] = useState(false);
  const [finalssn, setfinalssn] = useState('');
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [value, setValue] = React.useState('Yes');
  const [showtext, setshowtext] = useState(false);
  const [citizentype, setcitizentype] = useState('');
  const [showlist, setshowlist] = useState(false);
  const [value2, setValue2] = React.useState('Yes');
  const [visatype, setvisatype] = useState('');

  const [visaexpiration, setvisaexpiration] = useState(new Date());
  const [departure, setDeparture] = useState(new Date());
  // const [endmode, setendMode] = useState('date');
  const [endshow, setendShow] = useState(false);
  const [endmode, setendMode] = useState('date');
  const [expshow, setexpShow] = useState(false);
  //-------------
  let email,
    phone_no: any,
    st_add: any,
    city: any,
    state: any,
    postal: any,
    country: any;

  var fundingMenu = [
    'employment_income',
    'investments',
    'inheritance',
    'business_income',
    'savings',
    'family',
  ];

  var cititype = [
    'Green Card',
    'Visa',
  ];

  var vistamenu = [
    'B1', 'B2', 'DACA', 'E1', 'E2', 'E3', 'F1', 'G4', 'H1B', 'J1', 'L1', 'O1', 'TN1', 'OTHER'
  ];

  const onSubmit = async (values: any) => {

    var annmin: any = await AsyncStorage.getItem('minannual');
    var annmax: any = await AsyncStorage.getItem('maxannual');

    var liqmin: any = await AsyncStorage.getItem('minliq');
    var liqmax: any = await AsyncStorage.getItem('maxliq');

    var todayYear = (new Date()).getFullYear();
    var arr = date.split("-");
    var comdate = (arr[0])
    var datestrnewchk = (todayYear - comdate);
    var bodyformdata;

    if (FundSource !== '') {
      if ((datestrnewchk >= 18)) {
        email = await AsyncStorage.getItem('emailstore');
        let conact_data: any = await AsyncStorage.getItem('insertedquestarr');
        let chk = JSON.parse(conact_data);
        console.log("print contact" + JSON.stringify(chk))
        let obj = chk.map((postData: any) => {
          phone_no = postData.phone_no;
          st_add = postData.street_address;
          city = postData.city;
          state = postData.state;
          postal = postData.postal_code;
          country = postData.country;
        });
        if (citizentype == 'Green Card') {
          console.log('in if', citizentype)
          bodyformdata = {

            "contact": {
              "email_address": email,
              "phone_number": phone_no,
              "street_address": [st_add],
              "city": city,
              "unit": "",
              "state": state,
              "postal_code": postal,
              "country": country
            },
            "identity": {
              "given_name": Gname,
              "middle_name": values.Mname,
              "family_name": Fname,
              "date_of_birth": date,
              "tax_id": SSN,
              "tax_id_type": "USA_SSN",
              "country_of_citizenship": values.Citizenship.toUpperCase(),
              "country_of_birth": values.CountryBirth.toUpperCase(),
              "country_of_tax_residence": "USA",
              "funding_source": [FundSource],
              "annual_income_min": annmin,
              "annual_income_max": annmax,
              "liquid_net_worth_min": liqmin,
              "liquid_net_worth_max": liqmax,
              "permanent_resident": true
            }
          }
          console.log('hiiii' + JSON.stringify(bodyformdata));
        } else if (citizentype == 'Visa') {
          console.log('in if 22', citizentype)
          bodyformdata = {

            "contact": {
              "email_address": email,
              "phone_number": phone_no,
              "street_address": [st_add],
              "city": city,
              "unit": "",
              "state": state,
              "postal_code": postal,
              "country": country
            },
            "identity": {
              "given_name": Gname,
              "middle_name": values.Mname,
              "family_name": Fname,
              "date_of_birth": date,
              "tax_id": SSN,
              "tax_id_type": "USA_SSN",
              "country_of_citizenship": values.Citizenship.toUpperCase(),
              "country_of_birth": values.CountryBirth.toUpperCase(),
              "country_of_tax_residence": "USA",
              "funding_source": [FundSource],
              "annual_income_min": annmin,
              "annual_income_max": annmax,
              "liquid_net_worth_min": liqmin,
              "liquid_net_worth_max": liqmax,
              "visa_type": visatype,
              "visa_expiration_date": visaexpiration,
              ...((visatype == 'B1' || visatype == 'B2') && { "date_of_departure_from_usa": departure })
            }
          }
          console.log('hiiii' + JSON.stringify(bodyformdata));
        } else {
          console.log('in else')
          bodyformdata = {

            "contact": {
              "email_address": email,
              "phone_number": phone_no,
              "street_address": [st_add],
              "city": city,
              "unit": "",
              "state": state,
              "postal_code": postal,
              "country": country
            },
            "identity": {
              "given_name": Gname,
              "middle_name": values.Mname,
              "family_name": Fname,
              "date_of_birth": date,
              "tax_id": SSN,
              "tax_id_type": "USA_SSN",
              "country_of_citizenship": "USA",
              "country_of_birth": "USA",
              "country_of_tax_residence": "USA",
              "funding_source": [FundSource],
              "annual_income_min": annmin,
              "annual_income_max": annmax,
              "liquid_net_worth_min": liqmin,
              "liquid_net_worth_max": liqmax,
            }
          }
          console.log('hiiii' + JSON.stringify(bodyformdata));
        }
        if (await AsyncStorage.getItem('setflagidentity') == 'editidentity') {

          let bodyform: any = await AsyncStorage.getItem('data');
          let jsondata = JSON.parse(bodyform);
          // var flagnewobj = JSON.stringify(bodyformdata)
          var contact;
          var identity;

          jsondata.contact = null
          jsondata.identity = null;
          if (citizentype == 'Green Card') {
            contact = {
              "email_address": email,
              "phone_number": phone_no,
              "street_address": [st_add],
              "city": city,
              "unit": "",
              "state": state,
              "postal_code": postal,
              "country": country
            }
            identity = {
              "given_name": Gname,
              "middle_name": values.Mname,
              "family_name": Fname,
              "date_of_birth": date,
              "tax_id": SSN,
              "tax_id_type": "USA_SSN",
              "country_of_citizenship": values.Citizenship.toUpperCase(),
              "country_of_birth": values.CountryBirth.toUpperCase(),
              "country_of_tax_residence": "USA",
              "funding_source": [FundSource],
              "annual_income_min": annmin,
              "annual_income_max": annmax,
              "liquid_net_worth_min": liqmin,
              "liquid_net_worth_max": liqmax,
              "permanent_resident": true
            }
          } else if (citizentype == 'Visa') {
            contact = {
              "email_address": email,
              "phone_number": phone_no,
              "street_address": [st_add],
              "city": city,
              "unit": "",
              "state": state,
              "postal_code": postal,
              "country": country
            }
            identity = {
              "given_name": Gname,
              "middle_name": values.Mname,
              "family_name": Fname,
              "date_of_birth": date,
              "tax_id": SSN,
              "tax_id_type": "USA_SSN",
              "country_of_citizenship": values.Citizenship.toUpperCase(),
              "country_of_birth": values.CountryBirth.toUpperCase(),
              "country_of_tax_residence": "USA",
              "funding_source": [FundSource],
              "annual_income_min": annmin,
              "annual_income_max": annmax,
              "liquid_net_worth_min": liqmin,
              "liquid_net_worth_max": liqmax,
              "visa_type": visatype,
              "visa_expiration_date": visaexpiration,
              ...((visatype == 'B1' || visatype == 'B2') && { "date_of_departure_from_usa": departure })
            }
          } else {

            contact = {
              "email_address": email,
              "phone_number": phone_no,
              "street_address": [st_add],
              "city": city,
              "unit": "",
              "state": state,
              "postal_code": postal,
              "country": country
            }
            identity = {
              "given_name": Gname,
              "middle_name": values.Mname,
              "family_name": Fname,
              "date_of_birth": date,
              "tax_id": SSN,
              "tax_id_type": "USA_SSN",
              "country_of_citizenship": "USA",
              "country_of_birth": "USA",
              "country_of_tax_residence": "USA",
              "funding_source": [FundSource],
              "annual_income_min": annmin,
              "annual_income_max": annmax,
              "liquid_net_worth_min": liqmin,
              "liquid_net_worth_max": liqmax,
            }
          }
          // console.log("temp print",flagnewobj);
          let dis = { ...jsondata, "contact": contact, "identity": identity }
          AsyncStorage.setItem('data', JSON.stringify(dis));
          console.log('test coo', JSON.stringify(dis))
          navigation.navigate('Summary');
          AsyncStorage.removeItem('setflagidentity');
        } else {
          AsyncStorage.setItem('data', JSON.stringify(bodyformdata));
          navigation.navigate('DisclosuresScreen1');
          console.log('obj ide', JSON.stringify(bodyformdata))
        }
      } else {
        var errmsg = 'Age should be more than 18'
        seterrortext(errmsg)
        setModalCreate(true)
      }
    } else {
      var errmsg = 'Please select Funding sources'
      seterrortext(errmsg);
      setModalCreate(true);
    }
  };

  const onChange = (event: any, selectedDate: any) => {

    var currentDate = selectedDate;

    var datestr: any = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, "0") + '-' + currentDate.getDate().toString().padStart(2, "0")
    var arr = datestr.split("-");
    var comdate = (arr[0])

    var todayYear = (new Date()).getFullYear();

    var datestrnew = (todayYear - comdate);
    console.log('ddd dddd ', datestrnew);
    if (datestrnew <= 18) {
      // Alert.alert("Age should be more than 18")
      var errmsg = 'Age should be more than 18'
      seterrortext(errmsg)
      setModalCreate(true)
    }
    setShow(false);
    setDate(datestr);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setDate(new Date())
    showMode('date');
    console.log('');
  };

  const onLoadfun = async () => {

    setshowtext(true)
    var initdt: any = (new Date().getFullYear()).toString() + '-' + (new Date().getMonth() + 1).toString().padStart(2, "0") + '-' + new Date().getDate().toString().padStart(2, "0");
    setDate(initdt);
    // setDate(new Date())
    let storefname: any = await AsyncStorage.getItem('userfname');
    let storelname: any = await AsyncStorage.getItem('userlname');
    // let fullnamenew = storefname + ' ' + storelname;
    setGname(storefname);
    setFname(storelname);
  };

  function myFunc(valssn: any) {

    var patt = new RegExp("\d{3}[\-]\d{2}[\-]\d{4}");
    var res = patt.test(valssn);
    console.log('result' + res)
    if (!res) {
      console.log("in if")
      valssn = valssn
        .match(/\d*/g).join('')
        .match(/(\d{0,3})(\d{0,2})(\d{0,4})/).slice(1).join('-')
        .replace(/-*$/g, '');
      var finalssnval = valssn
      setSSN(finalssnval)
      setfinalssn(finalssnval)
    }
  }

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  const clckradio = async (val: any) => {

    if (val == 'Yes') {
      setValue('Yes')
      setshowtext(true);
      setcitizentype('');
      setValue2('');
      setshowlist(false);
    } else {
      setValue('No');
      setshowtext(false);
    }
  }

  const clckradio2 = async (val: any) => {
    if (val == 'Yes') {
      setValue2('Yes')
    } else {
      setValue2('No');
    }
  }

  const setelement = async (item: any, index: any) => {

    setcitizentype(item);
    if (index == 0) {
      setshowlist(true);
    }
    else {
      setshowlist(false);
    }
  }

  const setelementvisa = async (item: any, index: any) => {

    console.log(item, index);
    setvisatype(item);
  }

  const onChangeexp = (event: any, selectedDate: any) => {

    var currentDate = selectedDate;
    var datestr: any = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, "0") + '-' + currentDate.getDate().toString().padStart(2, "0")

    console.log('exp date ', datestr);
    setexpShow(false);
    setvisaexpiration(datestr);
  };

  const showexpDatepicker = () => {
    setvisaexpiration(new Date())
    showexpMode('date');
    console.log('show dtp');
  };

  const showexpMode = (currentMode: any) => {
    setexpShow(true);
    setendMode(currentMode);
  };

  const onChangedtend = (event: any, selectedDate: any) => {

    var currentDate = selectedDate;
    var datestr: any = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, "0") + '-' + currentDate.getDate().toString().padStart(2, "0");
    console.log('depar dt', datestr);
    setendShow(false);
    setDeparture(datestr);
  };

  const showendDatepicker = () => {

    setDeparture(new Date())
    showendMode('date');
    console.log('show dtp');
  };

  const showendMode = (currentMode: any) => {
    setendShow(true);
    setendMode(currentMode);
  };

  useEffect(() => {

    onLoadfun();
    var initdt: any = new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, "0") + '-' + new Date().getDate().toString().padStart(2, "0");
    var initdtdep: any = new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, "0") + '-' + new Date().getDate().toString().padStart(2, "0");
    setvisaexpiration(initdt)
    setDeparture(initdtdep)
  }, []);

  return (
    <View style={CommonStyles.ContainerPink}>
      <ScrollView decelerationRate={0.5}>
        <View style={[CommonStyles.sideSpace, CommonStyles.commonBotSP]}>
          <View style={[CommisionFreeStyles.dotView]}>
            <View style={CommisionFreeStyles.dot} />
            <View
              style={[CommisionFreeStyles.dot, CommisionFreeStyles.longDash]}
            />
            <View style={CommisionFreeStyles.dot} />
            <View style={CommisionFreeStyles.dot} />
            <View style={CommisionFreeStyles.dot} />
            <View style={CommisionFreeStyles.dot} />
          </View>
          <Text style={EmployeeInfoStyles.infoHeading}>
            Identity Details
          </Text>
          <Formik
            enableReinitialize
            initialValues={{
              // Gname: '',
              Mname: '',
              // Fname: '',
              SSN: '',
              Tax: '',
              Citizenship: '',
              CountryBirth: '',
              visatype: '',
              // CountryTax: '',
            }}
            onSubmit={onSubmit}
            validationSchema={yup.object().shape({
              // Gname: yup.string().required(),
              Mname: yup.string().required(),
              // Fname: yup.string().required(),
              SSN: yup.string().required().matches(/^(\d{3}-?\d{2}-?\d{4}|XXX-XX-XXXX)$/, 'Please enter valid ssn number').required(),
              Tax: yup.string(),
              visatype: yup.string()
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
                <View style={CommonStyles.smFild}>
                  <View style={CommonStyles.smFildInn}>
                    <Text style={CommonStyles.labelText}>Given Name</Text>
                    <TextInput
                      placeholder="Given Name"
                      placeholderTextColor={ColorSheet.$Gray6}
                      style={[CommonStyles.inputField]}
                      editable={false}
                      value={Gname}
                    />
                    {/* {touched.Gname && errors.Gname && (
                      <Text style={[CommonStyles.error]}>{errors.Gname}</Text>
                    )} */}
                  </View>
                  <View style={CommonStyles.smFildInn}>
                    <Text style={CommonStyles.labelText}>Middle Name</Text>
                    <TextInput
                      placeholder="Middle Name"
                      placeholderTextColor={ColorSheet.$Gray6}
                      style={[CommonStyles.inputField]}
                      defaultValue={values.Mname}
                      onChangeText={handleChange('Mname')}
                      onChange={() => setMname(values.Mname)}
                      onBlur={() => setFieldTouched('Mname')}
                    />
                    {touched.Mname && errors.Mname && (
                      <Text style={[CommonStyles.error]}>{errors.Mname}</Text>
                    )}
                  </View>
                </View>
                <Text style={CommonStyles.labelText}>Family Name</Text>
                <TextInput
                  placeholder="Family Name"
                  placeholderTextColor={ColorSheet.$Gray6}
                  style={[CommonStyles.inputField]}
                  editable={false}
                  value={Fname}
                />
                {/* {touched.Fname && errors.Fname && (
                  <Text style={[CommonStyles.error]}>{errors.Fname}</Text>
                )} */}
                <Text style={CommonStyles.labelText}>Date of birth</Text>
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
                <Text style={CommonStyles.labelText}>SSN Number</Text>
                <TextInput
                  placeholder="SSN Number (XXX-XX-XXXX)"
                  placeholderTextColor={ColorSheet.$Gray6}
                  style={CommonStyles.inputField}
                  defaultValue={finalssn}
                  onChangeText={handleChange('SSN')}
                  onChange={() => setSSN(values.SSN)}
                  // onBlur={() => setFieldTouched('SSN')}
                  //onBlur={() => myFunc(values.SSN)}
                  maxLength={11}
                />
                {touched.SSN && errors.SSN && (
                  <Text style={[CommonStyles.error]}>{errors.SSN}</Text>
                )}
                <Text style={CommonStyles.labelText}>USA_SSN</Text>
                <TextInput
                  placeholder="USA_SSN"
                  placeholderTextColor={ColorSheet.$Gray6}
                  style={CommonStyles.inputField}
                  defaultValue={values.Tax}
                  onChangeText={handleChange('Tax')}
                  onChange={() => setTax(values.Tax)}
                  onBlur={() => setFieldTouched('Tax')}
                />
                {touched.Tax && errors.Tax && (
                  <Text style={[CommonStyles.error]}>{errors.Tax}</Text>
                )}


                <View>
                  <Text>Are you a citizen of the United States?</Text>
                  <RadioButton.Group onValueChange={clckradio} value={value}>
                    <View style={WatchListStyles.CheckBoxViewIdentTop}>
                      <Text style={WatchListStyles.AsenDsenTxt}>Yes</Text>
                      <RadioButton value="Yes" color={ColorSheet.$DarkGreen} />
                    </View>
                    <View style={WatchListStyles.CheckBoxViewIdent}>
                      <Text style={WatchListStyles.AsenDsenTxt}>No</Text>
                      <RadioButton value="No" color={ColorSheet.$DarkGreen} />
                    </View>
                  </RadioButton.Group>
                </View>
                {showtext == true ?
                  <>
                    <Text style={CommonStyles.labelText}>Country of Citizenship</Text>
                    <TextInput
                      placeholder="Country of Citizenship"
                      placeholderTextColor={ColorSheet.$Gray6}
                      style={CommonStyles.inputField}
                      defaultValue={'USA'}
                      editable={false}
                    /></> :
                  <>
                    <Text style={CommonStyles.labelText}>Select type of citizen</Text>
                    <SelectDropdown
                      data={cititype}
                      renderDropdownIcon={(selectedItem: any, index: number) => (
                        <Fontisto
                          name="angle-down"
                          style={CommonStyles.DropdownIcon}
                        />
                      )}
                      dropdownIconPosition="right"
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
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
                    /></>
                }
                {/* {touched.Citizenship && errors.Citizenship && (
                  <Text style={[CommonStyles.error]}>{errors.Citizenship}</Text>
                )} */}



                {showtext == true &&
                  <>
                    <Text style={CommonStyles.labelText}>Country of Birth</Text>
                    <TextInput
                      placeholder="Country of Birth"
                      placeholderTextColor={ColorSheet.$Gray6}
                      style={CommonStyles.inputField}
                      defaultValue={'USA'}
                      editable={false}
                    /></>}
                {showlist == true ?
                  <>
                    <Text>Are you Permanent Resident?</Text>
                    <RadioButton.Group onValueChange={clckradio2} value={value2}>
                      <View style={WatchListStyles.CheckBoxViewIdentTop}>
                        <Text style={WatchListStyles.AsenDsenTxt}>Yes</Text>
                        <RadioButton value="Yes" color={ColorSheet.$DarkGreen} />
                      </View>
                      <View style={WatchListStyles.CheckBoxViewIdent}>
                        <Text style={WatchListStyles.AsenDsenTxt}>No</Text>
                        <RadioButton value="No" color={ColorSheet.$DarkGreen} />
                      </View>
                    </RadioButton.Group>
                  </> : null}
                {citizentype == 'Visa' || citizentype == 'Green Card' ?
                  <>
                    <Text style={CommonStyles.labelText}>Country of Birth</Text>
                    <TextInput
                      placeholder="Country of Birth"
                      placeholderTextColor={ColorSheet.$Gray6}
                      style={CommonStyles.inputField}
                      defaultValue={values.CountryBirth}
                      onChangeText={handleChange('CountryBirth')}
                      onChange={() => setMname(values.CountryBirth)}
                      onBlur={() => setFieldTouched('CountryBirth')}
                    // defaultValue={'USA'}
                    // editable={false}
                    /></> : null}
                {citizentype == 'Visa' || citizentype == 'Green Card' ?
                  <>
                    <Text style={CommonStyles.labelText}>Country of Citizenship</Text>

                    <TextInput
                      placeholder="Country of Citizenship"
                      placeholderTextColor={ColorSheet.$Gray6}
                      style={CommonStyles.inputField}
                      defaultValue={values.Citizenship}
                      onChangeText={handleChange('Citizenship')}
                      onChange={() => setMname(values.Citizenship)}
                      onBlur={() => setFieldTouched('Citizenship')}
                    /></> : null}

                {citizentype == 'Visa' &&
                  <>
                    <Text style={CommonStyles.labelText}>Visa Type</Text>
                    <SelectDropdown
                      data={vistamenu}
                      renderDropdownIcon={(selectedItem: any, index: number) => (
                        <Fontisto
                          name="angle-down"
                          style={CommonStyles.DropdownIcon}
                        />
                      )}
                      dropdownIconPosition="right"
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        setelementvisa(selectedItem, index);
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
                      <Text style={CommonStyles.labelText}>Visa Expiration Date</Text>
                      <View style={CommonStyles.calOut}>

                        <Text
                          style={[CommonStyles.inputField, CommonStyles.calInput]}>
                          {visaexpiration.toLocaleString()}
                        </Text>
                        <TouchableOpacity
                          onPress={showexpDatepicker}
                          style={CommonStyles.calIcon}>
                          <FontAwesome
                            name="calendar-o"
                            size={20}
                            color={ColorSheet.$Gray6}
                          />
                        </TouchableOpacity>
                      </View>
                      {expshow && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          dateFormat="shortdate"
                          value={visaexpiration}
                          // mode="date"
                          is24Hour={false}
                          onChange={onChangeexp}
                        />
                      )}
                    </View>
                  </>}

                {(visatype == 'B1' || visatype == 'B2') &&
                  <View>
                    <Text style={CommonStyles.labelText}>Date of Departure from USA</Text>
                    <View style={CommonStyles.calOut}>

                      <Text
                        style={[CommonStyles.inputField, CommonStyles.calInput]}>
                        {departure.toLocaleString()}
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
                        value={departure}
                        // mode="date"
                        is24Hour={false}
                        onChange={onChangedtend}
                      />
                    )}
                  </View>
                }

                <Text style={CommonStyles.labelText}>Country of Tax Residence</Text>
                <TextInput
                  placeholder="Country of Tax Residence"
                  placeholderTextColor={ColorSheet.$Gray6}
                  style={CommonStyles.inputField}
                  defaultValue={'USA'}
                  editable={false}
                />
                <Text style={CommonStyles.labelText}>funding source</Text>
                <SelectDropdown
                  data={fundingMenu}
                  renderDropdownIcon={(selectedItem: any, index: number) => (
                    <Fontisto
                      name="angle-down"
                      style={CommonStyles.DropdownIcon}
                    />
                  )}
                  dropdownIconPosition="right"
                  onSelect={(selectedItem, index) => {
                    // console.log(selectedItem, index);
                    setFundSource(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={CommonStyles.inputField}
                  buttonTextStyle={CommonStyles.DropdownTxt}
                  defaultButtonText={'Select funding source'}
                />
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                >
                  <View style={[CommonStyles.btnCotainer, EmployeeInfoStyles.marginTop,]}>
                    <Text style={CommonStyles.btnTxt}>Next</Text>
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
              <TouchableOpacity onPress={toggleModal1}>
                <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                  <Text style={CommonStyles.btnTxt}>Ok</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default IdentityDetails;
