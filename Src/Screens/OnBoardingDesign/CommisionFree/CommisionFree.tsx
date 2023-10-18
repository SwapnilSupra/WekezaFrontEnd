import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import React from 'react';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import ImagesAll from '../../../StyleSheet/ImagesAll';
import {CommonStyles} from '../../../StyleSheet/CommonStyle';
import {CommisionFreeStyles} from './CommisionFreeStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CommisionFree = ({navigation}: any) => {
  return (
    <View style={CommonStyles.ContainerWhite}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View style={CommonStyles.sideSpace}>
          <Text style={CommisionFreeStyles.mainTxt}>
            Commission-free investing
          </Text>
          <View style={CommisionFreeStyles.stockTxt}>
            <Image source={ImagesAll.Group} />
            <Text style={CommisionFreeStyles.txt}>Stock</Text>
          </View>
          <View style={CommisionFreeStyles.stockTxt}>
            <Image source={ImagesAll.Group} />
            <Text style={CommisionFreeStyles.txt}>EFTs</Text>
          </View>
          <View style={CommisionFreeStyles.stockTxt}>
            <Image source={ImagesAll.Group} />
            <Text style={CommisionFreeStyles.txt}>Bonds</Text>
          </View>
          <View style={CommisionFreeStyles.stockTxt}>
            <Image source={ImagesAll.Group} />
            <Text style={CommisionFreeStyles.txt}>Mutual Funds</Text>
          </View>
          <View style={CommisionFreeStyles.stockTxt}>
            <Image source={ImagesAll.Group} />
            <Text style={CommisionFreeStyles.txt}>Financial Education</Text>
          </View>
          <View style={CommisionFreeStyles.stockTxt}>
            <Image source={ImagesAll.Group} />
            <Text style={CommisionFreeStyles.txt}>Cryptocurrency</Text>
          </View>
          <View style={CommisionFreeStyles.stockTxt}>
            <Image source={ImagesAll.Group} />
            <Text style={CommisionFreeStyles.txt}>Wekeza member events</Text>
          </View>
        </View>
        <View>
          <ImageBackground
            source={ImagesAll.geryCurve}
            resizeMode={'stretch'}
            style={CommonStyles.geryCurve}>
            <View style={CommisionFreeStyles.iconBorder}>
              <TouchableOpacity
                style={CommisionFreeStyles.iconView}
                onPress={() => navigation.navigate('FewQue')}>
                <Ionicons
                  name="arrow-forward-circle-outline"
                  color={ColorSheet.$white}
                  size={40}
                />
              </TouchableOpacity>
            </View>
            <View style={CommisionFreeStyles.dotView}>
              <View
                style={[CommisionFreeStyles.dot, CommisionFreeStyles.longDash]}
              />
              <View style={CommisionFreeStyles.dot} />
              <View style={CommisionFreeStyles.dot} />
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
};

export default CommisionFree;
