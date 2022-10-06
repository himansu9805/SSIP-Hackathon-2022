import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCNvQoo33yo0nFGIwifr-GPCyzb0Vn-Rgk",
  authDomain: "the-flutter-app-a6b43.firebaseapp.com",
  projectId: "the-flutter-app-a6b43",
  storageBucket: "the-flutter-app-a6b43.appspot.com",
  messagingSenderId: "221988841875",
  appId: "1:221988841875:web:48f58a471af2e90f9ee066",
  measurementId: "G-SBC1F75DCX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
