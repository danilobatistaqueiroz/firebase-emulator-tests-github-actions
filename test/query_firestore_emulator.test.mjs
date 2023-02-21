/* ************************************************************************** *
* Accessing emulator firebase server
* *************************************************************************** */

import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import chai from 'chai';


const firebaseConfig = {
  apiKey: "AIzaSyDESZDOuoBGnqW_sMjKAdiKjxx-7PuIb7k",
  authDomain: "booksreader-e1dd5.firebaseapp.com",
  projectId: "booksreader-e1dd5",
  storageBucket: "booksreader-e1dd5.appspot.com",
  messagingSenderId: "470342136480",
  appId: "1:470342136480:web:b289764499ee79b7f6cfc5"
};


describe("query firestore emulator", function() {
  it("create user, authenticate, store document, retrieve document", async function() {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    connectAuthEmulator(auth, 'http://localhost:9099');

    let email = "devjitsu@gmail.com";
    let password = "123456";

    let newUserCredential = await createUserWithEmailAndPassword(auth, email, password);

    let userCredential;
    try {
      userCredential = await signInWithEmailAndPassword(auth, email, password)
      chai.assert.equal(userCredential?.user?.email,email);
      chai.assert.equal(userCredential?.user?.displayName,'devjitsu');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }

    const firestore = getFirestore(app);
    connectFirestoreEmulator(firestore, 'localhost', 8080);

    await setDoc(doc(firestore, "iDomainDrivenDesign", 'configurations'), {
      screenOn:true, dark:true, rotation: 'landscape'
    });

    await setDoc(doc(firestore, "iDomainDrivenDesign", 'introduction'), {
      bookmarks:[], 
      penmarks: [{page: 2, mark: {x1:10, y1:30, x2:40, y2:30}}], 
      currentPage: 5,
    });

    const confRef = doc(firestore, "iDomainDrivenDesign", "configurations");

    let docConf = await getDoc(confRef);

    chai.assert.equal(docConf.data().screenOn,true);
    chai.assert.equal(docConf.data().dark,true);
    chai.assert.equal(docConf.data().rotation,'landscape');

    let introRef = doc(firestore, 'iDomainDrivenDesign', 'introduction');

    let docIntro = await getDoc(introRef);
    chai.assert.deepEqual(docIntro.data().penmarks[0],{page: 2, mark: {x1:10, y1:30, x2:40, y2:30}});
    chai.assert.deepEqual(docIntro.data().bookmarks,[]);
    chai.assert.equal(docIntro.data().currentPage,5);

  });
});