// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB6izJop4Yz_gmrSp5A4zMpDR7-yyJKD4",
  authDomain: "fir-auth-8bb32.firebaseapp.com",
  projectId: "fir-auth-8bb32",
  storageBucket: "fir-auth-8bb32.appspot.com",
  messagingSenderId: "349995161896",
  appId: "1:349995161896:web:87da65ed5a74d6aa47d81d"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
// export const storage = getStorage(app);
