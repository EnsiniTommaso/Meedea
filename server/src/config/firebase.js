import { initializeApp } from "firebase-app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXSV_r4OxeR1e2KDOiK836jVyyCFavIkU",
  authDomain: "meedea-ae967.firebaseapp.com",
  projectId: "meedea-ae967",
  storageBucket: "meedea-ae967.firebasestorage.app",
  messagingSenderId: "364168367291",
  appId: "1:364168367291:web:415d43558fa55c634d6d9e",
  measurementId: "G-MM4RG84S0B"
};

const app = initializeApp(firebaseConfig);

export { app, getAuth, signInWithEmailAndPassword };
