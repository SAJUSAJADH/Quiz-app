// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuEIoqgMoaVPs-QT6ZWAFATg8HZTe8ZL8",
  authDomain: "jobportal-c5dd2.firebaseapp.com",
  projectId: "jobportal-c5dd2",
  storageBucket: "jobportal-c5dd2.appspot.com",
  messagingSenderId: "632784671419",
  appId: "1:632784671419:web:7e6c70f7ceb196c6428f9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app}