import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../../../StyleSheet/CommonStyle';
import { WatchListStyles } from '../../WatchlistScreens/WatchList/WatchListStyle';
import { DetailsStockViewStyles } from '../DetailsStockView/DetailsStockViewStyle';
import SelectDropdown from 'react-native-select-dropdown';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ColorSheet from '../../../StyleSheet/ColorSheet';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAlpacapostRequest, makePostRequest, makePostRequestpass, post_PostAlpacaData, sendNotification } from '../../../Utils/utils';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

let amount: any

const ConfirmOrder = ({ navigation }: any) => {

  const [DocumentType, setDocumentType] = useState('');
  const [getVolume, setVolume] = useState('');
  const [getBid, setBid] = useState('');
  const [getOpenprice, setOpenprice] = useState('');
  const [getAskprice, setAskprice] = useState('');
  const [getSymbol, setSymbol] = useState('');
  const [getMarket, setMarket] = useState(false);
  const [getLimit, setLimit] = useState(false);
  const [getprice, setPrice] = useState('');
  const [getQuantity, setQuantity] = useState('');
  const [fullname, setfullname] = useState('');
  const [isModalCreate, setModalCreate] = useState(false);
  const [errortext, seterrortext] = useState('');
  const [priceType, setpriceType] = useState('');
  const [priceval, setpriceval] = useState('');


  var Documenttype = ['market'];
  var pricetype = ['Number of shares', 'Dollar'];

  let volume: any;
  let bid: any;
  let openprice: any;
  let ask: any;
  let symbol: any;

  const placeOrder = async () => {

    let isfrac = await AsyncStorage.getItem('fractionval');
    let notification_token = await AsyncStorage.getItem('fcmToken');
    let tokenidstore = await AsyncStorage.getItem('token');

    let tradtype = await AsyncStorage.getItem('tradeType');
    symbol = await AsyncStorage.getItem('tradeSymbol');
    let alpaca_id = await AsyncStorage.getItem('alpaca_id');
    let storeuseremailid = await AsyncStorage.getItem('emailstore');

    var body;

    if (isfrac == 'false' && (Number(getQuantity) > Math.floor(Number(getQuantity)))) {
      var errmsg = 'Quantity is not fractionable'
      seterrortext(errmsg)
      setModalCreate(true)
    }
    else {

      // if (tradtype == 'buy' && priceval == 'quantity') {
      //   body = {
      //     "symbol": symbol,
      //     "qty": getQuantity,
      //     "side": "buy",
      //     "type": DocumentType,
      //     ...(Number(getQuantity) > Math.floor(Number(getQuantity)) ? { "time_in_force": "day" } : { "time_in_force": "gtc" })
      //   }
      // }
      // else if (tradtype == 'buy' && priceval == 'dollar') {
      //   body = {
      //     "symbol": symbol,
      //     "notional": getQuantity,
      //     "side": "buy",
      //     "type": DocumentType,
      //     "time_in_force": "day"
      //   }
      // }
      // else if (tradtype == 'sell' && priceval == 'dollar') {

      //   body = {
      //     "symbol": symbol,
      //     "notional": getQuantity,
      //     "side": "buy",
      //     "type": DocumentType,
      //     "time_in_force": "day"
      //   }
      // }
      // else {
      //   body = {
      //     "symbol": symbol,
      //     "qty": getQuantity,
      //     "side": "sell",
      //     "type": DocumentType,
      //     ...(Number(getQuantity) > Math.floor(Number(getQuantity)) ? { "time_in_force": "day" } : { "time_in_force": "gtc" })
      //   }
      // }

      // let quantity: any;
      // if (priceval == 'dollar') {
      //   quantity = '$ ' + getQuantity + ' dollar';
      // } else { quantity = getQuantity + ' shares' }

      // makeAlpacapostRequest('trading/accounts/' + alpaca_id + '/orders', body)
      //   .then(async (result: any) => {

      //     var datestore = new Date();
      //     var todayYear = (new Date()).getFullYear();
      //     datestore = result.data.submitted_at;
      //     var arr = datestore.split("T");
      //     var finaldatestore = arr[0];

      //     var stockname = await AsyncStorage.getItem('tradeSymbolname');
      //     navigation.navigate('Orders');
      //     const textmailbuy =
      //       "<span  style='display: block; width: 500px;margin: 0 auto; box-shadow: 0px 0px 10px #ccc; border-radius: 20px; padding: 30px 30px; border-top: 5px solid #4678f8; border-bottom: 5px solid #4678f8;background-repeat: no-repeat; background-position-x: right;background-position-y: top;background-size: 250px; box-shadow: 0px 0px 15px #ccc;'><p style='margin-top: 120px; font-size='16px''>Dear " + fullname + ",</p> <p style='font-size='16px''>Your order has been received. Your " + DocumentType + " order to " + tradtype + " " + quantity + "  of " + symbol + " was executed at an average price of $" + getBid + " on " + finaldatestore + ". Your trade confirmation will be available for your review the next business day. You can find this document on the Wekeza app under account settings.If you have any questions, please reach out to us at mailto:help@wekeza.com <br> Live long and prosper.";

      //     var bodyFormDatamail = {
      //       email: storeuseremailid,
      //       mailData: textmailbuy,
      //       subject: 'Order confirmation'
      //     };

      //     makePostRequestpass('auth/sendmail', bodyFormDatamail, tokenidstore)
      //       .then(async (res: any) => {

      //       })
      //       .catch(function (error) {
      //         var errmsg = JSON.stringify(error.response.data.message)
      //         seterrortext(errmsg)
      //         setModalCreate(true)
      //         console.log(error);
      //       });

      //     var notificationBody = {
      //       "registration_ids": [notification_token],
      //       "notification": {
      //         "title": 'Place order for ' + tradtype + 'stock',
      //         "body": "Your " + DocumentType + " order to " + tradtype + " " + quantity + " share of " + symbol + " was executed at an average price of $" + getBid + " on " + finaldatestore + ""
      //       }
      //     }
      //     sendNotification(notificationBody)
      //       .then(async (res: any) => {

      //       })

      //     // add to tbl
      //     if (tradtype == 'buy') {
      //       var bodyFormDatatrend = {
      //         symbol: symbol,
      //         stock_name: stockname,
      //         created_at: finaldatestore
      //       };
      //       makePostRequestpass('auth/addTrendingstock', bodyFormDatatrend, tokenidstore)
      //         .then(async (res: any) => {

      //         })
      //         .catch(function (error) {
      //           var errmsg = JSON.stringify(error.response.data.message)
      //           seterrortext(errmsg)
      //           setModalCreate(true)
      //           console.log(error);
      //         });
      //     }
      //   })
      //   .catch(function (error) {
      //     var errmsg = JSON.stringify(error.response.data.message)
      //     seterrortext(errmsg)
      //     setModalCreate(true)
      //     console.log(error);
      //   });
      //-----------------------------
      if (tradtype == 'buy' && priceval == 'quantity') {
        body = {
          "url": 'trading/accounts/' + alpaca_id + '/orders',
          "symbol": symbol,
          "qty": getQuantity,
          "side": "buy",
          "type": DocumentType,
          ...(Number(getQuantity) > Math.floor(Number(getQuantity)) ? { "time_in_force": "day" } : { "time_in_force": "gtc" })
        }
      }
      else if (tradtype == 'buy' && priceval == 'dollar') {
        body = {
          "url": 'trading/accounts/' + alpaca_id + '/orders',
          "symbol": symbol,
          "notional": getQuantity,
          "side": "buy",
          "type": DocumentType,
          "time_in_force": "day"
        }
      }
      else if (tradtype == 'sell' && priceval == 'dollar') {

        body = {
          "url": 'trading/accounts/' + alpaca_id + '/orders',
          "symbol": symbol,
          "notional": getQuantity,
          "side": "buy",
          "type": DocumentType,
          "time_in_force": "day"
        }
      }
      else {
        body = {
          "url": 'trading/accounts/' + alpaca_id + '/orders',
          "symbol": symbol,
          "qty": getQuantity,
          "side": "sell",
          "type": DocumentType,
          ...(Number(getQuantity) > Math.floor(Number(getQuantity)) ? { "time_in_force": "day" } : { "time_in_force": "gtc" })
        }
      }

      let quantity: any;
      if (priceval == 'dollar') {
        quantity = '$ ' + getQuantity + ' dollar';
      } else { quantity = getQuantity + ' shares' }

      let tokenidstore = await AsyncStorage.getItem('token');
      post_PostAlpacaData('alpaca/postalpacadata', body, tokenidstore)
        .then(async (result: any) => {

          var datestore = new Date();
          var todayYear = (new Date()).getFullYear();
          datestore = result.data.data.submitted_at;
          var arr = datestore.split("T");
          var finaldatestore = arr[0];

          var stockname = await AsyncStorage.getItem('tradeSymbolname');
          navigation.navigate('Orders');
          const textmailbuy =
            "<span  style='display: block; width: 500px;margin: 0 auto; box-shadow: 0px 0px 10px #ccc; border-radius: 20px; padding: 30px 30px; border-top: 5px solid #4678f8; border-bottom: 5px solid #4678f8;background-repeat: no-repeat; background-position-x: right;background-position-y: top;background-size: 250px; box-shadow: 0px 0px 15px #ccc;'><p style='margin-top: 120px; font-size='16px''>Dear " + fullname + ",</p> <p style='font-size='16px''>Your order has been received. Your " + DocumentType + " order to " + tradtype + " " + quantity + "  of " + symbol + " was executed at an average price of $" + getBid + " on " + finaldatestore + ". Your trade confirmation will be available for your review the next business day. You can find this document on the Wekeza app under account settings.If you have any questions, please reach out to us at mailto:help@wekeza.com <br> Live long and prosper.";

          var bodyFormDatamail = {
            email: storeuseremailid,
            mailData: textmailbuy,
            subject: 'Order confirmation'
          };

          makePostRequestpass('auth/sendmail', bodyFormDatamail, tokenidstore)
            .then(async (res: any) => {

            })
            .catch(function (error) {
              var errmsg = JSON.stringify(error.response.data.message)
              seterrortext(errmsg)
              setModalCreate(true)
              console.log(error);
            });

          var notificationBody = {
            "registration_ids": [notification_token],
            "notification": {
              "title": 'Place order for ' + tradtype + 'stock',
              "body": "Your " + DocumentType + " order to " + tradtype + " " + quantity + " share of " + symbol + " was executed at an average price of $" + getBid + " on " + finaldatestore + ""
            }
          }
          sendNotification(notificationBody)
            .then(async (res: any) => {

            })

          // add to tbl
          if (tradtype == 'buy') {
            var bodyFormDatatrend = {
              symbol: symbol,
              stock_name: stockname,
              created_at: finaldatestore
            };
            makePostRequestpass('auth/addTrendingstock', bodyFormDatatrend, tokenidstore)
              .then(async (res: any) => {

              })
              .catch(function (error) {
                var errmsg = JSON.stringify(error.response.data.message)
                seterrortext(errmsg)
                setModalCreate(true)
                console.log(error);
              });
          }
        })
        .catch(function (error) {
          var errmsg = JSON.stringify(error.response.data.message)
          seterrortext(errmsg)
          setModalCreate(true)
        });
    }

  }

  const setelement = async (item: any, index: any) => {
    setDocumentType(item);
  }

  const setpriceelement = async (item: any, index: any) => {
    setpriceval(item)
    setpriceType(item);
    if (index == 0 || index == 1) {
      setMarket(true);
      setLimit(false)
    }
    else {
      setMarket(false);
      setLimit(true)
    }
  }
  const onLoadfun = async () => {

    let saveuserfname: any = await AsyncStorage.getItem('userfname');
    let saveuserlname: any = await AsyncStorage.getItem('userlname');
    amount = await AsyncStorage.getItem('Amount');
    let fullnamenew = saveuserfname + ' ' + saveuserlname;
    setfullname(fullnamenew);

    try {
      symbol = await AsyncStorage.getItem('tradeSymbol');
      volume = await AsyncStorage.getItem('volume');
      bid = await AsyncStorage.getItem('bid');
      openprice = await AsyncStorage.getItem('openprice');
      ask = await AsyncStorage.getItem('ask');
      setAskprice(ask);
      setBid(bid);
      setVolume(volume);
      setOpenprice(openprice);
      setSymbol(symbol);

    } catch (e) {
      console.log(e);
    }
  }

  const toggleModal1 = () => {
    setModalCreate(!isModalCreate);
  };

  useEffect(() => {
    onLoadfun();
  }, []);

  return (
    <ScrollView>
      <View style={[CommonStyles.sideSpace, CommonStyles.commonVerticalSP]}>
        <View style={[CommonStyles.StockView, CommonStyles.availableBal]}>
          <Text style={DetailsStockViewStyles.StockTxt}>${amount}</Text>
          <Text style={DetailsStockViewStyles.Priceavail}>
            amount available for sell
          </Text>
        </View>
        <View style={[CommonStyles.StockView, CommonStyles.stockViewDetailsOrd]}>
          <Text style={DetailsStockViewStyles.currentPrice}>{getOpenprice}</Text>
          <Text style={DetailsStockViewStyles.PriceTxt}>Open Price</Text>
          <View style={CommonStyles.divider} />
          <View style={DetailsStockViewStyles.DetailsView}>
            <Text style={DetailsStockViewStyles.PriceTxt}>Symbol</Text>
            <Text style={DetailsStockViewStyles.DetailsPrice}>{getSymbol}</Text>
          </View>
          <View style={DetailsStockViewStyles.DetailsView}>
            <Text style={DetailsStockViewStyles.PriceTxt}>Volume</Text>
            <Text style={DetailsStockViewStyles.DetailsPrice}>{getVolume}</Text>
          </View>
          <View style={DetailsStockViewStyles.DetailsView}>
            <Text style={DetailsStockViewStyles.PriceTxt}>Bid</Text>
            <Text style={DetailsStockViewStyles.DetailsPrice}>{getBid}</Text>
          </View>
          <View style={DetailsStockViewStyles.DetailsView}>
            <Text style={DetailsStockViewStyles.PriceTxt}>Ask</Text>
            <Text style={DetailsStockViewStyles.DetailsPrice}>{getAskprice}</Text>
          </View>
          <View style={[DetailsStockViewStyles.DetailsView, CommonStyles.miniBotSp]}>
            <Text style={DetailsStockViewStyles.PriceTxt}>Day High</Text>
            <Text style={DetailsStockViewStyles.DetailsPrice}>32,101.00</Text>
          </View>
          <SelectDropdown
            data={Documenttype}
            renderDropdownIcon={(selectedItem: any, index: number) => (
              <Fontisto name="angle-down" style={CommonStyles.DropdownIcon} />
            )}
            dropdownIconPosition="right"
            onSelect={(selectedItem, index) => {
              setelement(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={CommonStyles.inputFieldDrop}
            buttonTextStyle={CommonStyles.DropdownTxt}
            defaultButtonText={'Select Option'}
          />
          {/* pcetye */}
          <SelectDropdown
            data={pricetype}
            renderDropdownIcon={(selectedItem: any, index: number) => (
              <Fontisto name="angle-down" style={CommonStyles.DropdownIcon} />
            )}
            dropdownIconPosition="right"
            onSelect={(selectedItem, index) => {
              setpriceelement(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={CommonStyles.inputFieldDrop}
            buttonTextStyle={CommonStyles.DropdownTxt}
            defaultButtonText={'Select Option'}
          />
          {getMarket && priceval == 'Number of shares' &&
            <TextInput
              value={getQuantity}
              onChangeText={(value) => setQuantity(value)}
              placeholder="Enter Quantity"
              placeholderTextColor={ColorSheet.$Gray6}
              style={CommonStyles.inputFieldDrop}
            />}
          {getMarket && priceval == 'Dollar' &&
            <TextInput
              value={getQuantity}
              onChangeText={(value) => setQuantity(value)}
              placeholder="Enter Dollar value"
              placeholderTextColor={ColorSheet.$Gray6}
              style={CommonStyles.inputFieldDrop}
            />
          }
          {getLimit ?
            <>
              <TextInput
                value={getQuantity}
                onChangeText={(value) => setQuantity(value)}
                placeholder="Enter Quantity"
                placeholderTextColor={ColorSheet.$Gray6}
                style={CommonStyles.inputFieldDrop}
              />
              <TextInput
                value={getprice}
                onChangeText={(value) => setPrice(value)}
                placeholder="Enter Price"
                placeholderTextColor={ColorSheet.$Gray6}
                style={CommonStyles.inputFieldDrop}
              />
            </> : null
          }


        </View>
        <View style={CommonStyles.commonTopSP}>
          <TouchableOpacity onPress={() => placeOrder()}>
            <View style={[CommonStyles.btnCotainer]}>
              <Text style={CommonStyles.btnTxt}>Confirm Order</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Modal isVisible={isModalCreate}>
        <View style={WatchListStyles.ModalView}>
          <TouchableOpacity onPress={toggleModal1}>
            <View style={CommonStyles.closeBtnView}>
              <Ionicons name="close" style={CommonStyles.clodeICon} />
            </View>
          </TouchableOpacity>
          <Text style={WatchListStyles.PopupHeader}>
            {errortext}
          </Text>
          <View style={CommonStyles.commonBotSP}>
            <TouchableOpacity onPress={toggleModal1}>
              <View style={[CommonStyles.btnCotainer, { marginTop: 10 }]}>
                <Text style={CommonStyles.btnTxt}>Ok</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ConfirmOrder;
