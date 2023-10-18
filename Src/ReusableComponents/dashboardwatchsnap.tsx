import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DashboardStyles } from '../Screens/Dashboard/dashboardStyle';
import { makeAlpacamarketgetRequest, makePostMarket, makePostRequestpass } from '../Utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface newsProp {
  id: any,
  symbol: any,
}

let checkSnapshot: boolean;

const Dashboardwatchsnap = (props: newsProp) => {


  const isCancelled = React.useRef(false);
  const [isModalCreate, setModalCreate] = useState(false);
  const [getSnapshot, setSnapshot] = useState({ "c": 0, "h": 0, "l": 0, "n": 0, "o": 0, "t": "", "v": 0, "vw": 0 });
  const [timerState, setTimerState] = useState(null);
  let timer: any = null;

  const snapShot = async (symbol: any) => {

    try {
      // makeAlpacamarketgetRequest('stocks/' + symbol + '/snapshot')
      //   .then(async (result: any) => {

      //     if (result != undefined) {
      //       if (result.data !== null && result.data.minuteBar !== null) {

      //         setSnapshot(result.data.minuteBar);
      //       }
      //       else { setSnapshot({ "c": 0, "h": 0, "l": 0, "n": 0, "o": 0, "t": "", "v": 0, "vw": 0 }); checkSnapshot = false; }
      //     }
      //     else { console.log('ownprop') }
      //   })
      //   .catch(function (error) {
      //     console.log("erororoo_123" + error);
      //     setSnapshot({ "c": 0, "h": 0, "l": 0, "n": 0, "o": 0, "t": "", "v": 0, "vw": 0 });
      //   });
      
      var data = {
        url: 'stocks/' + symbol + '/snapshot',
      };
      let tokenidstore = await AsyncStorage.getItem('token');
      makePostMarket('alpaca/getalpacamarketdata', data, tokenidstore)
        .then(async (result: any) => {
          if (result != undefined) {
            if (result.data.data !== null && result.data.data.minuteBar !== null) {
              setSnapshot(result.data.data.minuteBar);
            }
            else { setSnapshot({ "c": 0, "h": 0, "l": 0, "n": 0, "o": 0, "t": "", "v": 0, "vw": 0 }); checkSnapshot = false; }
          }
          else { console.log('ownprop') }
        })
        .catch(function (error) {
          setSnapshot({ "c": 0, "h": 0, "l": 0, "n": 0, "o": 0, "t": "", "v": 0, "vw": 0 });
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!timerState) {
      snapShot(props.symbol);
    };
    timer = setInterval(() => {
      snapShot(props.symbol);
      setTimerState(timer);
    }, 1000 * 60 * 5);
    // snapShot(props.symbol)
    return () => clearInterval(timer);
  }, [props]);

  return (
    <View style={DashboardStyles.newWatchlist}>
      <Text style={[DashboardStyles.newWatchValue]}>{(getSnapshot.c !== 0 && getSnapshot.c > 0) ? (getSnapshot.c) : <Text style={[DashboardStyles.newWatchValue, DashboardStyles.minusValue]}>{(getSnapshot.c < 0) ? (getSnapshot.c) : null}</Text>}</Text>
    </View>
  );
};

export default React.memo(Dashboardwatchsnap);