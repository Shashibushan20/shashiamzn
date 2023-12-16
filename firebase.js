import firebase from 'firebase/compat/app';  // Use 'compat' to support older versions
import 'firebase/compat/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyDA8NEBu4DOXb-whiKN9wXSzNeox95PJUc",
  authDomain: "shashiamzn-8c535.firebaseapp.com",
  projectId: "shashiamzn-8c535",
  storageBucket: "shashiamzn-8c535.appspot.com",
  messagingSenderId: "535799116609",
  appId: "1:535799116609:web:73b8f91ad0113d2910a7c0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;
