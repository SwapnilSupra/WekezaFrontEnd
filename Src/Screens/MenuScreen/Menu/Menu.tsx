import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {CommonStyles} from '../../../StyleSheet/CommonStyle';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import {MenuStyles} from './MenuStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons1 from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Download from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialIconsArrow from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = ({navigation}: any) => {
  const [toggleFundSubmenu, settoggleFundSubmenu] = useState(false);
  const [togglereportmenu, settogglereportmenu] = useState(false);

  const toggleSubmenuOpen = () => {
    settoggleFundSubmenu(!toggleFundSubmenu);
  };

  const reportmenu = () => {
    settogglereportmenu(!togglereportmenu);
  };
  const clearlocalval = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Signin');
  };

  return (
    <View style={CommonStyles.ContainerPink}>
      <View>
        <View style={MenuStyles.logOutButOut}>
          <View style={CommonStyles.sideSpace}>
            <ScrollView>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <View style={[MenuStyles.MenuView, {marginTop: 20}]}>
                  <FontAwesome
                    name="user-circle"
                    size={20}
                    color={ColorSheet.$DarkGreen}
                    style={MenuStyles.menuIcon}
                  />
                  <Text style={MenuStyles.menuName}>My Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleSubmenuOpen}>
                {/* <TouchableOpacity onPress={() => navigation.navigate('AddFund')}> */}
                <View style={MenuStyles.MenuView}>
                  <FontAwesome
                    name="user"
                    size={20}
                    color={ColorSheet.$DarkGreen}
                    style={MenuStyles.menuIcon}
                  />
                  <Text style={MenuStyles.menuName}>Account</Text>
                  <View style={MenuStyles.dropArrow}>
                    <MaterialIconsArrow
                      name="keyboard-arrow-down"
                      size={30}
                      color={ColorSheet.$DarkGreen}
                      style={MenuStyles.menuIcon}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              {toggleFundSubmenu ? (
                <View style={MenuStyles.subMenuspace}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddFund')}>
                    <View style={[MenuStyles.MenuView, MenuStyles.subMenyWht]}>
                      <FontAwesome
                        name="money"
                        size={20}
                        color={ColorSheet.$DarkGreen}
                        style={MenuStyles.menuIcon}
                      />
                      <Text style={MenuStyles.menuName}>Add Fund</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Withdraw')}>
                    <View style={[MenuStyles.MenuView, MenuStyles.subMenyWht]}>
                      <FontAwesome
                        name="money"
                        size={20}
                        color={ColorSheet.$DarkGreen}
                        style={MenuStyles.menuIcon}
                      />
                      <Text style={MenuStyles.menuName}>Withdrew Fund</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
              <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                <View style={MenuStyles.MenuView}>
                  <FontAwesome5
                    name="hand-holding-usd"
                    size={20}
                    color={ColorSheet.$DarkGreen}
                    style={MenuStyles.menuIcon}
                  />
                  <Text style={MenuStyles.menuName}>Orders</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditDocument')}>
                <View style={MenuStyles.MenuView}>
                  <Ionicons
                    name="documents"
                    size={20}
                    color={ColorSheet.$DarkGreen}
                    style={MenuStyles.menuIcon}
                  />
                  <Text style={MenuStyles.menuName}>Documents</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                <View style={MenuStyles.MenuView}>
                  <Ionicons
                    name="settings"
                    size={20}
                    color={ColorSheet.$DarkGreen}
                    style={MenuStyles.menuIcon}
                  />
                  <Text style={MenuStyles.menuName}>Settings</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ContactSupport')}>
                <View style={MenuStyles.MenuView}>
                  <MaterialIcons1
                    name="contact-support"
                    size={22}
                    color={ColorSheet.$DarkGreen}
                    style={MenuStyles.menuIcon}
                  />
                  <Text style={MenuStyles.menuName}>Contact Support</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={reportmenu}>
                <View style={MenuStyles.MenuView}>
                  <FontAwesome
                    name="user"
                    size={20}
                    color={ColorSheet.$DarkGreen}
                    style={MenuStyles.menuIcon}
                  />
                  <Text style={MenuStyles.menuName}>Report</Text>
                  <View style={MenuStyles.dropArrow}>
                    <MaterialIconsArrow
                      name="keyboard-arrow-down"
                      size={30}
                      color={ColorSheet.$DarkGreen}
                      style={MenuStyles.menuIcon}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              {togglereportmenu ? (
                <View style={MenuStyles.subMenuspace}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Downloads')}>
                    <View style={[MenuStyles.MenuView, MenuStyles.subMenyWht]}>
                      <Download
                        name="download"
                        size={19}
                        color={ColorSheet.$DarkGreen}
                        style={MenuStyles.menuIcon}
                      />
                      <Text style={MenuStyles.menuName}>Downloads</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Transactions')}>
                    <View style={[MenuStyles.MenuView, MenuStyles.subMenyWht]}>
                      <Download
                        name="download"
                        size={19}
                        color={ColorSheet.$DarkGreen}
                        style={MenuStyles.menuIcon}
                      />
                      <Text style={MenuStyles.menuName}>Transactions</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
              {/* <TouchableOpacity
                onPress={() => navigation.navigate('Downloads')}>
                <View style={MenuStyles.MenuView}>
                  <FontAwesome
                    name="download"
                    size={19}
                    color={ColorSheet.$DarkGreen}
                    style={MenuStyles.menuIcon}
                  />
                  <Text style={MenuStyles.menuName}>Downloads</Text>
                </View>
              </TouchableOpacity> */}
            </ScrollView>
          </View>
          <View style={MenuStyles.logOutBut}>
            <TouchableOpacity onPress={() => clearlocalval()}>
              <View style={[CommonStyles.btnCotainer, MenuStyles.Btn]}>
                <MaterialIcons
                  name="logout"
                  size={20}
                  color={ColorSheet.$white}
                />
                <Text style={CommonStyles.btnTxt}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Menu;
