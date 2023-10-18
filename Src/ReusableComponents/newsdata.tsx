import { View, Text, TouchableOpacity, Image, Alert, ImageBackground, FlatList, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeGetRequest } from '../Utils/utils';
import { DashboardStyles } from '../Screens/Dashboard/dashboardStyle';
import ImagesAll from '../StyleSheet/ImagesAll';

interface newsProp {

  navigation: any,
}

const Newsdata = (props: newsProp) => {


  const isCancelled = React.useRef(false);
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [newsData, setNewsdata] = useState([]);

  const getNewsfun = async () => {

    try {

      //   makeNewsRequest('news/all?filter_entities=true&language=en&exchanges=NASDAQ,NYSE&api_token=DCpkIBmm7r1qXko56skSoZ4cfKXmZ6MQmPS7GH3h')
      //     .then(async (result: any) => {
      //       if (!isCancelled.current) {
      //         setNewsdata(result.data.data);
      //       }
      //     })
      //     .catch(function (error) {
      //       var errmsg = JSON.stringify(error.response.data.message)
      //       seterrortext(errmsg)
      //       setModalCreate(true)
      //     });
      
      let tokenidstore = await AsyncStorage.getItem('token');
      makeGetRequest('alpaca/getNews', tokenidstore)
        .then(async (result: any) => {
          setNewsdata(result.data.data);
        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error.response.data.message)
          seterrortext(errmsg)
          setModalCreate(true)
        });

    } catch (e) {
      console.log(e);
    }
  };

  const onflatlistclick = async (data: any) => {

    AsyncStorage.setItem('newsuuid', data.uuid);
    AsyncStorage.setItem('newsTitle', data.title);
    AsyncStorage.setItem('dataobjpass', JSON.stringify(data));
    AsyncStorage.setItem('newsdesc', data.description);
    AsyncStorage.setItem('img', data.image_url);
    props.navigation.navigate('NewsDetails');
  };

  useEffect(() => {

    getNewsfun();
    return () => { isCancelled.current = true; }
  }, []);

  return (

    <View style={DashboardStyles.newsWrapper}>
      <FlatList showsHorizontalScrollIndicator={true}
        horizontal
        data={newsData}
        numColumns={1}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => onflatlistclick(item)}>
            <ImageBackground
              source={ImagesAll.Rectanglebg}
              style={DashboardStyles.newsMainTxtOut}>
              <Text style={DashboardStyles.newsHeadingTxt}>Breaking News</Text>
              <Text style={DashboardStyles.newsMainTxt} onPress={() => onflatlistclick(item)}>{item['title']}</Text>
            </ImageBackground>
          </TouchableWithoutFeedback>

        )}
      />
    </View>
  );
};

export default React.memo(Newsdata);