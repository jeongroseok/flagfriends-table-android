import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCbwPmguKrZX76ClWw7vd7Df_OUgKvDznU",
  authDomain: "flag-prototype-2.firebaseapp.com",
  projectId: "flag-prototype-2",
  storageBucket: "flag-prototype-2.appspot.com",
  messagingSenderId: "225622882977",
  appId: "1:225622882977:web:7cb62bd5803b5f01a1cee0",
  measurementId: "G-R2F0559QQX",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
