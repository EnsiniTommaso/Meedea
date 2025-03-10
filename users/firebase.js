// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "dotenv/config";

const firebaseConfig = {
  apiKey: process.env.fb_apiKey,
  authDomain: process.env.fb_authDomain,
  projectId: process.env.fb_projectId,
  storageBucket: process.env.fb_storageBucket,
  messagingSenderId: process.env.fb_messagingSenderId,
  appId: process.env.fb_appId,
  measurementId: process.env.fb_measurementId,
};

const app = initializeApp(firebaseConfig);


async function CreateNewUser(email, password) {
  if (!email) return [null, "need emai"]; //returns 'undefined'
  if (!password) return [null, "need password"];

  const auth = getAuth(app);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return [user, null];
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`[${errorCode}] ${errorMessage}`);
    return [null, errorCode];
  }
}

async function LogInUser(email, password) {
  if (!email) return [null, '[ERROR] LogInUser: need email'];
  if (!password) return [null, '[ERROR] LogInUser: need password'];

  const auth = getAuth(app);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const newUser = await userCredential
    const IdToken = newUser.user.getIdToken();
    return [IdToken, null];
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`[${errorCode}] ${errorMessage}`);
    return [null, errorCode];
  }
}

async function RemoveUser(){
  //https://github.com/firebase/snippets-node/blob/e29c2c3ced6c1a3cb14ad5ab7588dac578c06453/auth/manage_users.js
}

export { CreateNewUser, LogInUser };
