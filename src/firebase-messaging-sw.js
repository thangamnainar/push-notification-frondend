// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBciQsXme7Mbz6ZwnDB_Y0LpZ7vT5Vew_U",
  authDomain: "test-3b80a.firebaseapp.com",
  projectId: "test-3b80a",
  storageBucket: "test-3b80a.appspot.com",
  messagingSenderId: "71929530834",
  appId: "1:71929530834:web:10e20c1e76d4c9c608e00b",
  measurementId: "G-6E56WSRFLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);