// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGwMzujktSuR_kW2MltJ5NmgQeN3ckZ50",
  authDomain: "chain-think.firebaseapp.com",
  projectId: "chain-think",
  storageBucket: "chain-think.appspot.com",
  messagingSenderId: "12597328654",
  appId: "1:12597328654:web:3612f7848c75509424f55f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
