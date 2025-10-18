// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFlKX-6vv5K3masgIi-avj0JzEDQd91HQ",
  authDomain: "tienda-online-v2-894b2.firebaseapp.com",
  projectId: "tienda-online-v2-894b2",
  storageBucket: "tienda-online-v2-894b2.firebasestorage.app",
  messagingSenderId: "396316680011",
  appId: "1:396316680011:web:e4aceb2969d5abe50212ce"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize DataBase
export const db = getFirestore(app);