import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyAxJRLCtp8XwXYHKhVBa4akGbdRjPW_sC4",

  authDomain: "voting-master-5629e.firebaseapp.com",

  databaseURL: "https://voting-master-5629e-default-rtdb.firebaseio.com",

  projectId: "voting-master-5629e",

  storageBucket: "voting-master-5629e.firebasestorage.app",

  messagingSenderId: "1003430186890",

  appId: "1:1003430186890:web:d4fa703b79223c0b908273",

  measurementId: "G-2RB9N0CRPF"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);   
export const auth = getAuth(app);      