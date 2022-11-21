import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdZCsl3SUAON6k2F5iQut4mdxioDYTUv4",
  authDomain: "willlovetodo.firebaseapp.com",
  projectId: "willlovetodo",
  storageBucket: "willlovetodo.appspot.com",
  messagingSenderId: "114478023207",
  appId: "1:114478023207:web:8b7491553c606312730402",
  measurementId: "G-GRW99EYFF6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const firestore = getFirestore(app);

/*
connectAuthEmulator(auth, "http://127.0.0.1:9099");
connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
*/
