// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeTv-Ck3cffQjlFn8RJO6HnHvimKEFijY",
  authDomain: "sigmanetflix-a9eb6.firebaseapp.com",
  projectId: "sigmanetflix-a9eb6",
  storageBucket: "sigmanetflix-a9eb6.appspot.com",
  messagingSenderId: "1019223315423",
  appId: "1:1019223315423:web:d01d041ccd8c95b1386a6a",
  measurementId: "G-KKMH8XZ0NH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();