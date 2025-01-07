import { app } from "../config/firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

class FirebaseAuthController {
  SignInNewUser(email, password) {
    const auth = getAuth();
    var status = "error";
    var user = null;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        status = "signed-in";
        user = userCredential.user;
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
