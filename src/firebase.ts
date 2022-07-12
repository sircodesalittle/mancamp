// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0PuZwBSK9ni7quMHJal_S2LgLorQVY5E",
  authDomain: "mancamp-ae1c1.firebaseapp.com",
  projectId: "mancamp-ae1c1",
  storageBucket: "mancamp-ae1c1.appspot.com",
  messagingSenderId: "827010810787",
  appId: "1:827010810787:web:d67813411784da86199016",
};

// Initialize Firebase
export const initializeFirebaseApp = () => {
  return initializeApp(firebaseConfig);
};
