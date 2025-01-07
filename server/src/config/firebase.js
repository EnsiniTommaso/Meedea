import { initializeApp } from "firebase/app";
import admin from "firebase-admin";

//var serviceAccount = require("../keys/meedea-ae967-firebase-adminsdk-n7cij-619771bdc1.json");
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
/*
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
*/
export { app };
