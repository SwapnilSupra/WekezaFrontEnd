import {
    View,
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import { CommonStyles } from '../../../StyleSheet/CommonStyle';
  import TabBarTransaction from './TabBarTransaction/TabBarTransaction';

  
  const TransactionDetails = () => {

    return (
  
      <View style={CommonStyles.ContainerPink}>
        <TabBarTransaction/>
      </View> 
    );
  }
  
  export default TransactionDetails;
  