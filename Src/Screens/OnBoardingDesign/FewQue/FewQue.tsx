import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
} from 'react-native';
import React from 'react';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import ImagesAll from '../../../StyleSheet/ImagesAll';
import {CommonStyles} from '../../../StyleSheet/CommonStyle';
import {CommisionFreeStyles} from '../CommisionFree/CommisionFreeStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FewQueStyles} from './FewQueStyle';
const FewQue = ({navigation}: any) => {
  return (
    <View style={CommonStyles.ContainerWhite}>
      <ScrollView contentContainerStyle={{ 
          flexGrow: 1, 
          flexDirection: 'column', 
          justifyContent: 'space-between'
      }}>
      <View >
        <View style={CommonStyles.sideSpace}>
          <Image
            source={ImagesAll.Group1}
            style={{alignSelf: 'center', marginTop: 30}}
          />
          <Text
            style={[
              CommisionFreeStyles.mainTxt,
              CommisionFreeStyles.centerTxt,
            ]}>
            Answer a few questions about investing
          </Text>
          <Text style={FewQueStyles.helpText}>
            Help us understand your financial and investing background so that
            we can tailor Wekeza to you.
          </Text>
        </View>
      </View>  
        <ImageBackground
          source={ImagesAll.geryCurve}
          resizeMode={'stretch'}
          style={CommonStyles.geryCurve}>
          <View style={CommisionFreeStyles.iconBorder}>
            <TouchableOpacity
              style={CommisionFreeStyles.iconView}
              onPress={() => navigation.navigate('QueMark')}>
              <Ionicons
                name="arrow-forward-circle-outline"
                color={ColorSheet.$white}
                size={40}
              />
            </TouchableOpacity>
          </View>
          <View style={CommisionFreeStyles.dotView}>
            <View style={CommisionFreeStyles.dot} />
            <View
              style={[CommisionFreeStyles.dot, CommisionFreeStyles.longDash]}
            />
            <View style={CommisionFreeStyles.dot} />
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default FewQue;
