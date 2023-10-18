import { View, Text, Image, Alert, ImageBackground, FlatList, TouchableWithoutFeedback, ListRenderItemInfo } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../StyleSheet/CommonStyle';
import ImagesAll from '../StyleSheet/ImagesAll';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAlpacagetRequest, post_GetAlpacaData } from '../Utils/utils';
import { DashboardStyles } from '../Screens/Dashboard/dashboardStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ColorSheet from '../StyleSheet/ColorSheet';

interface watchProp {

    navigation: any,
    alpaca_id: any
}


const DashboardWatchlist = (props: watchProp) => {

    const [getPortfolio, setPortfolio] = useState([{}]);
    const [percyesterday, setpercyesterday] = useState(0);
    const [totalgain, settotalgain] = useState(0);
    const [pertotalgn, setpertotalgn] = useState(0);
    const [currval, setcurrval] = useState(0);
    const [lastdayval, setlastdayval] = useState(0);
    const [isModalCreate, setModalCreate] = useState(false);
    const [errortext, seterrortext] = useState('');
    const isCancelled = React.useRef(false);

    let current_value: number = 0;
    let last_day_val: number = 0;
    let purchase_val: number = 0;

    const getPortfoliodata = async () => {

        let savealpcaid: any = await AsyncStorage.getItem('alpaca_id');

        if (savealpcaid != null) {

            try {

                // makeAlpacagetRequest('trading/accounts/' + savealpcaid + '/positions')
                //     .then(async (result: any) => {
                //         if (!isCancelled.current) {
                //             if (result.data != 0) {
                //                 setPortfolio(result.data);
                //                 console.log(result.data);
                //                 for (let i = 0; i < result.data.length; i++) {
                //                     current_value = current_value + Number(result.data[i].current_price);
                //                     last_day_val = last_day_val + Number(result.data[i].lastday_price);
                //                     var yestprofit: any = last_day_val - current_value;
                //                     var percval: any = percyesterday + Number(result.data[i].unrealized_intraday_pl);
                //                     purchase_val = purchase_val + Number(result.data[i].unrealized_pl);
                //                     var perctotal: any = pertotalgn + Number(result.data[i].unrealized_plpc);
                //                 }
                //                 setcurrval(current_value)
                //                 setlastdayval(yestprofit)
                //                 setpercyesterday(percval)
                //                 settotalgain(purchase_val)
                //                 setpertotalgn(perctotal)
                //             }
                //         }
                //     })
                //     .catch(function (error) {
                //         var errmsg = JSON.stringify(error.response.data.message)
                //         seterrortext(errmsg)
                //         setModalCreate(true)
                //     });

                var data = {
                    url: 'trading/accounts/' + savealpcaid + '/positions',
                };
                let tokenidstore = await AsyncStorage.getItem('token');
                post_GetAlpacaData('alpaca/getalpacadata', data, tokenidstore)
                    .then(async (result: any) => {
                        //if (!isCancelled.current) {
                        if (result.data != 0) {
                            setPortfolio(result.data.data);
                            for (let i = 0; i < result.data.data.length; i++) {
                                current_value = current_value + Number(result.data.data[i].current_price);
                                last_day_val = last_day_val + Number(result.data.data[i].lastday_price);
                                var yestprofit: any = last_day_val - current_value;
                                var percval: any = percyesterday + Number(result.data.data[i].unrealized_intraday_pl);
                                purchase_val = purchase_val + Number(result.data.data[i].unrealized_pl);
                                var perctotal: any = pertotalgn + Number(result.data.data[i].unrealized_plpc);
                            }
                            setcurrval(current_value)
                            setlastdayval(yestprofit)
                            setpercyesterday(percval)
                            settotalgain(purchase_val)
                            setpertotalgn(perctotal)
                        }
                        //}

                    })
                    .catch(function (error) {
                        var errmsg = JSON.stringify(error.response.data.message.message)
                        seterrortext(errmsg)
                        setModalCreate(true)
                    });
            } catch (e) {
                console.log(e);
            }
        }
    };

    useEffect(() => {

        getPortfoliodata();

        return () => { isCancelled.current = true; }
    }, []);

    return (
        <>
            {(!props.alpaca_id) &&
                <View
                    style={[
                        CommonStyles.sideSpaceDashBoard,
                        CommonStyles.ContainerTemp,
                    ]}>
                    <Text style={DashboardStyles.BoxHeading}>My Portfolio:
                        <Text style={DashboardStyles.fontcls}> ${currval.toFixed(2)}</Text></Text>
                    <View style={DashboardStyles.MarketViewOut}>
                        <FlatList showsHorizontalScrollIndicator={true}
                            horizontal
                            data={getPortfolio}
                            numColumns={1}
                            renderItem={({ item }: ListRenderItemInfo<any>) => (
                                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('PortfolioStack', { stack: 'Portfolio' })}>
                                    <View style={DashboardStyles.portfolioView}>
                                        <ImageBackground
                                            source={ImagesAll.BGCashsm}
                                            style={DashboardStyles.stockBg}>
                                            <View style={DashboardStyles.stockBgLeftsp}>
                                                <View style={CommonStyles.stocklogosm}>
                                                    <Image source={{ uri: 'https://stock-logo.s3.amazonaws.com/logos/' + item.symbol + '.png' }} style={CommonStyles.stocklogoImgsm} />
                                                </View>
                                            </View>
                                            <View >
                                                <Text style={[DashboardStyles.qutBox, DashboardStyles.whiteText]}>{item.symbol}</Text>
                                                <View style={[DashboardStyles.rowView, DashboardStyles.qutBox]}>
                                                    <Text style={DashboardStyles.qtyTxt}>Qty</Text>
                                                    <Text style={DashboardStyles.qtyValue}>{item.qty}</Text>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                        <View style={DashboardStyles.portfolioBott}>
                                            <View style={DashboardStyles.portValOut}>
                                                {(item.unrealized_pl > 0) ?
                                                    <View style={DashboardStyles.portTileInnProfit}>
                                                        <Text style={[DashboardStyles.stockUpDown]}>{Number(item.unrealized_pl).toFixed(2)}</Text>
                                                        <AntDesign name='arrowup' color={ColorSheet.$white} size={13} style={DashboardStyles.redArrowPort} />
                                                    </View>
                                                    :
                                                    <View style={DashboardStyles.portTileInnLoss}>
                                                        <Text style={[DashboardStyles.stockUpDown]}>{Number(item.unrealized_pl).toFixed(2)}</Text>
                                                        <AntDesign name='arrowdown' color={ColorSheet.$white} size={13} style={DashboardStyles.redArrowPort} />
                                                    </View>
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                        />
                    </View>
                </View>
            }
        </>
    );
};

export default React.memo(DashboardWatchlist);