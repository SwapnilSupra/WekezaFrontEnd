import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import { SummaryStyles } from './SummaryStyle';
import { EmployeeInfoStyles } from '../EmployeeInfo/EmployeeInfoStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makePostRequest, makeAlpacapostRequest, makePostRequestpass, post_PostAlpacaData } from '../../../Utils/utils';
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import moment from 'moment';
import nextId from "react-id-generator";


const Summary = ({ navigation }: any) => {

  const [resultarray, setaggrementarray] = React.useState([])
  const [documentarr, setdocumentarr] = React.useState([])

  const [igivenname, setigivenname] = React.useState('')
  const [ifamilyname, setifamilyname] = React.useState('')
  const [middlename, setmiddlename] = React.useState('')
  const [idob, setidob] = React.useState('')
  const [taxid, settaxid] = React.useState('')
  const [taxidtype, settaxidtype] = React.useState('')
  const [citizenship, setcitizenship] = React.useState('')
  const [countrybirth, setcountrybirth] = React.useState('')
  const [taxresidence, settaxresidence] = React.useState('')
  const [fundingsource, setfundingsource] = React.useState('')

  const [trustgivenname, settrustgivenname] = React.useState('')
  const [trustfname, settrustfname] = React.useState('')
  const [emailid, setemailid] = React.useState('')
  const [trustphn, settrustphn] = React.useState('')
  const [emailformail, setemailformail] = React.useState('')
  const isFocused = useIsFocused();
  const [isModalCreate, setModalCreate] = React.useState(false);
  const [errortext, seterrortext] = React.useState('');

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  let bodyform: any

  const submit = async () => {

    let tokenidstore = await AsyncStorage.getItem('token');
    let bodyform: any = await AsyncStorage.getItem('data');
    let storeuserid = await AsyncStorage.getItem('userID');
    let data: any;
    let alplink = 'https://alpaca.markets/disclosures'

    // makeAlpacapostRequest("accounts", bodyform)
    //   .then(async (result: any) => {
    //     data = result.data;
    //     if (Object.keys(data).length >= 0) {
    //       console.log(data.id);
    //       var bodydata = {
    //         user_id: Number(storeuserid),
    //         al_id: data.id,
    //         al_account_number: data.account_number,
    //         al_status: data.status,
    //         al_crypto_status: data.crypto_status,
    //         al_currency: data.currency,
    //         al_last_equity: data.last_equity,
    //         al_created_at: data.created_at
    //       }

    //       makePostRequestpass("auth/storeData", bodydata, tokenidstore)
    //         .then(async (result: any) => {

    //           data = JSON.stringify(result.data);
    //           await AsyncStorage.setItem('alpaca_id', result.data.data['al_id']);
    //           await AsyncStorage.setItem('storeAccnoset', result.data.data['al_account_number']);
    //           await AsyncStorage.setItem('storeStatusset', result.data.data['al_status'])
    //           navigation.navigate('Success');
    //         })
    //         .catch(function (error) {

    //           var errmsg = JSON.stringify(error)
    //           seterrortext(errmsg)
    //           setModalCreate(true)
    //         });
    //       // email send
    //       const textmail =

    //         "<div style='display: block;width: 500px;margin: 0 auto;box-shadow: 0px 0px 10px #ccc;border-radius: 20px;padding: 0;overflow: hidden;border-top: 5px solid #007226;border-left: 1px solid #007226;border-bottom: 5px solid #007226;border-right: 1px solid #007226;background-repeat: no-repeat;background-position-x: right;background-position-y: top;background-size: 250px;box-shadow: 0px 0px 15px #ccc;'> <p style= 'background:#007226;text-align: center;padding: 15px;margin: 0'> <img src= 'https://wekeza-profile-images.s3.amazonaws.com/white-logo.png' style='height:90px;width:90px;' /> </p> <div style='font-size:16px;font-family: Arial, Helvetica, sans-serif;padding: 30px;line-height: 28px;'> <div style='margin-bottom:6px'>Dear " + igivenname + ",</div> <div style='margin-bottom:6px'>Thank You, </div> <div style='margin-bottom:15px'>Your trading account is created successfully.</div> <div style='margin-bottom:1px;font-weight: 600;'> following are details</div> <div>Alpaca account number: " + data.account_number + " <br> Alpaca id: " + data.id + " <br/> Status: " + data.status + " <br> Alpaca's main disclosures page link:- " + alplink + " </div> </div> </div>";


    //       var bodyFormDatamail = {
    //         email: emailformail,
    //         mailData: textmail,
    //         subject: 'Trading account created'
    //       };

    //       makePostRequestpass('auth/sendmail', bodyFormDatamail, tokenidstore)
    //         .then(async (res: any) => {
    //           var errmsg = JSON.stringify(res.data.message)
    //           seterrortext(errmsg)
    //           setModalCreate(true)
    //         })
    //         .catch(function (error) {
    //           var errmsg = JSON.stringify(error.response.data.message)
    //           seterrortext(errmsg)
    //           setModalCreate(true)
    //           console.log(error);
    //         });
    //     }
    //   }).catch(function (error) {
    //     var errmsg = JSON.stringify(error.response.data.message)
    //     seterrortext(errmsg)
    //     setModalCreate(true)
    //     console.log(error);
    //   });

    var body = {
      "url": 'accounts',
      ...bodyform
    }

    post_PostAlpacaData('alpaca/postalpacadata', body, tokenidstore)
      .then(async (result: any) => {
        data = result.data.data;
        if (Object.keys(data).length >= 0) {

          var bodydata = {
            user_id: Number(storeuserid),
            al_id: data.id,
            al_account_number: data.account_number,
            al_status: data.status,
            al_crypto_status: data.crypto_status,
            al_currency: data.currency,
            al_last_equity: data.last_equity,
            al_created_at: data.created_at
          }

          makePostRequestpass("auth/storeData", bodydata, tokenidstore)
            .then(async (result: any) => {

              data = JSON.stringify(result.data.data);
              await AsyncStorage.setItem('alpaca_id', result.data.data.data['al_id']);
              await AsyncStorage.setItem('storeAccnoset', result.data.data.data['al_account_number']);
              await AsyncStorage.setItem('storeStatusset', result.data.data.data['al_status'])
              navigation.navigate('Success');
            })
            .catch(function (error) {

              var errmsg = JSON.stringify(error)
              seterrortext(errmsg)
              setModalCreate(true)
            });
          // email send
          const textmail =

            "<div style='display: block;width: 500px;margin: 0 auto;box-shadow: 0px 0px 10px #ccc;border-radius: 20px;padding: 0;overflow: hidden;border-top: 5px solid #007226;border-left: 1px solid #007226;border-bottom: 5px solid #007226;border-right: 1px solid #007226;background-repeat: no-repeat;background-position-x: right;background-position-y: top;background-size: 250px;box-shadow: 0px 0px 15px #ccc;'> <p style= 'background:#007226;text-align: center;padding: 15px;margin: 0'> <img src= 'https://wekeza-profile-images.s3.amazonaws.com/white-logo.png' style='height:90px;width:90px;' /> </p> <div style='font-size:16px;font-family: Arial, Helvetica, sans-serif;padding: 30px;line-height: 28px;'> <div style='margin-bottom:6px'>Dear " + igivenname + ",</div> <div style='margin-bottom:6px'>Thank You, </div> <div style='margin-bottom:15px'>Your trading account is created successfully.</div> <div style='margin-bottom:1px;font-weight: 600;'> following are details</div> <div>Alpaca account number: " + data.account_number + " <br> Alpaca id: " + data.id + " <br/> Status: " + data.status + " <br> Alpaca's main disclosures page link:- " + alplink + " </div> </div> </div>";


          var bodyFormDatamail = {
            email: emailformail,
            mailData: textmail,
            subject: 'Trading account created'
          };

          makePostRequestpass('auth/sendmail', bodyFormDatamail, tokenidstore)
            .then(async (res: any) => {
              var errmsg = JSON.stringify(res.data.message)
              seterrortext(errmsg)
              setModalCreate(true)
            })
            .catch(function (error) {
              var errmsg = JSON.stringify(error.response.data.message)
              seterrortext(errmsg)
              setModalCreate(true)
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        seterrortext(error)
        setModalCreate(true)
      });

  }

  const onLoadfun = async () => {

    var getemailid: any = await AsyncStorage.getItem('emailstore');
    bodyform = await AsyncStorage.getItem('data');
    console.log("body frm" + JSON.parse(bodyform));
    var datastr = (JSON.parse(bodyform));
    console.log('11doc' + JSON.stringify(datastr))
    //console.log("newarr print rrr:" + JSON.stringify(datastr.agreements));
    setaggrementarray(Object.values(datastr.agreements));
    console.log("newarr print rrr:" + JSON.stringify(datastr.documents));
    setdocumentarr(Object.values(datastr.documents));

    console.log(JSON.stringify(datastr.identity.given_name));
    setemailformail(getemailid)
    setigivenname(datastr.identity.given_name.replace(/["]+/g, ''))
    setifamilyname(datastr.identity.family_name.replace(/["]+/g, ''))
    setidob(datastr.identity.date_of_birth.replace(/["]+/g, ''))
    settaxid(datastr.identity.tax_id.replace(/["]+/g, ''))
    settaxidtype(datastr.identity.tax_id_type.replace(/["]+/g, ''))
    setcitizenship(datastr.identity.country_of_citizenship.replace(/["]+/g, ''))
    setcountrybirth(datastr.identity.country_of_birth.replace(/["]+/g, ''))
    settaxresidence(datastr.identity.country_of_tax_residence.replace(/["]+/g, ''))
    setfundingsource(datastr.identity.funding_source)

    settrustgivenname(datastr.trusted_contact.given_name.replace(/["]+/g, ''))
    settrustfname(datastr.trusted_contact.family_name.replace(/["]+/g, ''))
    setemailid(datastr.trusted_contact.email_address.replace(/["]+/g, ''))
    settrustphn(datastr.trusted_contact.phone_number.replace(/["]+/g, ''))
  }

  const editIdentification = async () => {

    AsyncStorage.setItem('setflagidentity', 'editidentity');
    navigation.navigate('IdentityDetails');
  }

  const editDocument = async () => {

    AsyncStorage.setItem('setflagidentity', 'editidentity');
    navigation.navigate('Document')
  }

  const editTrustedcon = async () => {

    AsyncStorage.setItem('setflagidentity', 'editidentity');
    navigation.navigate('TrustedContact', { given_name: trustgivenname, family_name: trustfname, email_address: emailid })
  };

  useEffect(() => {
    if (isFocused) {
      onLoadfun();
    }
  }, [isFocused]);

  return (
    <View style={CommonStyles.ContainerPink}>
      <ScrollView>
        <View style={[CommonStyles.sideSpace, CommonStyles.commonBotSP]}>
          <Text
            style={[EmployeeInfoStyles.infoTxt, EmployeeInfoStyles.marginBot]}>
            Registration Details
          </Text>
          <View style={SummaryStyles.paper}>
            <View style={[SummaryStyles.editViewHead]}>
              <Text style={SummaryStyles.mainTxtHead}>Identity Details</Text>
              <TouchableOpacity
                onPress={() => editIdentification()}>
                <FontAwesome name="pencil" style={CommonStyles.editIcon} />
              </TouchableOpacity>
            </View>
            <View style={SummaryStyles.editView}>
              <View style={SummaryStyles.editField}>
                <Text style={SummaryStyles.txt}>First Name</Text>
                <Text style={SummaryStyles.mainTxt}>{igivenname}</Text>
              </View>
              <View style={SummaryStyles.editField}>
                <Text style={SummaryStyles.txt}>Last Name</Text>
                <Text style={SummaryStyles.mainTxt}>{ifamilyname}</Text>
              </View>
            </View>
            <View style={SummaryStyles.editView}>
              <View style={SummaryStyles.editField}>
                <Text style={SummaryStyles.txt}>Date Of Birth</Text>
                <Text style={SummaryStyles.mainTxt}>{idob}</Text>
              </View>
              <View style={SummaryStyles.editField}>
                <Text style={SummaryStyles.txt}>SSN Number</Text>
                <Text style={SummaryStyles.mainTxt}>{taxid}</Text>
              </View>
            </View>
            <View style={SummaryStyles.editView}>
              <View style={SummaryStyles.editField}>
                <Text style={SummaryStyles.txt}>Tax Id Type</Text>
                <Text style={SummaryStyles.mainTxt}>{taxidtype}</Text>
              </View>
              <View style={SummaryStyles.editField}>
                <Text style={SummaryStyles.txt}>Country Of Citizenship</Text>
                <Text style={SummaryStyles.mainTxt}>{citizenship}</Text>
              </View>
            </View>
            <View style={SummaryStyles.editView}>
              <View style={SummaryStyles.editField}>
                <Text style={SummaryStyles.txt}>country of birth</Text>
                <Text style={SummaryStyles.mainTxt}>{countrybirth}</Text>
              </View>
              <View style={SummaryStyles.editField}>
                <Text style={SummaryStyles.txt}>country of tax residence</Text>
                <Text style={SummaryStyles.mainTxt}>{taxresidence}</Text>
              </View>
            </View>
            <View style={SummaryStyles.editView}>
              <View style={SummaryStyles.editFieldBig}>
                <Text style={SummaryStyles.txt}>Funding Source</Text>
                <Text style={SummaryStyles.mainTxt}>{fundingsource}</Text>
              </View>
            </View>
          </View>
          <View style={SummaryStyles.paper}>
            <View style={[SummaryStyles.editViewHead]}>
              <Text style={SummaryStyles.mainTxtHead}>Agreement Details</Text>
              <TouchableOpacity>
              </TouchableOpacity>
            </View>

            {resultarray.map((keyagg: any, index: any) => (
              <>
                <View key={nextId()}>
                  <View style={SummaryStyles.editView}>
                    <View style={SummaryStyles.editFieldBig}>
                      <Text style={SummaryStyles.txt}>Agreement 1</Text>
                      <Text style={SummaryStyles.mainTxt}>{keyagg.agreement}</Text>
                    </View>
                  </View>
                  <View style={SummaryStyles.editView}>
                    <View style={SummaryStyles.editFieldBig}>
                      <Text style={SummaryStyles.txt}>Agreement 2</Text>
                      <Text style={SummaryStyles.mainTxt}>{moment(keyagg.signed_at).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    </View>
                  </View>
                </View>
              </>
            ))}

          </View>
          <View style={SummaryStyles.paper}>
            <View style={[SummaryStyles.editViewHead]}>
              <Text style={SummaryStyles.mainTxtHead}>Identity Documents</Text>
              <TouchableOpacity onPress={() => editDocument()}>
                <FontAwesome name="pencil" style={CommonStyles.editIcon} />
              </TouchableOpacity>
            </View>
            {(documentarr.length > 0) ? (
              <View>
                {documentarr.map((dockey: any, index: any) => (
                  <View key={nextId()}>
                    <View style={SummaryStyles.editView}>
                      <View style={SummaryStyles.editFieldBig}>
                        <Text style={SummaryStyles.txt}>Document Type</Text>
                        <Text style={SummaryStyles.mainTxt}>{dockey.document_type}</Text>
                      </View>
                    </View>
                    <View style={SummaryStyles.editView}>
                      <View style={SummaryStyles.editField}>
                        <Text style={SummaryStyles.txt}>Sub Type</Text>
                        <Text style={SummaryStyles.mainTxt}>{dockey.document_sub_type}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={[SummaryStyles.txt, SummaryStyles.txtEror]}>No document added</Text>
            )}
          </View>

          <View style={SummaryStyles.paperLast}>
            <View style={[SummaryStyles.editViewHead]}>
              <Text style={SummaryStyles.mainTxtHead}>Trusted Contact</Text>
              <TouchableOpacity
                onPress={() => editTrustedcon()}>
                <FontAwesome name="pencil" style={CommonStyles.editIcon} />
              </TouchableOpacity>
            </View>
            <View style={SummaryStyles.editView}>
              <View style={SummaryStyles.editField}>
                <Text style={SummaryStyles.txt}>First Name</Text>
                <Text style={SummaryStyles.mainTxt}>{trustgivenname}</Text>
              </View>
              <View style={SummaryStyles.editField}>
                <Text style={SummaryStyles.txt}>Last Name</Text>
                <Text style={SummaryStyles.mainTxt}>{trustfname}</Text>
              </View>
            </View>
            <View style={SummaryStyles.editView}>
              <View style={SummaryStyles.editField}>
                <Text style={SummaryStyles.txt}>Email Address</Text>
                <Text style={SummaryStyles.mainTxt}>{emailid}</Text>
              </View>
              <View style={SummaryStyles.editField}>
                <Text style={SummaryStyles.txt}>Phone Number</Text>
                <Text style={SummaryStyles.mainTxt}>{trustphn}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => submit()}>
            <View style={CommonStyles.btnCotainer}>
              <Text style={CommonStyles.btnTxt}>Submit</Text>
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
      </ScrollView>
    </View>
  );
};

export default Summary;
