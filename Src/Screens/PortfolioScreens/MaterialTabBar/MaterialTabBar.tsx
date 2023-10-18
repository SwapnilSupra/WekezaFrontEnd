import {StyleSheet} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Todays from './Todays';
import Holdings from './Holdings';
import ColorSheet from '../../../StyleSheet/ColorSheet';

const Tab = createMaterialTopTabNavigator();

const MaterialTabBarScreen = () => {
  return (
    <Tab.Navigator initialRouteName="Holdings">
      <Tab.Screen
        name="Todays"
        component={Todays}
        options={{
          tabBarActiveTintColor: ColorSheet.$DarkGreen,
          tabBarInactiveTintColor: ColorSheet.$Gray5,
          tabBarLabel: 'Todays',
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
        name="Holdings"
        component={Holdings}
        options={{
          tabBarActiveTintColor: ColorSheet.$DarkGreen,
          tabBarInactiveTintColor: ColorSheet.$Gray5,
          tabBarLabel: 'Holdings',
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

export default MaterialTabBarScreen;

const styles = StyleSheet.create({});
