// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTgcD9hzpkF1FeZLwX1HDAZizFQ0AQm2c",
  authDomain: "final-year-project-1a739.firebaseapp.com",
  projectId: "final-year-project-1a739",
  storageBucket: "final-year-project-1a739.firebasestorage.app",
  messagingSenderId: "701843811345",
  appId: "1:701843811345:web:2cc414ca46ba43751295b0",
  measurementId: "G-9HM96J6H0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };