
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Keychain from 'react-native-keychain';

//const ALPACA_URL = 'https://broker-api.sandbox.alpaca.markets/v1/';
//const MARKET_URL = 'https://data.sandbox.alpaca.markets/v2/';
//-------------
const BASE_URL = 'https://mobile.wekeza.com/';
//const BASE_URL = 'http://192.168.43.14:8000/api/v1/';

//const NOTIFICATION_URL = 'https://fcm.googleapis.com/fcm/send';
//-------------
//const token = `${'CK922FPO2DFWIRZCT7PG'}:${'6NXTxlCEJhmVbG2RDRoTpWhIcTDZDphBic0qVX0E'}`;
//const NEWS_URL = 'https://api.marketaux.com/v1/';
//const MARKET_EXCHANGE = 'https://financialmodelingprep.com/api/v3/';

export async function sendNotification(bodyFormData: any) {

    const retrievedObject = await retrieveApiKeydata();
    return axios({
        method: "post",
        url: NOTIFICATION_URL,
        data: bodyFormData,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Authorization': 'key=' + retrievedObject.Notification//AAAA8dPJWoo:APA91bHUw98dJt8nM3xr1Jh4zF5tL233uiwSWVqKPEBlHoTd-TNb3uXG5grR30YEhw75WyxL0tJhg_i8j9w7a4oiQ_lcJdgr8r6Ek9oOaoX3T00Q4T1QKoXlBRar9_UQbVVH_jCGotTC'
        },
    });
}

//function for calling market api from front end
export async function makeAlpacamarketgetRequest(endpoint: any) {

    const retrievedObject = await retrieveApiKeydata();
    const res = await axios.get(MARKET_URL + endpoint
        , {
            auth: {
                username: retrievedObject.Username,//'CK922FPO2DFWIRZCT7PG',
                password: retrievedObject.Password//'6NXTxlCEJhmVbG2RDRoTpWhIcTDZDphBic0qVX0E'
            }
        }).catch(function (error) {
            //console.error(error);
        });
    return res;
}

//function for calling market api from backend end
export async function makePostMarket(endpoint: any, bodyFormData: any, id: any) {
    return axios({
        method: "post",
        url: BASE_URL + endpoint,
        data: bodyFormData,
        headers: {
            'Authorization': `Bearer ${id}`
        },
    });
}

//----------------api using alpca url
//function for calling alpaca api from front end
export async function makeAlpacagetRequest(endpoint: any) {

    const retrievedObject = await retrieveApiKeydata();
    const res = await axios.get(ALPACA_URL + endpoint
        , {
            auth: {
                username: retrievedObject.Username,//'CK922FPO2DFWIRZCT7PG',
                password: retrievedObject.Password//'6NXTxlCEJhmVbG2RDRoTpWhIcTDZDphBic0qVX0E'
            }
        }).catch(function (error) {
            //console.error(error);
        });
    return res;
}

//function for calling alpaca api from backend end
export async function post_GetAlpacaData(endpoint: any, bodyFormData: any, id: any) {

    return axios({
        method: "post",
        url: BASE_URL + endpoint,
        data: bodyFormData,
        headers: {
            'Authorization': `Bearer ${id}`
        },
    });
}

//function for calling alpaca api from front end
export async function makeAlpacapostRequest(endpoint: any, bodyFormData: any) {

    const retrievedObject = await retrieveApiKeydata();
    const user = await axios.post(ALPACA_URL + endpoint, bodyFormData, {
        auth: {
            username: retrievedObject.Username,//'CK922FPO2DFWIRZCT7PG',
            password: retrievedObject.Password//'6NXTxlCEJhmVbG2RDRoTpWhIcTDZDphBic0qVX0E'
        }
    })

    return user;
}

//-------------function for calling alpaca api from backend end
export async function post_PostAlpacaData(endpoint: any, bodyFormData: any, id: any) {

    return axios({
        method: "post",
        url: BASE_URL + endpoint,
        data: bodyFormData,
        headers: {
            'Authorization': `Bearer ${id}`
        },
    });
}

