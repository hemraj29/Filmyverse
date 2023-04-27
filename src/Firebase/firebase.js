
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore ,collection} from 'firestore/firebase.js'




const firebaseConfig = {
  apiKey: "AIzaSyDq-gTTRKKATsaz1TJVUoaDuP06270BoAU",
  authDomain: "filmyverse-da706.firebaseapp.com",
  projectId: "filmyverse-da706",
  storageBucket: "filmyverse-da706.appspot.com",
  messagingSenderId: "448681409172",
  appId: "1:448681409172:web:f67fb456f640950dae5281",
  measurementId: "G-CBRXL7NFTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
// export  const moviesRef =  collection(db , "movies");
export const moviesRef = collection(db , 'movies');
export default app;