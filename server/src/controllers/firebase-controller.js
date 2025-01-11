import { app, getAuth, signInWithEmailAndPassword  } from "../config/firebase.js";


class FirebaseAuthController {
  SignInNewUser(email, password) {

    const auth = getAuth();
    var user = null;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        user = userCredential.user;
        console.log('registered:',user)
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.error(`Error[${errorCode}] ${errorMessage}`);
      });
    return user;
  }
  LogIn() {}
  DeleteUser() {}
}

export default new FirebaseAuthController();
