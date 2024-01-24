import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDromFQ592iSuxJBJGfl2E-U5ZAeAhWJtw',
  authDomain: 'projekt1-4079d.firebaseapp.com',
  projectId: 'projekt1-4079d',
  storageBucket: 'projekt1-4079d.appspot.com',
  messagingSenderId: '389344234225',
  appId: '1:389344234225:web:4738bcae40223660f43750',
};

const app = firebase.initializeApp(firebaseConfig);
const firestore = app.firestore();

export { firebase, firestore };
