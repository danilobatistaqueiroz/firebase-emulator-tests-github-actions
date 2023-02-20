/* ************************************************************************** *
* Accessing emulator firebase server
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


connectAuthEmulator(auth, 'http://localhost:9099');


let email = "devjitsu@gmail.com";
let password = "123456";
import { signInWithEmailAndPassword } from "firebase/auth";

let userCredential;
try {
  userCredential = await signInWithEmailAndPassword(auth, email, password)
} catch (error) {
  const errorCode = error.code;
  const errorMessage = error.message;
}

const firestore = getFirestore(app);
connectFirestoreEmulator(firestore, 'localhost', 8080);
const docRef1 = doc(firestore, "iDomainDrivenDesign", "configurations");

let doc2 = await getDoc(docRef1);

console.log(doc2.data().screenOn);
console.log(doc2.data().dark);
console.log(doc2.data().rotation);


let ref = doc(firestore, 'iDomainDrivenDesign', 'introduction');

let doc1 = await getDoc(ref);
console.log(doc1.data().penmarks[0]);
console.log(doc1.data().bookmarks[0]);
console.log(doc1.data().currentPage);

await setDoc(doc(firestore, "iDomainDrivenDesign", 'architecture'), {
  bookmarks:[], 
  penmarks: [{page: 2, mark: {x1:10, y1:30, x2:40, y2:30}}], 
  currentPage: 0,
});

