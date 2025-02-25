import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDmVjdrsddl_TS3GVVYAmJrsz4hrv62vBo",
    authDomain: "teachers-fee67.firebaseapp.com",
    databaseURL: "https://teachers-fee67-default-rtdb.firebaseio.com",
    projectId: "teachers-fee67",
    storageBucket: "teachers-fee67.firebasestorage.app",
    messagingSenderId: "606886391638",
    appId: "1:606886391638:web:1619b402da7208bedd30f7",
    measurementId: "G-MMTH230Q1N"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);