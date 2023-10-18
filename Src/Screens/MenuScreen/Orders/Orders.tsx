import {View} from 'react-native';
import React from 'react';
import {CommonStyles} from '../../../StyleSheet/CommonStyle';
import MaterialTabBarOrder from './MaterialTabBarOrder/MaterialTabBarOrder';

const Orders = () => {
  return (
    <View style={[CommonStyles.ContainerPink,]}>
      <MaterialTabBarOrder />
    </View>
  );
};

export default Orders;
