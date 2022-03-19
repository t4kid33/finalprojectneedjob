// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDdId9tVJd-9or__zOmhRUVByGWuCL7K3s",
  authDomain: "upinwza007.firebaseapp.com",
  projectId: "upinwza007",
  storageBucket: "upinwza007.appspot.com",
  messagingSenderId: "237977690514",
  appId: "1:237977690514:web:a15565988556b8b8cce14b",
  measurementId: "G-RWH6Y6HBVH"
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export { db, auth };
