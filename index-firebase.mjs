/* ************************************************************************** *
* Accessing real firebase server
* *************************************************************************** */

import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDESZDOuoBGnqW_sMjKAdiKjxx-7PuIb7k",
  authDomain: "booksreader-e1dd5.firebaseapp.com",
  projectId: "booksreader-e1dd5",
  storageBucket: "booksreader-e1dd5.appspot.com",
  messagingSenderId: "470342136480",
  appId: "1:470342136480:web:b289764499ee79b7f6cfc5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


let email = "danilobatistaqueiroz@gmail.com";
let password = "paUv?u?{!Uw3z#@Q'_a6,wg<ZUW9,#";
import { signInWithEmailAndPassword } from "firebase/auth";

let userCredential;
try {
  userCredential = await signInWithEmailAndPassword(auth, email, password)
} catch (error) {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log(errorCode, errorMessage);
}
console.log(userCredential.user.email);

const firestore = getFirestore(app);

const docRef1 = doc(firestore, "iDomainDrivenDesign", "configurations");
console.log(docRef1);

let doc2 = await getDoc(docRef1);

console.log(doc2.data().screenOn);
console.log(doc2.data().dark);
console.log(doc2.data().rotation);
