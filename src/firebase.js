import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCyjeSzU-QlSdlP6bL7Rrc2DkocBCU8oi0",
    authDomain: "meridi-dde85.firebaseapp.com",
    projectId: "meridi-dde85",
    storageBucket: "meridi-dde85.appspot.com",
    messagingSenderId: "348704235175",
    appId: "1:348704235175:web:8f0fcce19dbe577dfc4582"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;