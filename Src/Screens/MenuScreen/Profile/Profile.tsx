import {
  ImageBackground,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import ImagesAll from '../../../StyleSheet/ImagesAll';
import { MenuStyles } from '../Menu/MenuStyle';
import { SummaryStyles } from '../../OnBoardingDesign/Summary/SummaryStyle';
import { ProfileStyles } from './ProfileStyle';
import ImagePicker from 'react-native-image-crop-picker';
import { makePutRequest, uploadImages } from '../../../Utils/utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Profile = ({ navigation }: any) => {
  const [Phone, setPhone] = useState('');
  const [Street, setStreet] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [PostalCode, setPostalCode] = useState('');
  const [Country, setCountry] = useState('');
  const [emailid, setemailid] = useState('');
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [investtype, setinvesttype] = useState('');
  const [jobtitle, setjobtitle] = useState('');
  const [currentemp, setcurrentemp] = useState('');
  const [liqassets, setliqassets] = useState('');
  const [funds, setfunds] = useState('');
  const [bstatus, setbStatus] = useState('');
  const [profileimg, setProfileimg] = React.useState('');
  const isFocused = useIsFocused();
  let newpathstr: String;
  let specialchar: any;

  const onLoadfun = async () => {
    let storemailid: any = await AsyncStorage.getItem('emailstore');
    let storefname: any = await AsyncStorage.getItem('userfname');
    let storelname: any = await AsyncStorage.getItem('userlname');
    let statusget: any = await AsyncStorage.getItem('broksttus');
    let profileData: any = await AsyncStorage.getItem('insertedquestarr');
    let storepro: any = await AsyncStorage.getItem('profilestore');
    // console.log(storepro)
    setProfileimg(storepro)

    var datastr = JSON.parse(profileData);
    setPhone(datastr[0].phone_no);
    setStreet(datastr[0].street_address);
    setCity(datastr[0].city);
    setState(datastr[0].state);
    setPostalCode(datastr[0].postal_code);
    setCountry(datastr[0].country);
    setemailid(storemailid);
    setfname(storefname);
    setlname(storelname);
    setinvesttype(datastr[0].investing_type);
    setjobtitle(datastr[0].job_title);
    setcurrentemp(datastr[0].current_employer);
    setliqassets(datastr[0].liquid_asset);
    setfunds(datastr[0].funding_account);
    if (statusget == null) {
      statusget = 'Create Your Brokerage Account';
      setbStatus(statusget);
    } else {
      setbStatus(statusget);
    }
  };

  const editContactinfo = async () => {
    AsyncStorage.setItem('editprofileflg', 'editprofile');
    navigation.navigate('ContactDetails');
  };

  const investtypeedit = async () => {
    AsyncStorage.setItem('editprofileflg', 'editprofile');
    navigation.navigate('QueMark');
  };

  const empinfoedit = async () => {
    AsyncStorage.setItem('editprofileflg', 'editprofile');
    navigation.navigate('EmployeeInfo');
  };
  const liquidasetedit = async () => {
    AsyncStorage.setItem('editprofileflg', 'editprofile');
    navigation.navigate('LiquidAssets');
  };
  const fundaccedit = async () => {
    AsyncStorage.setItem('editprofileflg', 'editprofile');
    navigation.navigate('FundAccount');
  };
  let path: any = '';


  const ChooseFromGalary = async () => {

    let tokenidstore = await AsyncStorage.getItem('token');

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
    })
      .then(async image => {

        if (image.length > 0) {

          let form = new FormData();
          const imageName = image[0].path.replace(/^.*[\\\/]/, "");
          let fileType;
          if (imageName.includes('jpg')) { fileType = 'image/jpg'; }
          else if (imageName.includes('jpeg')) { fileType = 'image/jpeg'; }
          else if (imageName.includes('png')) { fileType = 'image/png'; }

          form.append('image', {
            name: imageName,
            uri: image[0].path,
            type: 'image/jpeg'
          })
          try {

            uploadImages('auth/uploadImages', form, tokenidstore)
              .then(result => {
                
                path = JSON.stringify(result!.imagepath[0].location)
                newpathstr = path.slice(0, -1)
                specialchar = newpathstr.replace(/"/g, "");
                AsyncStorage.setItem('profilestore', specialchar);
                setProfileimg(specialchar);
                onSubmit();
              })
              .catch(error => {
                console.error('Upload failed', error);
              });

          } catch (error: any) {
            if (error.response) {
              const error1 = error.response.data;
              console.log(error1.message);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
          }
        }
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          return false;
        }
      });
  };

  const onSubmit = async () => {

    try {
      let storeuserid = await AsyncStorage.getItem('userID');
      let tokenidstore = await AsyncStorage.getItem('token');
      var bodyFormData = {
        user_id: Number(storeuserid),
        profilepic: specialchar,

      };

      makePutRequest('auth/updateUser', bodyFormData, tokenidstore)
        .then(async (result: any) => {
          Alert.alert(
            "success",
            "Profile update success",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        })
        .catch(function (error) {
          console.log(error);
          Alert.alert(
            "Error",
            JSON.stringify(error),
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        });

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isFocused) {
      onLoadfun();
    }
  }, [isFocused]);

  return (
    <ScrollView decelerationRate={0.1}>
      <View style={CommonStyles.ContainerWhite}>
        <ImageBackground
          source={ImagesAll.BGCashsm}
          style={MenuStyles.backImage}>
          <View style={MenuStyles.ProfileImageView}>
            <View>
              {(!profileimg) ?
                <Image source={ImagesAll.Men} style={MenuStyles.UserImage} /> :
                <Image source={{ uri: profileimg }} style={MenuStyles.UserImage} />

              }
              <TouchableOpacity
                style={ProfileStyles.EditIcon}
                onPress={ChooseFromGalary}>
                <FontAwesome name="pencil" style={ProfileStyles.EditImage} />
              </TouchableOpacity>
            </View>
            <View style={MenuStyles.NameView}>
              <Text style={MenuStyles.UserName}>{fname}</Text>
              <Text style={MenuStyles.Gmail}>{emailid}</Text>
            </View>
          </View>
          <Text style={MenuStyles.StatusTxt}>
            Your brokerage account status
          </Text>
          <Text style={MenuStyles.Status}>{bstatus}</Text>
        </ImageBackground>
        <View style={MenuStyles.FormView}>
          <View style={[CommonStyles.sideSpace, CommonStyles.commonBotSP]}>
            <Text style={MenuStyles.mainTxt}>Personal Details</Text>
            <View style={SummaryStyles.paper}>
              <View style={[SummaryStyles.editView]}>
                <Text style={SummaryStyles.mainTxtHead}>Contact Details</Text>
                <TouchableOpacity onPress={() => editContactinfo()}>
                  <FontAwesome name="pencil" style={CommonStyles.editIcon} />
                </TouchableOpacity>
              </View>
              <View style={SummaryStyles.divider} />
              <View style={SummaryStyles.editView}>
                <View style={SummaryStyles.editField}>
                  <Text style={SummaryStyles.txt}>First Name</Text>
                  <Text style={SummaryStyles.valueTxt}>{fname}</Text>
                </View>
                <View style={SummaryStyles.editField}>
                  <Text style={SummaryStyles.txt}>Last Name</Text>
                  <Text style={SummaryStyles.valueTxt}>{lname}</Text>
                </View>
              </View>
              <View style={SummaryStyles.editView}>
                <View style={SummaryStyles.editFieldBig}>
                  <Text style={SummaryStyles.txt}>Email Address</Text>
                  <Text style={SummaryStyles.valueTxt}>{emailid}</Text>
                </View>
              </View>
              <View style={SummaryStyles.editView}>
                <View style={SummaryStyles.editField}>
                  <Text style={SummaryStyles.txt}>Phone Number</Text>
                  <Text style={SummaryStyles.valueTxt}>{Phone}</Text>
                </View>
              </View>
              <View style={SummaryStyles.editView}>
                <View style={SummaryStyles.editField}>
                  <Text style={SummaryStyles.txt}>Street Address</Text>
                  <Text style={SummaryStyles.valueTxt}>{Street}</Text>
                </View>
              </View>
              <View style={SummaryStyles.editView}>
                <View style={SummaryStyles.editField}>
                  <Text style={SummaryStyles.txt}>City</Text>
                  <Text style={SummaryStyles.valueTxt}>{City}</Text>
                </View>
                <View style={SummaryStyles.editField}>
                  <Text style={SummaryStyles.txt}>State</Text>
                  <Text style={SummaryStyles.valueTxt}>{State}</Text>
                </View>
              </View>
              <View style={SummaryStyles.editView}>
                <View style={SummaryStyles.editField}>
                  <Text style={SummaryStyles.txt}>Zip code</Text>
                  <Text style={SummaryStyles.valueTxt}>{PostalCode}</Text>
                </View>
                <View style={SummaryStyles.editField}>
                  <Text style={SummaryStyles.txt}>Country</Text>
                  <Text style={SummaryStyles.valueTxt}>{Country}</Text>
                </View>
              </View>
            </View>
            <Text style={MenuStyles.mainTxt}>Financial Quiz</Text>
            <View style={[SummaryStyles.paper]}>
              <View style={[SummaryStyles.editView]}>
                <Text style={SummaryStyles.mainTxtHead}>
                  How will investing support your financial goals?
                </Text>
                <TouchableOpacity onPress={() => investtypeedit()}>
                  <FontAwesome name="pencil" style={CommonStyles.editIcon} />
                </TouchableOpacity>
              </View>
              <View style={SummaryStyles.divider} />
              <View style={SummaryStyles.editView}>
                <View style={SummaryStyles.editField}>
                  <Text style={SummaryStyles.valueTxt}>{investtype}</Text>
                </View>
              </View>
            </View>
            <View style={[SummaryStyles.paper]}>
              <View style={[SummaryStyles.editView]}>
                <Text style={SummaryStyles.mainTxtHead}>
                  Employer information
                </Text>
                <TouchableOpacity onPress={() => empinfoedit()}>
                  <FontAwesome name="pencil" style={CommonStyles.editIcon} />
                </TouchableOpacity>
              </View>
              <View style={SummaryStyles.divider} />
              <View style={SummaryStyles.editView}>
                <View style={SummaryStyles.editField}>
                  <Text style={SummaryStyles.txt}>Employer Name</Text>
                  <Text style={SummaryStyles.valueTxt}>{fname}</Text>
                </View>
                <View style={SummaryStyles.editField}>
                  <Text style={SummaryStyles.txt}>Job Title</Text>
                  <Text style={SummaryStyles.valueTxt}>{jobtitle}</Text>
                </View>
              </View>
              <View style={SummaryStyles.editView}>
                <View style={SummaryStyles.editField}>
                  <Text style={SummaryStyles.txt}>Current Employer</Text>
                  <Text style={SummaryStyles.valueTxt}>{currentemp}</Text>
                </View>
              </View>

            </View>
            <View style={[SummaryStyles.paper]}>
              <View style={[SummaryStyles.editView]}>
                <Text style={SummaryStyles.mainTxtHead}>
                  How much investible liquid assets do you have?
                </Text>
                <TouchableOpacity onPress={() => liquidasetedit()}>
                  <FontAwesome name="pencil" style={CommonStyles.editIcon} />
                </TouchableOpacity>
              </View>
              <View style={SummaryStyles.divider} />
              <View style={SummaryStyles.editView}>
                <View style={SummaryStyles.editField}>
                  <Text style={SummaryStyles.valueTxt}>{liqassets}</Text>
                </View>
              </View>
            </View>
            <View style={[SummaryStyles.paper]}>
              <View style={[SummaryStyles.editView]}>
                <Text style={SummaryStyles.mainTxtHead}>
                  How will you fund your account?
                </Text>
                <TouchableOpacity onPress={() => fundaccedit()}>
                  <FontAwesome name="pencil" style={CommonStyles.editIcon} />
                </TouchableOpacity>
              </View>
              <View style={SummaryStyles.divider} />
              <View style={SummaryStyles.editView}>
                <View style={SummaryStyles.editField}>
                  <Text style={SummaryStyles.valueTxt}>{funds}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
