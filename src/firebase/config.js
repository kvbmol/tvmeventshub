// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGrQxE8YJuYWreUhXE5tHVDksMXjgGlMs",
  authDomain: "tvmeventshub.firebaseapp.com",
  projectId: "tvmeventshub",
  storageBucket: "tvmeventshub.firebasestorage.app",
  messagingSenderId: "620919372178",
  appId: "1:620919372178:web:50351aec3f0507f7fc294b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);