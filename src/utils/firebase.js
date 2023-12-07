// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyAWH3C1sNrpa1SA5yzQWUjivrs9IaM4ClQ',
  authDomain: 'tempxfcm.firebaseapp.com',
  projectId: 'tempxfcm',
  storageBucket: 'tempxfcm.appspot.com',
  messagingSenderId: '508646876919',
  appId: '1:508646876919:web:56abb6a2b96eb91d6a55f2',
  measurementId: 'G-6PMML27BJP',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
export const getDeviceToken = (setTokenFound) => {
  return getToken(messaging, { vapidKey: 'GENERATED_MESSAGING_KEY' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
};
