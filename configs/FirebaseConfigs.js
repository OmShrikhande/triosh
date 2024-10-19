// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAnalytics } from "@firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZbVoUwwwYVZuGnoA_cp5AeUlYlLyP654",
  authDomain: "triosh-9ba7f.firebaseapp.com",
  projectId: "triosh-9ba7f",
  storageBucket: "triosh-9ba7f.appspot.com",
  messagingSenderId: "306443834851",
  appId: "1:306443834851:web:dd0d873cb923298597fcd6",
  measurementId: "G-EHJYZB9VRL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const storage=getStorage(app)