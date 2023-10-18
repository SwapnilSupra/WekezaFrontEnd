import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { CommonStyles } from '../../StyleSheet/CommonStyle';
import ImagesAll from '../../StyleSheet/ImagesAll';
import { MenuStyles } from '../MenuScreen/Menu/MenuStyle';

const NewsDetails = ({ navigation, props }: any) => {

    const [Desc, setDesc] = useState();
    const [img, setImg] = useState();
    const [entityarr, setEntityarr] = React.useState([]);

    const onLoadfun = async () => {

        let dataget: any = await AsyncStorage.getItem('dataobjpass');
        var usearry = JSON.parse(dataget);
        console.log(Object.values(usearry.entities));
        setEntityarr(Object.values(usearry.entities))
        let newsDesc: any = await AsyncStorage.getItem('newsdesc');
        let imgst: any = await AsyncStorage.getItem('img');
        setDesc(newsDesc);
        setImg(imgst);
    }

    useEffect(() => {

        onLoadfun();
    }, []);

    return (

        <View style={CommonStyles.ContainerWhite}>
            <ScrollView>
                <View style={[CommonStyles.sideSpace, CommonStyles.newsDetailsWrap]}>
                    <Text style={CommonStyles.newsDetailsText} >
                        {Desc}</Text>
                    {(img) &&
                        <Image source={{ uri: img }} style={CommonStyles.newsDetailsImg} />
                    }
                    <View>
                        {entityarr.map((key: any, index: any) => (
                            <View key={key.name}>
                                <View style={CommonStyles.newsDetailsRow}>
                                    <Text style={CommonStyles.newsDetName}>Symbol name :</Text>
                                    <Text>{key.symbol}</Text>
                                </View>
                                <View style={CommonStyles.newsDetailsRow}>
                                    <Text style={CommonStyles.newsDetName}>Name :</Text>
                                    <Text>{key.name}</Text>
                                </View>
                                <View style={CommonStyles.newsDetailsLine}>
                                    {key.highlights.map((keynew: any, index: any) => (
                                        <View key={keynew.highlight}>
                                            <Text style={CommonStyles.newsDetailsHead} >Highlight</Text>
                                            <Text style={CommonStyles.newsDetailsText} >{keynew.highlight}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default NewsDetails;