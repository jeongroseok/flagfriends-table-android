import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCbwPmguKrZX76ClWw7vd7Df_OUgKvDznU",
  authDomain: "flag-prototype-2.firebaseapp.com",
  databaseURL: "https://flag-prototype-2-default-rtdb.firebaseio.com",
  projectId: "flag-prototype-2",
  storageBucket: "flag-prototype-2.appspot.com",
  messagingSenderId: "225622882977",
  appId: "1:225622882977:web:cd47eb1889b28e4aa1cee0",
  measurementId: "G-RNNRVCWQTJ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
