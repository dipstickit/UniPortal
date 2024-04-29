// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd4g07l95ERs_WgpbVrTkgdL3m2Z1ILco",
  authDomain: "uniportal-96379.firebaseapp.com",
  projectId: "uniportal-96379",
  storageBucket: "uniportal-96379.appspot.com",
  messagingSenderId: "871428017859",
  appId: "1:871428017859:web:5a38d828a107cbdb58dc76",
  measurementId: "G-HELREX9TWQ"
};

// Initialize Firebase


const firebaseApp = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(firebaseApp);
auth.languageCode = 'vi';