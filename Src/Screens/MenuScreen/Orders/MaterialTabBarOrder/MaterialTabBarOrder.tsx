import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Todays from './PendingOrders';
import Holdings from './Positions';
import ColorSheet from '../../../../StyleSheet/ColorSheet';
import PendingOrders from './PendingOrders';
import Positions from './Positions';

const Tab = createMaterialTopTabNavigator();

const MaterialTabBarOrder = () => {

  return (

    <Tab.Navigator initialRouteName="Holdings" >
      <Tab.Screen
        name="PendingOrders"
        component={PendingOrders}
        options={{
          tabBarActiveTintColor: ColorSheet.$DarkGreen,
          tabBarInactiveTintColor: ColorSheet.$Gray5,
          tabBarLabel: 'Pending Orders',
          tabBarPressColor: ColorSheet.$DarkGreen,
          tabBarLabelStyle: {
            fontSize: 16,
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
        name="Positions"
        component={Positions}
        options={{
          tabBarActiveTintColor: ColorSheet.$DarkGreen,
          tabBarInactiveTintColor: ColorSheet.$Gray5,
          tabBarLabel: 'Positions',
          tabBarPressColor: ColorSheet.$DarkGreen, 
          tabBarLabelStyle: {
            fontSize: 16,
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

export default MaterialTabBarOrder;

const styles = StyleSheet.create({});
