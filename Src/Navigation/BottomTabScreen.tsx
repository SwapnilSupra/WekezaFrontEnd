import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ColorSheet from '../StyleSheet/ColorSheet';
import Feather from 'react-native-vector-icons/Feather';
import { CommonStyles } from '../StyleSheet/CommonStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import DashbordStack from './DashboardStack';
import PortfolioStack from './PortfolioStack';
import TradeStack from './TradeStack';
import WatchlistStack from './WatchlistStack';
import MenuStack from './MenuStack';
import Welcome from '../Screens/OnBoardingDesign/WelcomeToWekeza/Welcome';

const BottomTabScreen = ({ navigation }: any) => {

  const Tab = createBottomTabNavigator();
  const [getAlpacaid, setalpcaid] = useState(false);

  const onLoadfun = async () => {

    try {

      let idalpca: any = await AsyncStorage.getItem('achidval');
      if (idalpca != null) {
        setalpcaid(true);
      } else {
        setalpcaid(false);
      }
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {

    let isMounted = true;
    if (isMounted) {
      onLoadfun();
    }
    return () => {
      isMounted = false;
    };
  });

  return (

    <Tab.Navigator screenOptions={{ unmountOnBlur: true }}>

      <Tab.Screen
        name="DashboardStack"
        component={DashbordStack}
        options={{
          tabBarActiveTintColor: ColorSheet.$Green7,
          tabBarInactiveTintColor: ColorSheet.$Gray8,
          tabBarStyle: { height: 60 },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
            fontFamily: 'Lato',
            marginBottom: 5,
          },
          headerShown: false,
          tabBarLabel: 'Dashboard',
          /* tabBarShowLabel: false, */
          tabBarIcon: ({ color }: any) => {
            return (
              <Feather name="home" color={color} style={CommonStyles.navIcon} />
            );
          },
        }}
      />

      <Tab.Screen
        name="PortfolioStack"
        component={getAlpacaid ? PortfolioStack : Welcome}
        options={{
          tabBarActiveTintColor: ColorSheet.$Green7,
          tabBarInactiveTintColor: ColorSheet.$Gray8,
          tabBarStyle: { height: 60 },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
            fontFamily: 'Lato',
            marginBottom: 5,
          },
          headerShown: false,
          tabBarLabel: 'Portfolio',
          /* tabBarShowLabel: false, */
          tabBarIcon: ({ color }: any) => {
            return (
              <MaterialIcons
                name="pie-chart-outlined"
                style={CommonStyles.navIcon}
                color={color}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="TradeStack"
        component={TradeStack}
        options={{
          tabBarActiveTintColor: ColorSheet.$Green7,
          tabBarInactiveTintColor: ColorSheet.$Gray8,
          tabBarStyle: { height: 60 },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
            fontFamily: 'Lato',
            marginBottom: 5,
          },

          headerShown: false,
          tabBarLabel: 'Trade',
          /* tabBarShowLabel: false, */
          tabBarIcon: ({ color }: any) => {
            return (
              <MaterialCommunityIcons
                name="currency-usd"
                style={CommonStyles.navIcon}
                color={color}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="WatchlistStack"
        component={getAlpacaid ? WatchlistStack : Welcome}
        options={{
          tabBarActiveTintColor: ColorSheet.$Green7,
          tabBarInactiveTintColor: ColorSheet.$Gray8,
          tabBarStyle: { height: 60 },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
            fontFamily: 'Lato',
            marginBottom: 5,
          },
          headerShown: false,
          tabBarLabel: 'Watchlist',
          /* tabBarShowLabel: false, */
          tabBarIcon: ({ color }: any) => {
            return (
              <Entypo
                name="list"
                style={CommonStyles.navIcon}
                color={color}
              // keyPress={()=> onaccfun()}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="MenuStack"
        component={MenuStack}
        options={{
          tabBarActiveTintColor: ColorSheet.$Green7,
          tabBarInactiveTintColor: ColorSheet.$Gray8,
          tabBarStyle: { height: 60 },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
            fontFamily: 'Lato',
            marginBottom: 5,
          },
          headerShown: false,
          tabBarLabel: 'Menu',
          /* tabBarShowLabel: false, */
          tabBarIcon: ({ color }: any) => {
            return (
              <Ionicons
                name="md-menu"
                style={CommonStyles.navIcon}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;

const styles = StyleSheet.create({
  TabLabel: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Lato',
    marginBottom: 5,
  },
});
