import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvRorm6lzRrY6tt1HThF1IKSrDStS11z8",
  authDomain: "labweb-proyecto1.firebaseapp.com",
  projectId: "labweb-proyecto1",
  storageBucket: "labweb-proyecto1.appspot.com",
  messagingSenderId: "738209799033",
  appId: "1:738209799033:web:24bc7358a38ae587d4ada8",
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore();
export const auth = getAuth();
