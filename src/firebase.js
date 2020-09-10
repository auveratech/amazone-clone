import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD6FcRNuVxMht2_qYDwfsNHDvD6mA7AJfU",
    authDomain: "clone-e75b9.firebaseapp.com",
    databaseURL: "https://clone-e75b9.firebaseio.com",
    projectId: "clone-e75b9",
    storageBucket: "clone-e75b9.appspot.com",
    messagingSenderId: "782623138874",
    appId: "1:782623138874:web:4197cdae583ed452aac103",
    measurementId: "G-D1YQDX68ZL"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };