import app from '../config/firebase.js'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth' 


class FirebaseAuthController {
  SignInNewUser(){
    const auth = getAuth();
    signInWithEmailAndPassword(auth)
  }
  LogIn(){

  }
  DeleteUser(){

  }
}

export default FirebaseAuthController()