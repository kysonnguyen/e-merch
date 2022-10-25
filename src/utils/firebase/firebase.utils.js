import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  Firestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMD8s0vSolfNIxvmlQavXXQ6TzP5a9-PA",
  authDomain: "e-merch-db.firebaseapp.com",
  projectId: "e-merch-db",
  storageBucket: "e-merch-db.appspot.com",
  messagingSenderId: "806182918223",
  appId: "1:806182918223:web:fc23e025e42debbb8a723a",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Set up Auth
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error creatingf the user", error.message);
    }
  }
  return userDocRef;
};
// if user data does not exist
// create / set the document with the dat from userAuth in my collection

//if user data exists
