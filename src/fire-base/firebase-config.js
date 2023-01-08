// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5LORAHta2ZOsoGsF0AyiYjydSodQO-Bg",
  authDomain: "movie-3d92e.firebaseapp.com",
  projectId: "movie-3d92e",
  storageBucket: "movie-3d92e.appspot.com",
  messagingSenderId: "920537393043",
  appId: "1:920537393043:web:a35583200d3856f0bfaa66",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Init services
export const db = getFirestore(app);
export const auth = getAuth(app);