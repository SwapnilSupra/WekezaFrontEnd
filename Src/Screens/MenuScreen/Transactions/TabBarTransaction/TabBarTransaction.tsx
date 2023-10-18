import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ColorSheet from '../../../../StyleSheet/ColorSheet';
import Deposits from './Deposits';
import Holdingstab from './Holdingstab';
import Transactionstab from './Transactionstab';

const Tab = createMaterialTopTabNavigator();

const TabBarTransaction = () => {

  return (

    <Tab.Navigator initialRouteName="Deposits" >
      <Tab.Screen
        name="Deposits"
        component={Deposits}
        options={{
          tabBarActiveTintColor: ColorSheet.$DarkGreen,
          tabBarInactiveTintColor: ColorSheet.$Gray5,
          tabBarLabel: 'Cash \n Disbursement',
          tabBarPressColor: ColorSheet.$DarkGreen,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
            fontFamily: 'raleway-Regular', 
          },
          tabBarIndicatorStyle: {
            borderColor: ColorSheet.$DarkGreen,
            borderWidth: 1, 
          },
        }}
      />
      <Tab.Screen
        name="Holdings"
        component={Holdingstab}
        options={{
          tabBarActiveTintColor: ColorSheet.$DarkGreen,
          tabBarInactiveTintColor: ColorSheet.$Gray5,
          tabBarLabel: 'Holdings',
          tabBarPressColor: ColorSheet.$DarkGreen, 
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
            fontFamily: 'raleway-Regular',
          },
          tabBarIndicatorStyle: {
            borderColor: ColorSheet.$DarkGreen,
            borderWidth: 1, 
          },
        }}
      />
       <Tab.Screen
        name="Transactions"
        component={Transactionstab}
        options={{
          tabBarActiveTintColor: ColorSheet.$DarkGreen,
          tabBarInactiveTintColor: ColorSheet.$Gray5,
          tabBarLabel: 'Transactions',
          tabBarPressColor: ColorSheet.$DarkGreen, 
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
            fontFamily: 'raleway-Regular',
          },
          tabBarIndicatorStyle: {
            borderColor: ColorSheet.$DarkGreen,
            borderWidth: 1, 
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBarTransaction;

const styles = StyleSheet.create({});
