import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CommonStyles} from '../../../StyleSheet/CommonStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ColorSheet from '../../../StyleSheet/ColorSheet';

const Todays = ({navigation}: any) => {
  
  return (
    <View style={[CommonStyles.ContainerPink, CommonStyles.sideSpace]}>
      <View style={[CommonStyles.StockView, CommonStyles.stockViewDetails]}>
        <View style={CommonStyles.cardHead}>
          <View>
            <Text style={CommonStyles.stockName}>Starbucks </Text>
            <Text style={CommonStyles.StockCode}>SBUX</Text>
          </View>
          <View style={CommonStyles.bellOut}>
            <TouchableOpacity>
              <FontAwesome name="bell-o" style={CommonStyles.bellIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailsStockView')}>
              <Text style={CommonStyles.tradeBut}>Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={CommonStyles.divider} />
        <View style={CommonStyles.StockDetails}>
          <View>
            <Text style={CommonStyles.StckPrice}>$3,204</Text>
            <Text style={CommonStyles.StckPriceTxt}>Average Price</Text>
          </View>
          <View>
            <Text style={CommonStyles.StckPrice}>20</Text>
            <Text style={CommonStyles.StckPriceTxt}>Net Quantity</Text>
          </View>
        </View>
        <View style={CommonStyles.divider} />
        <View style={CommonStyles.StockDetails}>
          <Text style={CommonStyles.stockName}>P&L</Text>
          <Text style={[CommonStyles.StckPrice, {color: ColorSheet.$Errorred}]}>
            -$31,120.25
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Todays;
