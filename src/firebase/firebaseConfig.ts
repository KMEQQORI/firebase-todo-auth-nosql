import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASURMENT_ID
};

console.log({firebaseConfig})


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const firestore = getFirestore(app);

/*
connectAuthEmulator(auth, "http://127.0.0.1:9099");
connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
*/
