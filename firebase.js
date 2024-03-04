import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDbsOgUl1zpfBFVt1RBKv0ZnsU71Dz3Pg4",
  authDomain: "landry-app-31c07.firebaseapp.com",
  projectId: "landry-app-31c07",
  storageBucket: "landry-app-31c07.appspot.com",
  messagingSenderId: "856514412729",
  appId: "1:856514412729:web:1e5e4be00a6a7021405b68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db}