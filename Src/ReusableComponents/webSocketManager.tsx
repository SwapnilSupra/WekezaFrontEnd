
import { retrieveApiKeydata } from '../Utils/utils';

interface AuthMessage {
    action: string;
    key: string;
    secret: string;
};


export const connectWebSocket = async () => {

    try {

        const retrievedObject = await retrieveApiKeydata();

        if (retrievedObject.Websocketurl) {

            let ws = new WebSocket(retrievedObject.Websocketurl);

            // ws.onopen = async () => {

            //     try {

            //         const authMessage: AuthMessage = {
            //             action: 'auth',
            //             key: retrievedObject.Username,
            //             secret: retrievedObject.Password,
            //         };
            //         ws.send(JSON.stringify(authMessage)); // Send Message
            //     } catch (error) {

            //     }
            // };

            return ws;
        }
    } catch (error) {
        console.error('Error retrieving WebSocket URL:', error);
    }
};

// Export the WebSocket instance
//export default ws;

