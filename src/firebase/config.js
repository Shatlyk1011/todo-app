import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfcZAazt7NMvAQMlF-vipPnX-2csjb5UA",
  authDomain: "todo-list-92d50.firebaseapp.com",
  projectId: "todo-list-92d50",
  storageBucket: "todo-list-92d50.appspot.com",
  messagingSenderId: "591566698624",
  appId: "1:591566698624:web:35adc10595f4b15e908e65",
  measurementId: "G-PYVP4VBE05",
};

firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, timestamp };
