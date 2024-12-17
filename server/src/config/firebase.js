// https://permify.co/post/firebase-authentication-nodejs/#getting-started-with-firebase-authentication-in-nodejs

import firebase from "firebase/app"
import admin from "firebase-admin"
import firebase_keys from "../keys/firebase_keys.json" with { type:"json"}

import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification, 
  sendPasswordResetEmail 
} from "firebase/auth" ;

const firebaseConfig = {
  apiKey: firebase_keys.FIREBASE_API_KEY,
  authDomain: firebase_keys.FIREBASE_AUTH_DOMAIN,
  projectId: firebase_keys.FIREBASE_PROJECT_ID,
  storageBucket: firebase_keys.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: firebase_keys.FIREBASE_MESSAGING_SENDER_ID,
  appId: firebase_keys.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

export {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  admin
};

