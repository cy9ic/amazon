import firebase from 'firebase/compat/app'
import  'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBX8m8aWNT0MH7yAwFTPECUQNKmDOpHhoY",
    authDomain: "clone-1aaf7.firebaseapp.com",
    projectId: "clone-1aaf7",
    storageBucket: "clone-1aaf7.appspot.com",
    messagingSenderId: "275729194980",
    appId: "1:275729194980:web:7f84a2abd8e7fd5360f1f1"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore();
  const auth  = firebase.auth();
  export { db , auth};