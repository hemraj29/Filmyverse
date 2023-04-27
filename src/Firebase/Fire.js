// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore , collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKBJnIont35MNRcl94fFE2yQNPnjz1RyQ",
  authDomain: "filmyverse1-21d7c.firebaseapp.com",
  projectId: "filmyverse1-21d7c",
  storageBucket: "filmyverse1-21d7c.appspot.com",
  messagingSenderId: "409814509908",
  appId: "1:409814509908:web:35c32ef004dc0a8d3080c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const db = getFirestore(app);
// export  const moviesRef =  collection(db , "movies");
export const moviesRef = collection(db , 'movies');
export const reviwesRef = collection(db,'reviews');
export const userRef = collection(db, "users"  )
export default app;