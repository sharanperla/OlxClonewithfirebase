import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore, limit, orderBy, query, where } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTGNOScA6kvkiPOufFAsjFD-QRkjnYMdY",
  authDomain: "olxclone-6fbf9.firebaseapp.com",
  projectId: "olxclone-6fbf9",
  storageBucket: "olxclone-6fbf9.appspot.com",
  messagingSenderId: "722526584596",
  appId: "1:722526584596:web:2e2c917a1da7fd885d8c01",
  measurementId: "G-G47X8G3LL8"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);
const colRef = collection(db, "products");
export const docsSnap = await getDocs(colRef);
const recomend = collection(db, "products");
const q = query(recomend, orderBy("crreatedAt", "desc"), limit(10) );
export const recommendations=await getDocs(q)




