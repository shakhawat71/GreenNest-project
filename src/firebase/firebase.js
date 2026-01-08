// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNyDK1_JL6g1a8Av5uYq6V0SJ7t4Ht-mY",
  authDomain: "greennest-project-c91f1.firebaseapp.com",
  projectId: "greennest-project-c91f1",
  storageBucket: "greennest-project-c91f1.firebasestorage.app",
  messagingSenderId: "901652313210",
  appId: "1:901652313210:web:d133ca8d0c27ac12f137c3",
  measurementId: "G-KNZMCFQ0JN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);