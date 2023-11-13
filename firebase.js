import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyCQF1mULqjvRuX-67DFqQY47Nni5HtqPWo",
  authDomain: "whatsappchatlikeapp2.firebaseapp.com",
  projectId: "whatsappchatlikeapp2",
  storageBucket: "whatsappchatlikeapp2.appspot.com",
  messagingSenderId: "633774045053",
  appId: "1:633774045053:web:dcc15888b120d875ae7e14",
  measurementId: "G-37T9L3NWB1"
};


const app = initializeApp(firebaseConfig);
export const authorisation = getAuth(app)