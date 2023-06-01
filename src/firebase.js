// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPA_CYrcLo91u2d1rGkYdd5u-3DYRPMoI",
  authDomain: "kates-store.firebaseapp.com",
  projectId: "kates-store",
  storageBucket: "kates-store.appspot.com",
  messagingSenderId: "379806100662",
  appId: "1:379806100662:web:4182abf1ac31dd33d1ca17",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
