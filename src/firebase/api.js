import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDji1UCDz3ffVnsQdTONY1RIzvb2t0VCZs",
    authDomain: "learn-lingo-6d1a1.firebaseapp.com",
    projectId: "learn-lingo-6d1a1",
    storageBucket: "learn-lingo-6d1a1.firebasestorage.app",
    messagingSenderId: "494488906405",
    appId: "G-RQQ5HEEG1M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
