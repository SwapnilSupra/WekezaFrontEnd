import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { EmployeeInfoStyles } from '../EmployeeInfo/EmployeeInfoStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import { Formik } from 'formik';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import { makePutRequest } from '../../../Utils/utils';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const ContactDetails = ({ navigation }: any) => {


  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Street, setStreet] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [PostalCode, setPostalCode] = useState('');
  const [Country, setCountry] = useState('');
  const [emailid, setemailid] = useState('');
  const [valbasic, setvalbasic] = useState('set');
  const searchOptions = {
    componentRestrictions: { country: ['us'] },
    types: []
  }

  const onSubmit = async (values: any) => {

    try {

      if (await AsyncStorage.getItem('editprofileflg') == 'editprofile') {

        let storeuserid = await AsyncStorage.getItem('userID');
        let tokenidstore = await AsyncStorage.getItem('token');
        var bodyFormData = {
          user_id: Number(storeuserid),
          phone_no: values.Phone,
          street_address: values.Street,
          city: values.City,
          state: values.State,
          postal_code: values.PostalCode,
          country: values.Country,
          basic_info: true,
        };

        makePutRequest('auth/updateUser', bodyFormData, tokenidstore)
          .then(async (result: any) => {
            let insertedStorarr = [];
            if (result.data.data.basic_info == true) {
              insertedStorarr.push({
                investing_type: result.data.data.investing_type,
                job_title: result.data.data.job_title,
                current_employer: result.data.data.current_employer,
                annual_income: result.data.data.annual_income,
                liquid_asset: result.data.data.liquid_asset,
                funding_account: result.data.data.funding_account,
                phone_no: result.data.data.phone_no,
                street_address: result.data.data.street_address,
                city: result.data.data.city,
                state: result.data.data.state,
                postal_code: result.data.data.postal_code,
                country: result.data.data.country,
              });
              AsyncStorage.setItem(
                'insertedquestarr',
                JSON.stringify(insertedStorarr),
              );
            }

            values.Phone = '';
            values.Street = '';
            values.City = '';
            values.State = '';
            values.PostalCode = '';
            values.Country = '';
            setPhone('');
            setState('');
            setStreet('');
            setCity('');
            setState('');
            setPostalCode('');
            setCountry('');
            AsyncStorage.removeItem('editprofileflg');
            navigation.navigate('Profile');
          })
      } else {
        let storeuserid = await AsyncStorage.getItem('userID');
        let tokenidstore = await AsyncStorage.getItem('token');
        var bodyFormData = {
          user_id: Number(storeuserid),
          phone_no: values.Phone,
          street_address: values.Street,
          city: values.City,
          state: values.State,
          postal_code: values.PostalCode,
          country: values.Country,
          basic_info: true,
        };

        console.log('formdata contact', JSON.stringify(bodyFormData));
        makePutRequest('auth/updateUser', bodyFormData, tokenidstore)
          .then(async (result: any) => {
            AsyncStorage.setItem('basicinfostore', 'true');
            let insertedStorarr = [];
            if (result.data.data.basic_info == true) {
              insertedStorarr.push({
                investing_type: result.data.data.investing_type,
                job_title: result.data.data.job_title,
                current_employer: result.data.data.current_employer,
                annual_income: result.data.data.annual_income,
                liquid_asset: result.data.data.liquid_asset,
                funding_account: result.data.data.funding_account,
                phone_no: result.data.data.phone_no,
                street_address: result.data.data.street_address,
                city: result.data.data.city,
                state: result.data.data.state,
                postal_code: result.data.data.postal_code,
                country: result.data.data.country,
              });
              AsyncStorage.setItem(
                'insertedquestarr',
                JSON.stringify(insertedStorarr),
              );
            }

            values.Phone = '';
            values.Street = '';
            values.City = '';
            values.State = '';
            values.PostalCode = '';
            values.Country = '';
            setPhone('');
            setState('');
            setStreet('');
            setCity('');
            setState('');
            setPostalCode('');
            setCountry('');
            navigation.navigate('Welcome');
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onLoadfun = async () => {

    let storemailid: any = await AsyncStorage.getItem('emailstore');
    setemailid(storemailid);
    var retrievedData: any = await AsyncStorage.getItem('insertedquestarr');
    var usearry = JSON.parse(retrievedData);
    var arrphno = usearry[0].phone_no;
    var arrstadd = usearry[0].street_address;
    var arrcity = usearry[0].city;
    var arrstate = usearry[0].state;
    var arrpcode = usearry[0].postal_code;
    var arrcot = usearry[0].country;
    var storeval = await AsyncStorage.getItem('basicinfostore');
    console.log(usearry);
    if (arrphno !== '') {
      setPhone(arrphno);
      setvalbasic('reset');
    }
    if (arrstadd !== '') {
      setStreet(arrstadd);
      setvalbasic('reset');
    }
    if (arrcity !== '') {
      setCity(arrcity);
      setvalbasic('reset');
    }
    if (arrstate !== '') {
      setState(arrstate);
      setvalbasic('reset');
    }
    if (arrpcode !== '') {
      setPostalCode(arrpcode);
      setvalbasic('reset');
    }
    if (arrcot !== '') {
      setCountry(arrcot);
      setvalbasic('reset');
    }
  };

  const getvaldata = (gdata: any) => {

    var finalstring = gdata.description
    var placearr = finalstring.split(", ");
    var street = "";
    console.log(placearr.length, placearr[placearr.length - 1])
    for (let i = 0; i <= placearr.length - 3; i++) {
      if (street == "") { street = placearr[i] }
      else {
        street = street + "," + placearr[i];
      }
    }
    var citynew = placearr[placearr.length - 3];
    var statenew = placearr[placearr.length - 2];
    var countrynew = placearr[placearr.length - 1];
  
    setStreet(street)
    setCity(citynew);
    setState(statenew);
    setCountry(countrynew);
  };

  const textClear = (d: any) => {
    console.log('ggg')
    if (d == '') {
      setState('');
      setCountry('')
    }

  };

  useEffect(() => {
    onLoadfun();
  }, []);

  return (
    <View style={CommonStyles.ContainerPink}>
      <ScrollView keyboardShouldPersistTaps="always" >
        <View style={[CommonStyles.sideSpace, CommonStyles.commonBotSP]}>
          <View style={EmployeeInfoStyles.numberStyle}>
            <View style={EmployeeInfoStyles.stepLine}>
              <View style={EmployeeInfoStyles.stepLineInn4} />
            </View>
            <View style={EmployeeInfoStyles.numberView}>
              <Text style={EmployeeInfoStyles.numberTxt}>1</Text>
            </View>
            <View style={[EmployeeInfoStyles.numberView]}>
              <Text style={EmployeeInfoStyles.numberTxt}>2</Text>
            </View>
            <View style={[EmployeeInfoStyles.numberView]}>
              <Text style={EmployeeInfoStyles.numberTxt}>3</Text>
            </View>
            <View style={[EmployeeInfoStyles.numberView]}>
              <Text style={EmployeeInfoStyles.numberTxt}>4</Text>
            </View>
            <View style={[EmployeeInfoStyles.numberView]}>
              <Text style={EmployeeInfoStyles.numberTxt}>5</Text>
            </View>
          </View>
          <Text
            style={EmployeeInfoStyles.infoHeading}>
            Contact Details
          </Text>
          <Formik
            enableReinitialize
            initialValues={{
              Phone: Phone,
              Street: Street,
              City: City,
              State: State,
              PostalCode: PostalCode,
              Country: Country,
            }}
            onSubmit={onSubmit}
            validationSchema={yup.object().shape({
              Phone:
                yup.string().matches(/^[0-9]{10}$/, 'Phone no must be 10 digits').required("Phone number is required Field").nullable(),//[2-9]{2}[0-9]{8}
              Street: yup.string().required().nullable(),
              City: yup.string().required().nullable(),
              PostalCode: yup.string().matches(/^[0-9]{5}$/, 'The zip code should have 5 digits only').required().nullable(),
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

                <View>
                  <Text style={CommonStyles.labelText}>Email address</Text>
                  <TextInput
                    placeholder="Email address"
                    placeholderTextColor={ColorSheet.$Gray6}
                    style={CommonStyles.inputField}
                    editable={false}
                    value={emailid}
                  />
                </View>

                <View>
                  <Text style={CommonStyles.labelText}>Enter street Address</Text>
                  <GooglePlacesAutocomplete
                    styles={{
                      textInputContainer: {
                        elevation: 0,
                        color: ColorSheet.$black,
                        fontSize: 14,
                      },
                      textInput: {
                        height: 50,
                        color: ColorSheet.$black,
                        fontSize: 14,
                        paddingHorizontal: 15,
                        backgroundColor: ColorSheet.$white,
                        marginBottom: 15,
                        elevation: 0,
                        borderRadius: 10,
                      },
                    }}
                    placeholder="Street Address"
                    query={{
                      key: 'AIzaSyAJB6h8_1bNGLXTk0TX37shMVj2yx6dEtk',
                      language: 'en', // language of the results
                      components: 'country:us'
                    }}

                    enablePoweredByContainer={false}
                    onPress={(data, details = null) => getvaldata(data)}
                    debounce={200}
                    onFail={(error) => console.error(error)}
                    requestUrl={{
                      url:
                        'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                      useOnPlatform: 'web',
                    }}
                  />
                  {touched.City && errors.City && (
                    <Text style={[CommonStyles.error]}>{errors.City}</Text>
                  )}
                </View>

                <View>
                  <Text style={CommonStyles.labelText}>Street address</Text>
                  <TextInput
                    placeholder="Street address"
                    placeholderTextColor={ColorSheet.$Gray6}
                    style={CommonStyles.inputField}
                    defaultValue={Street}
                    editable={false}
                    onChangeText={handleChange('Street')}
                    onChange={() => setStreet(Street)}
                    onBlur={() => setFieldTouched('Street')}
                  />
                  {touched.Street && errors.Street && (
                    <Text style={[CommonStyles.error]}>{errors.Street}</Text>
                  )}
                </View>

                <View>
                  <Text style={CommonStyles.labelText}>City</Text>
                  <TextInput
                    placeholder="City"
                    placeholderTextColor={ColorSheet.$Gray6}
                    style={CommonStyles.inputField}
                    editable={false}
                    value={City}
                  />
                </View>

                <View >
                  <Text style={CommonStyles.labelText}>State</Text>
                  <TextInput
                    placeholder="State"
                    placeholderTextColor={ColorSheet.$Gray6}
                    style={[CommonStyles.inputField, { width: '100%' }]}
                    value={State}
                    // defaultValue={'USA'}
                    editable={false}
                  />
                </View>

                <View style={CommonStyles.smFild}>
                  <View style={CommonStyles.smFildInn}>
                    <Text style={CommonStyles.labelText}>Zip code</Text>
                    <TextInput
                      placeholder="Zip code"
                      placeholderTextColor={ColorSheet.$Gray6}
                      style={[CommonStyles.inputField]}
                      defaultValue={PostalCode}
                      onChangeText={handleChange('PostalCode')}
                      onChange={() => setPostalCode(PostalCode)}
                      onBlur={() => setFieldTouched('PostalCode')}
                    />
                    {touched.PostalCode && errors.PostalCode && (
                      <Text style={[CommonStyles.error]}>
                        {errors.PostalCode}
                      </Text>
                    )}
                  </View>

                  <View style={CommonStyles.smFildInn}>
                    <Text style={CommonStyles.labelText}>Country</Text>
                    <TextInput
                      placeholder="Country"
                      placeholderTextColor={ColorSheet.$Gray6}
                      style={[CommonStyles.inputField, { width: '100%' }]}
                      // defaultValue={'USA'}
                      editable={false}
                      value={Country}
                    />
                    {/* {touched.Country && errors.Country && (
                      <Text style={[CommonStyles.error]}>{errors.Country}</Text>
                    )} */}
                  </View>
                </View>

                <View style={CommonStyles.prefixOut}>
                  <Text style={CommonStyles.labelText}>Phone number</Text>
                  <TextInput
                    placeholder="Phone number"
                    placeholderTextColor={ColorSheet.$Gray6}
                    style={[CommonStyles.inputField, CommonStyles.inputFieldPhone]}
                    defaultValue={Phone}
                    onChangeText={handleChange('Phone')}
                    onChange={() => setPhone(Phone)}
                    onBlur={() => setFieldTouched('Phone')}
                  />
                  <Text style={CommonStyles.prefix}>+1</Text>
                  {touched.Phone && errors.Phone && (
                    <Text style={[CommonStyles.error]}>{errors.Phone}</Text>
                  )}
                </View>

                <TouchableOpacity
                  onPress={() => handleSubmit()}
                >
                  <View
                    style={[
                      CommonStyles.btnCotainer,
                      EmployeeInfoStyles.marginTop,
                    ]}>
                    <Text style={CommonStyles.btnTxt}>Create Account</Text>
                  </View>
                </TouchableOpacity>

              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactDetails;
