// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration




// const api_key = 

// console.log(api_key)






const firebaseConfig = {
    apiKey:import.meta.env.VITE_API_KEY,
    authDomain: "ecommerce-4cc02.firebaseapp.com",
    projectId: "ecommerce-4cc02",
    storageBucket: "ecommerce-4cc02.appspot.com",
    messagingSenderId: "1030415484351",
    appId: "1:1030415484351:web:341cfae7e830b8dbd90d0a"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);


export { fireDB, auth }