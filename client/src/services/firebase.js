//import firebase from "firebase/app"
//import "firebase/auth"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
//import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDqunkEWltIrXyPHXSCm10XLq5sPU6q7HA",
  authDomain: "scholarship-webapp.firebaseapp.com",
  projectId: "scholarship-webapp",
  storageBucket: "scholarship-webapp.appspot.com",
  messagingSenderId: "776902810258",
  appId: "1:776902810258:web:5ebc7525c8cf59dadf644b",
  measurementId: "G-41TGJ05MXZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;