//-------function for calling alpaca api from front end
export async function makeAlpacadeleteRequest(endpoint: any) {

    const retrievedObject = await retrieveApiKeydata();
    const res = await axios.delete(ALPACA_URL + endpoint
        , {
            auth: {
                username: retrievedObject.Username,//'CK922FPO2DFWIRZCT7PG',
                password: retrievedObject.Password//'6NXTxlCEJhmVbG2RDRoTpWhIcTDZDphBic0qVX0E'
            }
        }).catch(function (error) {
            //console.error(error);
        });
    return res;
}

//-------------function for calling alpaca api from backend end
export async function post_DelAlpacaData(endpoint: any, bodyFormData: any, id: any) {
    return axios({
        method: "post",
        url: BASE_URL + endpoint,
        data: bodyFormData,
        headers: {
            'Authorization': `Bearer ${id}`
        },
    });
}

//-------function for calling alpaca api from front end
export async function makeAlpacaputRequest(endpoint: any, bodyFormData: any) {

    const retrievedObject = await retrieveApiKeydata();
    const user = await axios.put(ALPACA_URL + endpoint, bodyFormData, {
        auth: {
            username: retrievedObject.Username,//'CK922FPO2DFWIRZCT7PG',
            password: retrievedObject.Password//'6NXTxlCEJhmVbG2RDRoTpWhIcTDZDphBic0qVX0E'
        }
    })

    return user;
};

//-------------function for calling alpaca api from backend end
export async function post_PutAlpacaRequest(endpoint: any, bodyFormData: any, id: any) {
    return axios({
        method: "post",
        url: BASE_URL + endpoint,
        data: bodyFormData,
        headers: {
            'Authorization': `Bearer ${id}`
        },
    });
};

/// --------------------end api using alpaca url

// export async function makeNewsRequest(endpoint: any) {

//     return axios({
//         method: "get",
//         url: NEWS_URL + endpoint,
//         headers: {
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Origin": "*",
//         },
//     })
// }

// export async function makeMarketRequest(endpoint: any) {

//     return axios({
//         method: "get",
//         url: MARKET_EXCHANGE + endpoint,
//         headers: {
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Origin": "*",
//         },
//     });
// };

// api for posstgers sql ---------------------------

export async function makeUploadRequest(endpoint: any, bodyFormData: any) {

    //console.log(bodyFormData);
    return axios({
        url: BASE_URL + endpoint,
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        data: bodyFormData
    });
}

export async function makePostRequest(endpoint: any, bodyFormData: any) {

    return axios({
        method: "post",
        url: BASE_URL + endpoint,
        data: bodyFormData,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
}

export async function makePostRequestpass(endpoint: any, bodyFormData: any, id: any) {

    return axios({
        method: "post",
        url: BASE_URL + endpoint,
        data: bodyFormData,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Authorization': `Bearer ${id}`
        },
    });
}

export async function makeGetRequest(endpoint: any, id: any) {

    return axios({
        method: "get",
        url: BASE_URL + endpoint,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Authorization': `Bearer ${id}`
        },
    }).catch(function (error) {
    });
}

export async function makePutRequest(endpoint: any, bodyFormData: any, id: any) {

    return axios({

        method: "put",
        url: BASE_URL + endpoint,
        data: bodyFormData,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Authorization': `Bearer ${id}`
        },
    });
}

export async function uploadImages(url: any, form: any, token: any) {
    try {
        const response = await axios.post(BASE_URL + url, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data; // You can modify this to return whatever data you need
    } catch (error) {
        throw error;
    }
};

export async function storeApiKey(jsonObject: any) {

    try {
        const jsonStr = JSON.stringify(jsonObject);
        await Keychain.setGenericPassword('my_json_object', jsonStr);
        await AsyncStorage.setItem('soketurl', jsonObject.Websocketurl)
        console.log(jsonObject.Websocketurl);
    } catch (error) {
        console.error('Error storing JSON object:', error);
    }
};
//--------------------------
export async function retrieveApiKeydata() {

    try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
            const jsonObject = JSON.parse(credentials.password);
            return jsonObject;
        } else {
            console.log('No JSON object stored.');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving JSON object:', error);
        return null;
    }
};