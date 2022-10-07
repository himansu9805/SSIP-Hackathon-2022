import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCMUxCd5URq4hHe-IEn6u8KWGurew4_q2Y",
  authDomain: "ssip-hackathon-2022-66e4b.firebaseapp.com",
  projectId: "ssip-hackathon-2022-66e4b",
  storageBucket: "ssip-hackathon-2022-66e4b.appspot.com",
  messagingSenderId: "965283144515",
  appId: "1:965283144515:web:0f35417770583180a905f6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
