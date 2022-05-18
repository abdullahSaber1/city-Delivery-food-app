// Import the functions you need from the SDKs you need
import {initializeApp, getApp, getApps} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyALGLMWIhrqe-lekaKwv4rXOEW82Fbc7Rc',
  authDomain: 'resturant-1686b.firebaseapp.com',
  databaseURL: 'https://resturant-1686b-default-rtdb.firebaseio.com',
  projectId: 'resturant-1686b',
  storageBucket: 'resturant-1686b.appspot.com',
  messagingSenderId: '1027609567234',
  appId: '1:1027609567234:web:bbe7fc56ca290ff5ec871b',
  measurementId: 'G-N1EV5ZSRHT',
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firebaseStore = getFirestore(app);

const storage = getStorage(app);

export {app, firebaseStore, storage};
