

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPQTqg086pJ-2HpSOr3cNYes7TIoR9UOU",
  authDomain: "mysite-e5212.firebaseapp.com",
  projectId: "mysite-e5212",
  storageBucket: "mysite-e5212.appspot.com",
  messagingSenderId: "671713860743",
  appId: "1:671713860743:web:dabf4134d1a87646f26c22",
};

const app = initializeApp(firebaseConfig);

export { app };
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
