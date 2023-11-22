// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCujrxOJvnH9W7WYQ3tzURP7SD__FlF3xU",
  authDomain: "ecomapp-68900.firebaseapp.com",
  projectId: "ecomapp-68900",
  storageBucket: "ecomapp-68900.appspot.com",
  messagingSenderId: "922205364384",
  appId: "1:922205364384:web:fc5028360723ec017229c5",
  measurementId: "G-90CFTYJSKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;
const analytics = getAnalytics(app);