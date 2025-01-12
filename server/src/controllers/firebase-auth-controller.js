import {
  app,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "../config/firebase.js";

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
  if (!email) return console.error("[ERROR] LogInUser: need email");
  if (!password) return console.error("[ERROR] LogInUser: need password");

  const auth = getAuth(app);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`[${errorCode}] ${errorMessage}`);
    return null;
  }
}

export { CreateNewUser, LogInUser };
