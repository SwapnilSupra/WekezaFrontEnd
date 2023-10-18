import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { URLConstants } from '../../Constants/urlConstant';
import { retrieveApiKeydata } from '../../Utils/utils';

const Video = () => {

    const [getUrl, setUrl] = useState(null)
    //'https://www.youtube.com/watch?v=1xwD5My1AjM'
    const getKey = async () => {

        const retrievedObject = await retrieveApiKeydata();
        setUrl(retrievedObject.Wekezavideourl);
    };

    useEffect(() => {

        getKey();
    }, []);

    return (

        <>
            <SafeAreaView style={{ flex: 1 }}>
                <WebView source={{ uri: getUrl! }} />
            </SafeAreaView>
        </>
    );
}

export default Video;